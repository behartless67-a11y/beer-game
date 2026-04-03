import { TexturedPanel } from '../UI/TexturedPanel';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { LobbyRoom as LobbyRoomType, PlayerRole } from '../../types/game.types';

interface LobbyRoomProps {
  room: LobbyRoomType;
  myId: string;
  onReady: () => void;
  onStart: () => void;
  onLeave: () => void;
}

const roleNames: Record<PlayerRole, string> = {
  [PlayerRole.RETAILER]: 'Retailer',
  [PlayerRole.WHOLESALER]: 'Wholesaler',
  [PlayerRole.DISTRIBUTOR]: 'Distributor',
  [PlayerRole.FACTORY]: 'Factory',
};

const roleDescriptions: Record<PlayerRole, string> = {
  [PlayerRole.RETAILER]: 'Sells to customers',
  [PlayerRole.WHOLESALER]: 'Supplies retailers',
  [PlayerRole.DISTRIBUTOR]: 'Supplies wholesalers',
  [PlayerRole.FACTORY]: 'Produces beer',
};

export function LobbyRoom({ room, myId, onReady, onStart, onLeave }: LobbyRoomProps) {
  const isHost = room.hostId === myId;
  const allReady = room.players.every((p) => p.isReady) && room.players.length === 4;
  const myPlayer = room.players.find((p) => p.id === myId);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl vintage-text text-center text-aged-paper mb-2">
          Room {room.roomId}
        </h1>
        <p className="text-center text-aged-paper opacity-75">
          Waiting for players... ({room.players.length} / 4)
        </p>
      </div>

      <TexturedPanel className="mb-8">
        <h3 className="text-2xl vintage-text mb-6">Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[PlayerRole.RETAILER, PlayerRole.WHOLESALER, PlayerRole.DISTRIBUTOR, PlayerRole.FACTORY].map(
            (role, index) => {
              const player = room.players[index];

              return (
                <Card key={role} className={!player ? 'opacity-50' : ''}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl vintage-text font-semibold">
                        {roleNames[role]}
                      </h4>
                      <p className="text-sm opacity-75 mb-2">{roleDescriptions[role]}</p>
                      {player ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{player.name}</span>
                          {player.isReady && (
                            <span className="text-green-600">✓ Ready</span>
                          )}
                          {!player.isConnected && (
                            <span className="text-red-600">⚠ Disconnected</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm italic">Waiting for player...</span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      </TexturedPanel>

      <div className="flex gap-4 justify-center">
        {!myPlayer?.isReady && room.players.length === 4 && (
          <Button size="large" onClick={onReady}>
            Ready
          </Button>
        )}

        {isHost && allReady && (
          <Button size="large" onClick={onStart} variant="primary">
            Start Game
          </Button>
        )}

        <Button size="large" variant="secondary" onClick={onLeave}>
          Leave Room
        </Button>
      </div>

      {!allReady && room.players.length === 4 && (
        <p className="text-center mt-4 text-aged-paper opacity-75">
          Waiting for all players to be ready...
        </p>
      )}
    </div>
  );
}
