import { Server, Socket } from 'socket.io';
import { LobbyManager } from '../lobby/LobbyManager';
import { PlayerRole } from '../types/game.types';

export function setupSocketHandlers(io: Server, lobbyManager: LobbyManager) {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    let currentPlayerId: string | null = null;

    // Send current room list to newly connected client
    socket.emit('lobby:rooms', lobbyManager.getAllRooms());

    // Lobby: Create room
    socket.on('lobby:create', (playerName: string, callback: (roomId: string) => void) => {
      try {
        const playerId = socket.id;
        currentPlayerId = playerId;

        const roomId = lobbyManager.createRoom(playerId, socket.id, playerName);

        // Join socket.io room
        socket.join(roomId);

        // Send room ID back to client
        callback(roomId);

        // Send room details to the creator
        const room = lobbyManager.getRoom(roomId);
        if (room) {
          socket.emit('lobby:update', room);
        }

        // Broadcast updated rooms list to all clients
        io.emit('lobby:rooms', lobbyManager.getAllRooms());

        console.log(`Room created: ${roomId} by ${playerName}`);
      } catch (error) {
        console.error('Error creating room:', error);
        socket.emit('error', 'Failed to create room');
      }
    });

    // Lobby: Join room
    socket.on('lobby:join', (roomId: string, playerName: string, callback: (success: boolean, error?: string) => void) => {
      try {
        const playerId = socket.id;
        currentPlayerId = playerId;

        const result = lobbyManager.joinRoom(roomId, playerId, socket.id, playerName);

        if (result.success) {
          // Join socket.io room
          socket.join(roomId);

          callback(true);

          // Send updated room to all players in the room
          const room = lobbyManager.getRoom(roomId);
          if (room) {
            io.to(roomId).emit('lobby:update', room);
          }

          // Broadcast updated rooms list
          io.emit('lobby:rooms', lobbyManager.getAllRooms());

          console.log(`${playerName} joined room ${roomId}`);
        } else {
          callback(false, result.error);
        }
      } catch (error) {
        console.error('Error joining room:', error);
        callback(false, 'Failed to join room');
      }
    });

    // Lobby: Leave room
    socket.on('lobby:leave', () => {
      try {
        if (!currentPlayerId) return;

        const result = lobbyManager.leaveRoom(currentPlayerId);

        if (result.roomId) {
          // Leave socket.io room
          socket.leave(result.roomId);

          // Check if room still exists
          const room = lobbyManager.getRoom(result.roomId);
          if (room) {
            // Update remaining players
            io.to(result.roomId).emit('lobby:update', room);
          } else {
            // Room was deleted (host left or empty), notify remaining players to go back to lobby
            io.to(result.roomId).emit('lobby:room_closed', result.roomId);
          }

          // Broadcast updated rooms list
          io.emit('lobby:rooms', lobbyManager.getAllRooms());

          console.log(`Player ${currentPlayerId} left room ${result.roomId}`);
        }
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    });

    // Lobby: Ready
    socket.on('lobby:ready', () => {
      try {
        if (!currentPlayerId) return;

        const success = lobbyManager.setPlayerReady(currentPlayerId);

        if (success) {
          const roomId = lobbyManager.getRoomIdForPlayer(currentPlayerId);
          if (roomId) {
            const room = lobbyManager.getRoom(roomId);
            if (room) {
              // Update all players in room
              io.to(roomId).emit('lobby:update', room);

              // Check if all players ready
              if (lobbyManager.allPlayersReady(roomId)) {
                io.to(roomId).emit('lobby:full', roomId);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error setting player ready:', error);
      }
    });

    // Game: Start
    socket.on('game:start', (callback: (success: boolean, error?: string) => void) => {
      try {
        if (!currentPlayerId) {
          callback(false, 'Player not found');
          return;
        }

        const roomId = lobbyManager.getRoomIdForPlayer(currentPlayerId);
        if (!roomId) {
          callback(false, 'Not in a room');
          return;
        }

        const room = lobbyManager.getRoom(roomId);
        if (!room) {
          callback(false, 'Room not found');
          return;
        }

        // Check if current player is host
        if (room.hostId !== currentPlayerId) {
          callback(false, 'Only host can start the game');
          return;
        }

        const result = lobbyManager.startGame(roomId);

        if (result.success && result.gameRoom) {
          callback(true);

          const gameState = result.gameRoom.getGameState();

          // Send initial game state to all players
          io.to(roomId).emit('game:initialized', gameState);

          console.log(`Game started in room ${roomId}`);
        } else {
          callback(false, result.error);
        }
      } catch (error) {
        console.error('Error starting game:', error);
        callback(false, 'Failed to start game');
      }
    });

    // Game: Submit order
    socket.on('game:submit_order', (quantity: number, callback: (success: boolean, error?: string) => void) => {
      try {
        if (!currentPlayerId) {
          callback(false, 'Player not found');
          return;
        }

        const roomId = lobbyManager.getRoomIdForPlayer(currentPlayerId);
        if (!roomId) {
          callback(false, 'Not in a room');
          return;
        }

        const gameRoom = lobbyManager.getGameRoom(roomId);
        if (!gameRoom) {
          callback(false, 'Game not started');
          return;
        }

        // Get player's role
        const gameState = gameRoom.getGameState();
        const player = Object.values(gameState.players).find(p => p.id === currentPlayerId);
        if (!player || !player.role) {
          callback(false, 'Player role not found');
          return;
        }

        // Submit order
        const success = gameRoom.receiveOrder(player.role, quantity);

        if (!success) {
          callback(false, 'Invalid order or already submitted');
          return;
        }

        callback(true);

        // Notify other players that this player has submitted
        io.to(roomId).emit('game:player_submitted', player.role);

        console.log(`${player.role} submitted order: ${quantity} in room ${roomId}`);

        // Check if all players have submitted
        if (gameRoom.allPlayersSubmitted()) {
          console.log(`All players submitted in room ${roomId}, processing turn...`);

          // Process the turn
          gameRoom.processTurn();

          // Get updated game state
          const updatedGameState = gameRoom.getGameState();

          // Check if game ended
          if (gameRoom.isGameEnded()) {
            io.to(roomId).emit('game:ended', updatedGameState);
            console.log(`Game ended in room ${roomId}`);
          } else {
            // Send updated state to all players
            io.to(roomId).emit('game:turn_complete', updatedGameState);
            console.log(`Turn ${updatedGameState.currentWeek - 1} complete in room ${roomId}`);
          }
        }
      } catch (error) {
        console.error('Error submitting order:', error);
        callback(false, 'Failed to submit order');
      }
    });

    // Game: Request state (for reconnection)
    socket.on('game:request_state', (callback: (gameState: any) => void) => {
      try {
        if (!currentPlayerId) {
          callback(null);
          return;
        }

        const roomId = lobbyManager.getRoomIdForPlayer(currentPlayerId);
        if (!roomId) {
          callback(null);
          return;
        }

        const gameRoom = lobbyManager.getGameRoom(roomId);
        if (!gameRoom) {
          callback(null);
          return;
        }

        const gameState = gameRoom.getGameState();
        callback(gameState);
      } catch (error) {
        console.error('Error requesting state:', error);
        callback(null);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);

      const disconnectInfo = lobbyManager.markPlayerDisconnected(socket.id);
      if (disconnectInfo) {
        const room = lobbyManager.getRoom(disconnectInfo.roomId);
        const gameRoom = lobbyManager.getGameRoom(disconnectInfo.roomId);

        // If game hasn't started yet, remove the player from the room
        if (!gameRoom && room) {
          console.log(`Removing disconnected player ${disconnectInfo.playerId} from lobby room ${disconnectInfo.roomId}`);
          lobbyManager.leaveRoom(disconnectInfo.playerId);

          // Check if room still exists after removal
          const updatedRoom = lobbyManager.getRoom(disconnectInfo.roomId);
          if (updatedRoom) {
            // Notify remaining players
            io.to(disconnectInfo.roomId).emit('lobby:update', updatedRoom);
          } else {
            // Room was deleted (host disconnected or empty), notify players
            io.to(disconnectInfo.roomId).emit('lobby:room_closed', disconnectInfo.roomId);
          }

          // Broadcast updated room list to all clients
          io.emit('lobby:rooms', lobbyManager.getAllRooms());
        } else if (room) {
          // Game has started, just mark as disconnected (for now)
          io.to(disconnectInfo.roomId).emit('lobby:update', room);
        }
      }
    });
  });
}
