export enum PlayerRole {
  RETAILER = 'retailer',
  WHOLESALER = 'wholesaler',
  DISTRIBUTOR = 'distributor',
  FACTORY = 'factory'
}

export enum GamePhase {
  LOBBY = 'lobby',
  PLAYING = 'playing',
  FINISHED = 'finished'
}

export interface Player {
  id: string;
  socketId: string;
  name: string;
  role: PlayerRole | null;
  isReady: boolean;
  isConnected: boolean;
}

export interface OrderPipeline {
  week1: number;  // 2 weeks ago (will arrive this turn)
  week2: number;  // 1 week ago
  week3: number;  // This week
  week4: number;  // Next week
}

export interface PlayerState {
  role: PlayerRole;
  inventory: number;
  backorder: number;
  lastOrderPlaced: number;
  incomingOrders: OrderPipeline;      // Orders from downstream
  outgoingShipments: OrderPipeline;   // Shipments to downstream
  incomingShipments: OrderPipeline;   // Deliveries from upstream
  costsThisWeek: {
    holding: number;
    backorder: number;
  };
  totalCost: number;
}

export interface GameState {
  roomId: string;
  phase: GamePhase;
  currentWeek: number;
  maxWeeks: number;
  players: { [role: string]: Player };
  playerStates: { [role: string]: PlayerState };
  turnSubmissions: { [role: string]: number | null };  // Who has submitted this turn
  customerDemand: number;  // Current week's consumer demand
  demandPattern: number[];  // Pre-generated demand for all weeks
}

export interface LobbyRoom {
  roomId: string;
  hostId: string;
  players: Player[];
  maxPlayers: number;
  createdAt: Date;
  gameState?: GameState;
}

export interface GameConfig {
  startingInventory: number;      // 12 cases
  pipelineInventory: number;      // 4 cases per pipeline slot
  initialDemand: number;          // 4 cases/week
  demandJump: number;             // 8 cases/week
  demandJumpWeek: number;         // Week 5
  holdingCost: number;            // $0.50 per case
  backorderCost: number;          // $1.00 per case
  orderDelay: number;             // 2 weeks
  shippingDelay: number;          // 2 weeks
  maxWeeks: number;               // 36-50
}

export const DEFAULT_CONFIG: GameConfig = {
  startingInventory: 12,
  pipelineInventory: 4,
  initialDemand: 4,
  demandJump: 8,
  demandJumpWeek: 5,
  holdingCost: 0.5,
  backorderCost: 1.0,
  orderDelay: 2,
  shippingDelay: 2,
  maxWeeks: 36
};

// Socket event types
export interface ServerToClientEvents {
  'lobby:rooms': (rooms: LobbyRoom[]) => void;
  'lobby:update': (room: LobbyRoom) => void;
  'lobby:full': (roomId: string) => void;
  'game:initialized': (gameState: GameState) => void;
  'game:turn_start': (week: number) => void;
  'game:turn_complete': (gameState: GameState) => void;
  'game:player_submitted': (role: PlayerRole) => void;
  'game:ended': (gameState: GameState) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  'lobby:create': (playerName: string, callback: (roomId: string) => void) => void;
  'lobby:join': (roomId: string, playerName: string, callback: (success: boolean, error?: string) => void) => void;
  'lobby:leave': () => void;
  'lobby:ready': () => void;
  'game:start': (callback: (success: boolean, error?: string) => void) => void;
  'game:submit_order': (quantity: number, callback: (success: boolean, error?: string) => void) => void;
  'game:request_state': (callback: (gameState: GameState | null) => void) => void;
}
