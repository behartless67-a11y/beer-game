import { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { TexturedPanel } from '../UI/TexturedPanel';
import { LobbyRoom } from '../../types/game.types';

interface LobbyListProps {
  rooms: LobbyRoom[];
  onCreateRoom: (playerName: string) => void;
  onJoinRoom: (roomId: string, playerName: string) => void;
}

export function LobbyList({ rooms, onCreateRoom, onJoinRoom }: LobbyListProps) {
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleCreate = () => {
    if (playerName.trim()) {
      onCreateRoom(playerName.trim());
      setPlayerName('');
      setShowNameInput(false);
    }
  };

  const handleJoin = (roomId: string) => {
    if (playerName.trim()) {
      onJoinRoom(roomId, playerName.trim());
      setPlayerName('');
      setSelectedRoomId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl vintage-text text-center mb-8 text-aged-paper">
        The Beer Game
      </h1>
      <h2 className="text-2xl vintage-text text-center mb-12 text-aged-paper opacity-80">
        A Supply Chain Management Simulation
      </h2>

      {!showNameInput && !selectedRoomId ? (
        <div className="space-y-6">
          <TexturedPanel>
            <h3 className="text-2xl vintage-text mb-4">Create a New Game</h3>
            <p className="mb-4 opacity-75">Start a new room and invite 3 other players to join</p>
            <div className="text-center">
              <Button size="large" onClick={() => setShowNameInput(true)}>
                Create New Room
              </Button>
            </div>
          </TexturedPanel>
        </div>
      ) : (
        <TexturedPanel className="mb-8">
          <h3 className="text-2xl vintage-text mb-4">
            {selectedRoomId ? `Join Room ${selectedRoomId}` : 'Create New Room'}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (selectedRoomId) {
                    handleJoin(selectedRoomId);
                  } else {
                    handleCreate();
                  }
                }
              }}
              className="w-full px-4 py-3 rounded border-2 border-darker-brass bg-aged-paper text-dark-leather vintage-text text-lg"
              autoFocus
            />
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  if (selectedRoomId) {
                    handleJoin(selectedRoomId);
                  } else {
                    handleCreate();
                  }
                }}
                disabled={!playerName.trim()}
                className="flex-1"
              >
                {selectedRoomId ? 'Join Room' : 'Create Room'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowNameInput(false);
                  setSelectedRoomId(null);
                  setPlayerName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </TexturedPanel>
      )}

      {!selectedRoomId && (
        <TexturedPanel>
          <h3 className="text-2xl vintage-text mb-2">Available Rooms</h3>
          <p className="text-sm opacity-75 mb-4 italic">
            {rooms.length > 0 ? 'Click on a room to join' : 'No rooms available yet. Create one to get started!'}
          </p>
          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <Card
                  key={room.roomId}
                  hoverable={room.players.length < room.maxPlayers}
                  onClick={() => {
                    if (room.players.length < room.maxPlayers) {
                      setSelectedRoomId(room.roomId);
                      setShowNameInput(true);
                    }
                  }}
                  className={room.players.length >= room.maxPlayers ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl vintage-text font-semibold">
                        Room {room.roomId}
                      </h4>
                      <p className="text-sm opacity-75">
                        {room.players.length} / {room.maxPlayers} players
                      </p>
                      {room.players.length < room.maxPlayers && (
                        <p className="text-xs text-green-700 font-semibold mt-1">
                          Click to join →
                        </p>
                      )}
                      {room.players.length >= room.maxPlayers && (
                        <p className="text-xs text-red-700 font-semibold mt-1">
                          Full
                        </p>
                      )}
                    </div>
                    <div className="text-2xl">
                      {room.players.length >= room.maxPlayers ? '🔒' : '📂'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 opacity-50">
              <p className="text-lg">👻 Empty lobby</p>
            </div>
          )}
        </TexturedPanel>
      )}
    </div>
  );
}
