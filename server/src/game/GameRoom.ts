import {
  GameState,
  GamePhase,
  PlayerRole,
  Player,
  PlayerState,
  GameConfig,
  DEFAULT_CONFIG
} from '../types/game.types';
import {
  calculateCosts,
  processPipeline,
  generateDemandPattern,
  initializePlayerState,
  fulfillOrders
} from './gameLogic';

export class GameRoom {
  private gameState: GameState;
  private config: GameConfig;

  constructor(roomId: string, players: Player[], config: GameConfig = DEFAULT_CONFIG) {
    this.config = config;

    // Initialize game state
    const playerStates: { [role: string]: PlayerState } = {};
    const playersMap: { [role: string]: Player } = {};
    const turnSubmissions: { [role: string]: number | null } = {};

    // Assign roles to players
    const roles = [PlayerRole.RETAILER, PlayerRole.WHOLESALER, PlayerRole.DISTRIBUTOR, PlayerRole.FACTORY];
    players.forEach((player, index) => {
      const role = roles[index];
      player.role = role;
      playersMap[role] = player;
      playerStates[role] = initializePlayerState(role, config);
      turnSubmissions[role] = null;
    });

    // Special initialization for Retailer - they only see current demand, not future
    playerStates[PlayerRole.RETAILER].incomingOrders = {
      week1: config.initialDemand,  // Current customer demand
      week2: 0,  // Future demand is unknown
      week3: 0,  // Future demand is unknown
      week4: 0   // Future demand is unknown
    };

    this.gameState = {
      roomId,
      phase: GamePhase.PLAYING,
      currentWeek: 1,
      maxWeeks: config.maxWeeks,
      players: playersMap,
      playerStates,
      turnSubmissions,
      customerDemand: config.initialDemand,
      demandPattern: generateDemandPattern(config)
    };
  }

  /**
   * Get the current game state
   */
  public getGameState(): GameState {
    return this.gameState;
  }

  /**
   * Receive an order from a player
   */
  public receiveOrder(role: PlayerRole, quantity: number): boolean {
    // Validate
    if (quantity < 0) {
      return false;
    }

    if (this.gameState.phase !== GamePhase.PLAYING) {
      return false;
    }

    if (this.gameState.turnSubmissions[role] !== null) {
      return false; // Already submitted
    }

    // Store the order
    this.gameState.turnSubmissions[role] = quantity;

    return true;
  }

  /**
   * Check if all players have submitted their orders
   */
  public allPlayersSubmitted(): boolean {
    return Object.values(this.gameState.turnSubmissions).every(order => order !== null);
  }

  /**
   * Get which players have submitted
   */
  public getSubmittedPlayers(): PlayerRole[] {
    return Object.entries(this.gameState.turnSubmissions)
      .filter(([_, order]) => order !== null)
      .map(([role, _]) => role as PlayerRole);
  }

  /**
   * Process the turn - core game logic
   */
  public processTurn(): void {
    const roles = [PlayerRole.FACTORY, PlayerRole.DISTRIBUTOR, PlayerRole.WHOLESALER, PlayerRole.RETAILER];

    // Process each player in order (factory -> retailer)
    for (const role of roles) {
      const playerState = this.gameState.playerStates[role];
      const orderPlaced = this.gameState.turnSubmissions[role]!;

      // Step 1: Receive incoming shipment (from 2 weeks ago)
      const incomingShipment = playerState.incomingShipments.week1;
      playerState.inventory += incomingShipment;

      // Step 2: Determine incoming order
      let incomingOrder = 0;
      if (role === PlayerRole.RETAILER) {
        // Retailer gets customer demand
        incomingOrder = this.gameState.customerDemand;
      } else {
        // Other players get orders from downstream
        incomingOrder = playerState.incomingOrders.week1;
      }

      // Step 3: Fulfill orders (backorders first, then new orders)
      const { shipped, newInventory, newBackorder } = fulfillOrders(
        playerState.inventory,
        playerState.backorder,
        incomingOrder
      );

      playerState.inventory = newInventory;
      playerState.backorder = newBackorder;

      // Step 4: Calculate costs
      const costs = calculateCosts(playerState.inventory, playerState.backorder, this.config);
      playerState.costsThisWeek = costs;
      playerState.totalCost += costs.holding + costs.backorder;

      // Step 5: Ship to downstream player (enters their incoming shipments pipeline)
      if (role !== PlayerRole.RETAILER) {
        const downstreamRole = this.getDownstreamRole(role);
        if (downstreamRole) {
          const downstreamState = this.gameState.playerStates[downstreamRole];
          downstreamState.incomingShipments = processPipeline(downstreamState.incomingShipments, shipped);
        }
      }

      // Step 6: Send order to upstream player (enters their incoming orders pipeline)
      if (role !== PlayerRole.FACTORY) {
        const upstreamRole = this.getUpstreamRole(role);
        if (upstreamRole) {
          const upstreamState = this.gameState.playerStates[upstreamRole];
          upstreamState.incomingOrders = processPipeline(upstreamState.incomingOrders, orderPlaced);
        }
      } else {
        // Factory processes its own production order
        playerState.incomingShipments = processPipeline(playerState.incomingShipments, orderPlaced);
      }

      // Step 7: Advance outgoing shipments pipeline
      playerState.outgoingShipments = processPipeline(playerState.outgoingShipments, shipped);

      // Step 8: Advance incoming shipments pipeline (already done above for upstream deliveries)
      // (This is handled by upstream players shipping to us)

      // Store the order placed for reference
      playerState.lastOrderPlaced = orderPlaced;
    }

    // Move to next week
    this.gameState.currentWeek++;

    // Update customer demand for next week
    if (this.gameState.currentWeek <= this.gameState.maxWeeks) {
      this.gameState.customerDemand = this.gameState.demandPattern[this.gameState.currentWeek - 1];

      // Update Retailer's incomingOrders to reflect ONLY current customer demand
      // Retailer should not see future demand - it defeats the pedagogical purpose
      const retailerState = this.gameState.playerStates[PlayerRole.RETAILER];
      retailerState.incomingOrders = {
        week1: this.gameState.customerDemand,  // Current demand only
        week2: 0,  // Future demand - unknown
        week3: 0,  // Future demand - unknown
        week4: 0   // Future demand - not visible
      };
    }

    // Clear turn submissions for next turn
    for (const role of roles) {
      this.gameState.turnSubmissions[role] = null;
    }

    // Check if game is finished
    if (this.gameState.currentWeek > this.gameState.maxWeeks) {
      this.gameState.phase = GamePhase.FINISHED;
    }
  }

  /**
   * Check if game has ended
   */
  public isGameEnded(): boolean {
    return this.gameState.phase === GamePhase.FINISHED;
  }

  /**
   * Get the role downstream from the given role
   */
  private getDownstreamRole(role: PlayerRole): PlayerRole | null {
    switch (role) {
      case PlayerRole.FACTORY:
        return PlayerRole.DISTRIBUTOR;
      case PlayerRole.DISTRIBUTOR:
        return PlayerRole.WHOLESALER;
      case PlayerRole.WHOLESALER:
        return PlayerRole.RETAILER;
      default:
        return null;
    }
  }

  /**
   * Get the role upstream from the given role
   */
  private getUpstreamRole(role: PlayerRole): PlayerRole | null {
    switch (role) {
      case PlayerRole.RETAILER:
        return PlayerRole.WHOLESALER;
      case PlayerRole.WHOLESALER:
        return PlayerRole.DISTRIBUTOR;
      case PlayerRole.DISTRIBUTOR:
        return PlayerRole.FACTORY;
      default:
        return null;
    }
  }

  /**
   * Get player state for a specific role
   */
  public getPlayerState(role: PlayerRole): PlayerState | null {
    return this.gameState.playerStates[role] || null;
  }
}
