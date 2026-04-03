import { LobbyRoom, Player } from '../types/game.types';
import { GameRoom } from '../game/GameRoom';

export class LobbyManager {
  private rooms: Map<string, LobbyRoom> = new Map();
  private playerToRoom: Map<string, string> = new Map(); // playerId -> roomId
  private gameRooms: Map<string, GameRoom> = new Map(); // roomId -> GameRoom

  /**
   * Create a new room
   */
  public createRoom(hostId: string, hostSocketId: string, hostName: string): string {
    const roomId = this.generateRoomId();

    const host: Player = {
      id: hostId,
      socketId: hostSocketId,
      name: hostName,
      role: null,
      isReady: false,
      isConnected: true
    };

    const room: LobbyRoom = {
      roomId,
      hostId,
      players: [host],
      maxPlayers: 4,
      createdAt: new Date()
    };

    this.rooms.set(roomId, room);
    this.playerToRoom.set(hostId, roomId);

    return roomId;
  }

  /**
   * Join an existing room
   */
  public joinRoom(roomId: string, playerId: string, socketId: string, playerName: string): { success: boolean; error?: string } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.players.length >= room.maxPlayers) {
      return { success: false, error: 'Room is full' };
    }

    // Check if player already in another room
    if (this.playerToRoom.has(playerId)) {
      return { success: false, error: 'Already in another room' };
    }

    const player: Player = {
      id: playerId,
      socketId,
      name: playerName,
      role: null,
      isReady: false,
      isConnected: true
    };

    room.players.push(player);
    this.playerToRoom.set(playerId, roomId);

    return { success: true };
  }

  /**
   * Leave a room
   */
  public leaveRoom(playerId: string): { roomId: string | null; wasHost: boolean } {
    const roomId = this.playerToRoom.get(playerId);
    if (!roomId) {
      return { roomId: null, wasHost: false };
    }

    const room = this.rooms.get(roomId);
    if (!room) {
      return { roomId: null, wasHost: false };
    }

    const wasHost = room.hostId === playerId;

    // Remove player from room
    room.players = room.players.filter(p => p.id !== playerId);
    this.playerToRoom.delete(playerId);

    // If room is empty or host left, delete the room
    if (room.players.length === 0 || wasHost) {
      this.rooms.delete(roomId);
      this.gameRooms.delete(roomId);

      // Remove all players from this room
      room.players.forEach(p => {
        this.playerToRoom.delete(p.id);
      });
    }

    return { roomId, wasHost };
  }

  /**
   * Mark player as ready
   */
  public setPlayerReady(playerId: string): boolean {
    const roomId = this.playerToRoom.get(playerId);
    if (!roomId) return false;

    const room = this.rooms.get(roomId);
    if (!room) return false;

    const player = room.players.find(p => p.id === playerId);
    if (!player) return false;

    player.isReady = true;
    return true;
  }

  /**
   * Check if all players in a room are ready
   */
  public allPlayersReady(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    return room.players.length === room.maxPlayers &&
           room.players.every(p => p.isReady);
  }

  /**
   * Get a room by ID
   */
  public getRoom(roomId: string): LobbyRoom | null {
    return this.rooms.get(roomId) || null;
  }

  /**
   * Get all available rooms
   */
  public getAllRooms(): LobbyRoom[] {
    return Array.from(this.rooms.values());
  }

  /**
   * Get room ID for a player
   */
  public getRoomIdForPlayer(playerId: string): string | null {
    return this.playerToRoom.get(playerId) || null;
  }

  /**
   * Start a game for a room
   */
  public startGame(roomId: string): { success: boolean; error?: string; gameRoom?: GameRoom } {
    const room = this.rooms.get(roomId);
    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.players.length !== room.maxPlayers) {
      return { success: false, error: 'Need exactly 4 players to start' };
    }

    if (!this.allPlayersReady(roomId)) {
      return { success: false, error: 'Not all players are ready' };
    }

    // Create game room
    const gameRoom = new GameRoom(roomId, room.players);
    this.gameRooms.set(roomId, gameRoom);

    return { success: true, gameRoom };
  }

  /**
   * Get game room by room ID
   */
  public getGameRoom(roomId: string): GameRoom | null {
    return this.gameRooms.get(roomId) || null;
  }

  /**
   * Generate a unique room ID
   */
  private generateRoomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check for collisions (unlikely but possible)
    if (this.rooms.has(id)) {
      return this.generateRoomId();
    }

    return id;
  }

  /**
   * Update player socket ID (for reconnections)
   */
  public updatePlayerSocket(playerId: string, newSocketId: string): boolean {
    const roomId = this.playerToRoom.get(playerId);
    if (!roomId) return false;

    const room = this.rooms.get(roomId);
    if (!room) return false;

    const player = room.players.find(p => p.id === playerId);
    if (!player) return false;

    player.socketId = newSocketId;
    player.isConnected = true;
    return true;
  }

  /**
   * Mark player as disconnected
   */
  public markPlayerDisconnected(socketId: string): { playerId: string; roomId: string } | null {
    // Find player by socket ID
    for (const [roomId, room] of this.rooms.entries()) {
      const player = room.players.find(p => p.socketId === socketId);
      if (player) {
        player.isConnected = false;
        return { playerId: player.id, roomId };
      }
    }
    return null;
  }
}
