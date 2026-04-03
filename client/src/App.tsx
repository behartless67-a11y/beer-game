import { useEffect, useState } from 'react';
import { useSocket } from './hooks/useSocket';
import { useGameStore } from './store/gameStore';
import { LobbyList } from './components/Lobby/LobbyList';
import { LobbyRoom } from './components/Lobby/LobbyRoom';
import { PlayerStation } from './components/Game/PlayerStation';
import { GamePhase } from './types/game.types';

function App() {
  const { socket, isConnected, isReconnecting } = useSocket();
  const {
    currentView,
    currentRoom,
    gameState,
    myRole,
    availableRooms,
    playerId,
    setCurrentView,
    setCurrentRoom,
    setGameState,
    setMyRole,
    setAvailableRooms,
    setPlayerId,
    setLastError,
  } = useGameStore();

  const [hasSubmittedOrder, setHasSubmittedOrder] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Lobby events
    socket.on('lobby:rooms', (rooms) => {
      setAvailableRooms(rooms);
    });

    socket.on('lobby:update', (room) => {
      setCurrentRoom(room);
    });

    socket.on('lobby:full', () => {
      console.log('Room is full! Ready to start.');
    });

    socket.on('lobby:room_closed', (roomId: string) => {
      console.log('Room closed:', roomId);
      alert('The room has been closed (host left or disconnected)');
      setCurrentView('menu');
      setCurrentRoom(null);
    });

    // Game events
    socket.on('game:initialized', (gameState) => {
      console.log('Game initialized:', gameState);
      setGameState(gameState);

      // Find my role
      const myPlayer = Object.values(gameState.players).find(
        (p) => p.socketId === socket.id
      );
      if (myPlayer && myPlayer.role) {
        setMyRole(myPlayer.role);
      }

      setCurrentView('game');
      setHasSubmittedOrder(false);
    });

    socket.on('game:player_submitted', (role) => {
      console.log(`${role} submitted their order`);
    });

    socket.on('game:turn_complete', (updatedGameState) => {
      console.log('Turn complete, week:', updatedGameState.currentWeek);
      setGameState(updatedGameState);
      setHasSubmittedOrder(false);
    });

    socket.on('game:ended', (finalGameState) => {
      console.log('Game ended!');
      setGameState(finalGameState);
      alert('Game Over! Check the final scores.');
    });

    socket.on('error', (message) => {
      console.error('Socket error:', message);
      setLastError(message);
      alert(`Error: ${message}`);
    });

    // Cleanup
    return () => {
      socket.off('lobby:rooms');
      socket.off('lobby:update');
      socket.off('lobby:full');
      socket.off('lobby:room_closed');
      socket.off('game:initialized');
      socket.off('game:player_submitted');
      socket.off('game:turn_complete');
      socket.off('game:ended');
      socket.off('error');
    };
  }, [socket]);

  useEffect(() => {
    if (socket && isConnected) {
      setPlayerId(socket.id);
    }
  }, [socket, isConnected]);

  const handleCreateRoom = (playerName: string) => {
    if (!socket) return;

    socket.emit('lobby:create', playerName, (roomId) => {
      console.log('Room created:', roomId);
      setCurrentView('lobby');
    });
  };

  const handleJoinRoom = (roomId: string, playerName: string) => {
    if (!socket) return;

    socket.emit('lobby:join', roomId, playerName, (success, error) => {
      if (success) {
        console.log('Joined room:', roomId);
        setCurrentView('lobby');
      } else {
        alert(`Failed to join room: ${error}`);
      }
    });
  };

  const handleReady = () => {
    if (!socket) return;
    socket.emit('lobby:ready');
  };

  const handleStartGame = () => {
    if (!socket) return;

    socket.emit('game:start', (success, error) => {
      if (!success) {
        alert(`Failed to start game: ${error}`);
      }
    });
  };

  const handleLeaveRoom = () => {
    if (!socket) return;

    socket.emit('lobby:leave');
    setCurrentView('menu');
    setCurrentRoom(null);
  };

  const handleSubmitOrder = (quantity: number) => {
    if (!socket) return;

    socket.emit('game:submit_order', quantity, (success, error) => {
      if (success) {
        setHasSubmittedOrder(true);
      } else {
        alert(`Failed to submit order: ${error}`);
      }
    });
  };

  // Loading/Reconnecting states
  if (!isConnected && !isReconnecting) {
    return (
      <div className="min-h-screen myst-container flex items-center justify-center">
        <div className="brass-panel p-8 text-center text-aged-paper">
          <p className="text-2xl vintage-text">Connecting to server...</p>
        </div>
      </div>
    );
  }

  if (isReconnecting) {
    return (
      <div className="min-h-screen myst-container flex items-center justify-center">
        <div className="brass-panel p-8 text-center text-aged-paper">
          <p className="text-2xl vintage-text">Reconnecting...</p>
        </div>
      </div>
    );
  }

  // Render based on current view
  if (currentView === 'game' && gameState && myRole) {
    return (
      <PlayerStation
        gameState={gameState}
        myRole={myRole}
        onSubmitOrder={handleSubmitOrder}
        hasSubmitted={hasSubmittedOrder}
      />
    );
  }

  if (currentView === 'lobby' && currentRoom && playerId) {
    return (
      <LobbyRoom
        room={currentRoom}
        myId={playerId}
        onReady={handleReady}
        onStart={handleStartGame}
        onLeave={handleLeaveRoom}
      />
    );
  }

  // Default: Show lobby list
  return (
    <LobbyList
      rooms={availableRooms}
      onCreateRoom={handleCreateRoom}
      onJoinRoom={handleJoinRoom}
    />
  );
}

export default App;
