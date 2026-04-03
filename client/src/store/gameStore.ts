import { create } from 'zustand';
import { GameState, LobbyRoom, PlayerRole, GamePhase } from '../types/game.types';

interface GameStore {
  // Lobby state
  currentRoom: LobbyRoom | null;
  availableRooms: LobbyRoom[];
  playerName: string;
  playerId: string | null;

  // Game state
  gameState: GameState | null;
  myRole: PlayerRole | null;

  // UI state
  currentView: 'menu' | 'lobby' | 'game';
  isWaitingForTurn: boolean;
  lastError: string | null;

  // Actions
  setPlayerName: (name: string) => void;
  setPlayerId: (id: string) => void;
  setCurrentRoom: (room: LobbyRoom | null) => void;
  setAvailableRooms: (rooms: LobbyRoom[]) => void;
  setGameState: (state: GameState) => void;
  setMyRole: (role: PlayerRole | null) => void;
  setCurrentView: (view: 'menu' | 'lobby' | 'game') => void;
  setIsWaitingForTurn: (waiting: boolean) => void;
  setLastError: (error: string | null) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  currentRoom: null,
  availableRooms: [],
  playerName: '',
  playerId: null,
  gameState: null,
  myRole: null,
  currentView: 'menu',
  isWaitingForTurn: false,
  lastError: null,

  // Actions
  setPlayerName: (name) => set({ playerName: name }),
  setPlayerId: (id) => set({ playerId: id }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setAvailableRooms: (rooms) => set({ availableRooms: rooms }),
  setGameState: (state) => set({ gameState: state }),
  setMyRole: (role) => set({ myRole: role }),
  setCurrentView: (view) => set({ currentView: view }),
  setIsWaitingForTurn: (waiting) => set({ isWaitingForTurn: waiting }),
  setLastError: (error) => set({ lastError: error }),

  reset: () =>
    set({
      currentRoom: null,
      availableRooms: [],
      gameState: null,
      myRole: null,
      currentView: 'menu',
      isWaitingForTurn: false,
      lastError: null,
    }),
}));
