import { PlayerRole } from '../../types/game.types';
import { TexturedPanel } from '../UI/TexturedPanel';
import { Button } from '../UI/Button';

interface RoleOrientationProps {
  role: PlayerRole;
  onContinue: () => void;
}

const roleInfo: Record<PlayerRole, {
  title: string;
  description: string[];
  yourJob: string[];
  keyPoints: string[];
}> = {
  [PlayerRole.RETAILER]: {
    title: 'Retailer',
    description: [
      'Welcome! You are the Retailer - the face of the supply chain.',
      'You sell beer directly to customers at your store.',
    ],
    yourJob: [
      'Meet customer demand each week',
      'Order inventory from the Wholesaler',
      'Try to keep about 12 cases in stock at your store',
    ],
    keyPoints: [
      '🎯 Target: Keep about 12 cases in stock to meet customer demand',
      '📦 Orders take 2 weeks to reach the Wholesaler',
      '🚚 Shipments take 2 weeks to arrive (4 weeks total)',
      '💰 Holding inventory costs $0.50 per case per week',
      '⚠️ Backorders (unfilled demand) cost $1.00 per case per week',
      '🎯 Your goal: minimize total costs over 36 weeks',
    ],
  },
  [PlayerRole.WHOLESALER]: {
    title: 'Wholesaler',
    description: [
      'Welcome! You are the Wholesaler - the middle link in the chain.',
      'You supply beer to the Retailer and manage regional distribution.',
    ],
    yourJob: [
      'Fill orders from the Retailer',
      'Order inventory from the Distributor',
      'Balance supply and demand',
    ],
    keyPoints: [
      '📦 Orders take 2 weeks to reach the Distributor',
      '🚚 Shipments take 2 weeks to arrive (4 weeks total)',
      '💰 Holding inventory costs $0.50 per case per week',
      '⚠️ Backorders (unfilled orders) cost $1.00 per case per week',
      '📊 You can only see Retailer orders - not actual customer demand',
      '🎯 Your goal: minimize total costs over 36 weeks',
    ],
  },
  [PlayerRole.DISTRIBUTOR]: {
    title: 'Distributor',
    description: [
      'Welcome! You are the Distributor - connecting regions to production.',
      'You supply beer to the Wholesaler and coordinate with the Factory.',
    ],
    yourJob: [
      'Fill orders from the Wholesaler',
      'Order inventory from the Factory',
      'Anticipate supply chain needs',
    ],
    keyPoints: [
      '📦 Orders take 2 weeks to reach the Factory',
      '🚚 Shipments take 2 weeks to arrive (4 weeks total)',
      '💰 Holding inventory costs $0.50 per case per week',
      '⚠️ Backorders (unfilled orders) cost $1.00 per case per week',
      '📊 You can only see Wholesaler orders - not retail or customer data',
      '🎯 Your goal: minimize total costs over 36 weeks',
    ],
  },
  [PlayerRole.FACTORY]: {
    title: 'Factory',
    description: [
      'Welcome! You are the Factory - the source of all beer.',
      'You brew beer and supply it to the entire distribution chain.',
    ],
    yourJob: [
      'Fill orders from the Distributor',
      'Schedule beer production runs',
      'Manage brewing capacity and inventory',
    ],
    keyPoints: [
      '🏭 Production orders take 2 weeks to process',
      '🚚 Shipments take 2 weeks to reach Distributor (4 weeks total)',
      '💰 Holding inventory costs $0.50 per case per week',
      '⚠️ Backorders (unfilled orders) cost $1.00 per case per week',
      '📊 You can only see Distributor orders - furthest from customers',
      '🎯 Your goal: minimize total costs over 36 weeks',
    ],
  },
};

export function RoleOrientation({ role, onContinue }: RoleOrientationProps) {
  const info = roleInfo[role];

  return (
    <div className="min-h-screen myst-container flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <TexturedPanel className="text-aged-paper">
          <div className="text-center mb-6">
            <h1 className="text-5xl vintage-text mb-2">Your Role</h1>
            <h2 className="text-4xl vintage-text text-brass-light">{info.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              {info.description.map((line, i) => (
                <p key={i} className="text-lg mb-2 opacity-90">
                  {line}
                </p>
              ))}
            </div>

            <div className="brass-panel p-4 rounded-lg">
              <h3 className="text-xl vintage-text font-semibold mb-3">Your Job:</h3>
              <ul className="space-y-2">
                {info.yourJob.map((item, i) => (
                  <li key={i} className="text-lg">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl vintage-text font-semibold mb-3">Key Information:</h3>
              <ul className="space-y-2">
                {info.keyPoints.map((point, i) => (
                  <li key={i} className="text-base opacity-90">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-aged-paper bg-opacity-30 p-4 rounded border-2 border-brass-dark">
              <p className="text-sm opacity-75 italic">
                <strong>Remember:</strong> Each player sees only their local information.
                Communication is not allowed during the game. Make the best decisions you
                can based on what you observe.
              </p>
            </div>

            <div className="text-center pt-4">
              <Button size="large" onClick={onContinue}>
                Begin Playing →
              </Button>
            </div>
          </div>
        </TexturedPanel>
      </div>
    </div>
  );
}
