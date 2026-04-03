import { useState, useEffect } from 'react';
import { TexturedPanel } from '../UI/TexturedPanel';
import { Button } from '../UI/Button';
import { Gauge } from '../UI/Gauge';
import { GameState, PlayerRole } from '../../types/game.types';
import { RoleOrientation } from './RoleOrientation';

interface PlayerStationProps {
  gameState: GameState;
  myRole: PlayerRole;
  onSubmitOrder: (quantity: number) => void;
  hasSubmitted: boolean;
}

const roleNames: Record<PlayerRole, string> = {
  [PlayerRole.RETAILER]: 'Retailer',
  [PlayerRole.WHOLESALER]: 'Wholesaler',
  [PlayerRole.DISTRIBUTOR]: 'Distributor',
  [PlayerRole.FACTORY]: 'Factory',
};

const roleContext: Record<PlayerRole, {
  orderTo: string;
  orderFrom: string;
  reminder: string;
}> = {
  [PlayerRole.RETAILER]: {
    orderTo: 'Wholesaler',
    orderFrom: 'Customer demand',
    reminder: 'You see actual customer demand. Try to keep about 12 cases in stock at your store. Order carefully to meet demand while minimizing costs.',
  },
  [PlayerRole.WHOLESALER]: {
    orderTo: 'Distributor',
    orderFrom: 'Retailer orders',
    reminder: 'You receive orders from the Retailer. Anticipate their needs and order accordingly.',
  },
  [PlayerRole.DISTRIBUTOR]: {
    orderTo: 'Factory',
    orderFrom: 'Wholesaler orders',
    reminder: 'You receive orders from the Wholesaler. Plan ahead to keep the supply flowing.',
  },
  [PlayerRole.FACTORY]: {
    orderTo: 'Production',
    orderFrom: 'Distributor orders',
    reminder: 'You schedule production to meet Distributor orders. Balance capacity and demand.',
  },
};

export function PlayerStation({ gameState, myRole, onSubmitOrder, hasSubmitted }: PlayerStationProps) {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [showOrientation, setShowOrientation] = useState(true);
  const myState = gameState.playerStates[myRole];
  const context = roleContext[myRole];

  // Reset orientation when game restarts (week 1)
  useEffect(() => {
    if (gameState.currentWeek === 1) {
      setShowOrientation(true);
    }
  }, [gameState.currentWeek]);

  if (!myState) return null;

  // Show orientation on first turn
  if (showOrientation && gameState.currentWeek === 1) {
    return <RoleOrientation role={myRole} onContinue={() => setShowOrientation(false)} />;
  }

  const handleSubmit = () => {
    const qty = parseInt(orderQuantity);
    if (!isNaN(qty) && qty >= 0) {
      onSubmitOrder(qty);
      setOrderQuantity('');
    }
  };

  const submittedRoles = Object.entries(gameState.turnSubmissions)
    .filter(([_, qty]) => qty !== null)
    .map(([role]) => role as PlayerRole);

  const waitingRoles = Object.entries(gameState.turnSubmissions)
    .filter(([_, qty]) => qty === null)
    .map(([role]) => role as PlayerRole);

  return (
    <div className="min-h-screen myst-container p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl vintage-text text-aged-paper">
              Week {gameState.currentWeek}
            </h1>
            <p className="text-xl text-aged-paper opacity-75">
              of {gameState.maxWeeks}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl vintage-text text-aged-paper">
              {roleNames[myRole]}
            </h2>
            <p className="text-lg text-aged-paper opacity-75">
              Your Role
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <TexturedPanel>
            <Gauge
              value={myState.inventory}
              max={Math.max(50, myState.inventory)}
              label="Inventory"
              size={150}
            />
          </TexturedPanel>

          <TexturedPanel>
            <Gauge
              value={myState.backorder}
              max={Math.max(30, myState.backorder)}
              label="Backorders"
              size={150}
              warningThreshold={10}
            />
          </TexturedPanel>

          <TexturedPanel>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-aged-paper">
                ${myState.totalCost.toFixed(2)}
              </div>
              <div className="text-lg vintage-text mb-4">Total Cost</div>
              <div className="text-sm opacity-75">
                <div>This week: ${(myState.costsThisWeek.holding + myState.costsThisWeek.backorder).toFixed(2)}</div>
                <div className="mt-1">Holding: ${myState.costsThisWeek.holding.toFixed(2)}</div>
                <div>Backorder: ${myState.costsThisWeek.backorder.toFixed(2)}</div>
              </div>
            </div>
          </TexturedPanel>
        </div>

        {/* Pipeline Views */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TexturedPanel variant="paper">
            <h3 className="text-xl vintage-text font-semibold mb-4 text-dark-leather">
              Incoming Orders {myRole === PlayerRole.RETAILER ? '(Customer Demand)' : '(from Downstream)'}
            </h3>
            <div className="flex gap-2 justify-around">
              {[myState.incomingOrders.week1, myState.incomingOrders.week2, myState.incomingOrders.week3].map((qty, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="brass-panel p-4 rounded text-aged-paper font-bold text-2xl">
                    {qty}
                  </div>
                  <div className="text-sm mt-1 text-dark-leather">
                    {i === 0 ? 'This week' : i === 1 ? '+1w' : '+2w'}
                  </div>
                </div>
              ))}
            </div>
          </TexturedPanel>

          <TexturedPanel variant="paper">
            <h3 className="text-xl vintage-text font-semibold mb-4 text-dark-leather">
              Incoming Shipments {myRole === PlayerRole.FACTORY ? '(Production)' : '(from Upstream)'}
            </h3>
            <div className="flex gap-2 justify-around">
              {[myState.incomingShipments.week1, myState.incomingShipments.week2, myState.incomingShipments.week3].map((qty, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="brass-panel p-4 rounded text-aged-paper font-bold text-2xl">
                    {qty}
                  </div>
                  <div className="text-sm mt-1 text-dark-leather">
                    {i === 0 ? 'This week' : i === 1 ? '+1w' : '+2w'}
                  </div>
                </div>
              ))}
            </div>
          </TexturedPanel>
        </div>

        {/* Order Form */}
        <TexturedPanel className="mb-6">
          <h3 className="text-2xl vintage-text font-semibold mb-2">
            {myRole === PlayerRole.FACTORY ? 'Production Order' : 'Place Your Order'}
          </h3>

          {/* Contextual Reminder */}
          <div className="mb-4 p-3 bg-aged-paper bg-opacity-20 rounded border border-brass-dark">
            <p className="text-sm text-aged-paper opacity-90">
              <strong>Your Situation:</strong> {context.reminder}
            </p>
            <p className="text-xs text-aged-paper opacity-75 mt-1">
              Ordering to: <strong>{context.orderTo}</strong> • Receiving: <strong>{context.orderFrom}</strong> •
              Remember: 4-week delay (2 weeks order + 2 weeks shipping)
            </p>
          </div>

          {!hasSubmitted ? (
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-3 rounded border-2 border-darker-brass bg-aged-paper text-dark-leather vintage-text text-xl"
                  autoFocus
                />
              </div>
              <Button
                size="large"
                onClick={handleSubmit}
                disabled={!orderQuantity || parseInt(orderQuantity) < 0}
              >
                Submit Order
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-2xl vintage-text text-aged-paper mb-2">
                ✓ Order Submitted
              </div>
              <p className="text-aged-paper opacity-75">
                Waiting for other players...
              </p>
            </div>
          )}
        </TexturedPanel>

        {/* Player Status */}
        <TexturedPanel variant="dark">
          <h4 className="text-lg vintage-text font-semibold mb-3">Player Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[PlayerRole.RETAILER, PlayerRole.WHOLESALER, PlayerRole.DISTRIBUTOR, PlayerRole.FACTORY].map((role) => (
              <div
                key={role}
                className={`text-center p-2 rounded ${
                  submittedRoles.includes(role)
                    ? 'bg-green-800 bg-opacity-30'
                    : 'bg-red-800 bg-opacity-20'
                }`}
              >
                <div className="font-semibold">{roleNames[role]}</div>
                <div className="text-sm">
                  {submittedRoles.includes(role) ? '✓ Ready' : '⏳ Waiting'}
                </div>
              </div>
            ))}
          </div>
        </TexturedPanel>
      </div>
    </div>
  );
}
