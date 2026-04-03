import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { networkInterfaces } from 'os';
import path from 'path';
import { LobbyManager } from './lobby/LobbyManager';
import { setupSocketHandlers } from './socket/socketHandlers';

const app = express();
const httpServer = createServer(app);

// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins for local development
  credentials: true
}));

// Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Create lobby manager
const lobbyManager = new LobbyManager();

// Setup socket event handlers
setupSocketHandlers(io, lobbyManager);

// Basic health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get list of rooms (for debugging)
app.get('/rooms', (_req, res) => {
  const rooms = lobbyManager.getAllRooms();
  res.json({ rooms, count: rooms.length });
});

// Serve static files from client build in production
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientPath));

  // Fallback to index.html for client-side routing
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces for network access

httpServer.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🍺 Beer Game Server Running                             ║
║                                                            ║
║   Local:    http://localhost:${PORT}                          ║
║   Network:  http://<your-ip>:${PORT}                        ║
║                                                            ║
║   WebSocket: ws://localhost:${PORT}                           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);

  // Try to get local IP address
  const nets = networkInterfaces();
  console.log('\n📡 Network Interfaces:');

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal addresses
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`   - ${name}: http://${net.address}:${PORT}`);
      }
    }
  }

  console.log('\n✨ Waiting for players to connect...\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});
