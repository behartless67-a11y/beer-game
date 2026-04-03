import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '../types/game.types';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

let socket: TypedSocket | null = null;

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    // Initialize socket connection if not already initialized
    if (!socket) {
      socket = io(SERVER_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      }) as TypedSocket;

      // Connection events
      socket.on('connect', () => {
        console.log('Socket connected:', socket?.id);
        setIsConnected(true);
        setIsReconnecting(false);
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setIsConnected(false);
      });

      socket.io.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
        setIsReconnecting(true);
      });

      socket.io.on('reconnect', () => {
        console.log('Reconnected successfully');
        setIsReconnecting(false);
      });

      socket.io.on('reconnect_error', (error) => {
        console.error('Reconnection error:', error);
      });

      socket.io.on('reconnect_failed', () => {
        console.error('Reconnection failed');
        setIsReconnecting(false);
      });
    }

    // Cleanup on unmount
    return () => {
      // Note: We don't disconnect the socket here to maintain connection across component re-renders
      // Disconnect should be handled explicitly by the application when needed
    };
  }, []);

  return {
    socket,
    isConnected,
    isReconnecting,
  };
}

// Helper function to disconnect socket (call this when leaving the app)
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
