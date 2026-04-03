import { OrderPipeline, PlayerState, GameConfig, DEFAULT_CONFIG } from '../types/game.types';

/**
 * Calculate costs for a player based on inventory and backorder
 */
export function calculateCosts(inventory: number, backorder: number, config: GameConfig = DEFAULT_CONFIG): { holding: number; backorder: number } {
  return {
    holding: Math.max(0, inventory) * config.holdingCost,
    backorder: backorder * config.backorderCost
  };
}

/**
 * Process pipeline - shift queue and add new order
 */
export function processPipeline(pipeline: OrderPipeline, newOrder: number): OrderPipeline {
  return {
    week1: pipeline.week2,
    week2: pipeline.week3,
    week3: pipeline.week4,
    week4: newOrder
  };
}

/**
 * Generate demand pattern for the entire game
 * Week 1: 4 cases
 * Week 2: 8 cases (doubles)
 * Week 3+: 16 cases (doubles again and stays)
 */
export function generateDemandPattern(config: GameConfig = DEFAULT_CONFIG): number[] {
  const pattern: number[] = [];
  for (let week = 1; week <= config.maxWeeks; week++) {
    if (week === 1) {
      pattern.push(config.initialDemand);  // 4 cases
    } else if (week === 2) {
      pattern.push(config.initialDemand * 2);  // 8 cases
    } else {
      pattern.push(config.initialDemand * 4);  // 16 cases (doubled twice)
    }
  }
  return pattern;
}

/**
 * Initialize a player's state at the beginning of the game
 */
export function initializePlayerState(role: string, config: GameConfig = DEFAULT_CONFIG): PlayerState {
  return {
    role: role as any,
    inventory: config.startingInventory,
    backorder: 0,
    lastOrderPlaced: config.initialDemand,
    incomingOrders: {
      week1: config.pipelineInventory,
      week2: config.pipelineInventory,
      week3: config.pipelineInventory,
      week4: config.pipelineInventory
    },
    outgoingShipments: {
      week1: config.pipelineInventory,
      week2: config.pipelineInventory,
      week3: config.pipelineInventory,
      week4: config.pipelineInventory
    },
    incomingShipments: {
      week1: config.pipelineInventory,
      week2: config.pipelineInventory,
      week3: config.pipelineInventory,
      week4: config.pipelineInventory
    },
    costsThisWeek: {
      holding: 0,
      backorder: 0
    },
    totalCost: 0
  };
}

/**
 * Fulfill orders from inventory and backorder
 * Returns the amount actually shipped and the new inventory/backorder
 */
export function fulfillOrders(
  inventory: number,
  backorder: number,
  incomingOrder: number
): { shipped: number; newInventory: number; newBackorder: number } {
  const totalDemand = backorder + incomingOrder;
  const canShip = Math.min(inventory, totalDemand);
  const newBackorder = totalDemand - canShip;
  const newInventory = inventory - canShip;

  return {
    shipped: canShip,
    newInventory,
    newBackorder
  };
}
