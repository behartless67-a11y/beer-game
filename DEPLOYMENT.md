# Beer Game - IT Deployment Guide

## Project Overview

**Project Name:** The Beer Game - Multiplayer Simulation
**Purpose:** Educational web application for teaching systems dynamics and supply chain management
**Type:** Real-time multiplayer game (4 players per room)
**Target Audience:** University students and executive education participants

This is a full-stack web application that simulates the classic MIT Beer Distribution Game. Students connect via browser, form teams of 4, and experience the bullwhip effect in supply chains through real-time gameplay.

---

## Technical Architecture

### Technology Stack

**Frontend (Client):**
- React 18 with TypeScript
- Vite (build tool and dev server)
- Zustand (state management)
- Tailwind CSS (styling)
- Socket.io-client (real-time communication)

**Backend (Server):**
- Node.js with Express
- TypeScript
- Socket.io (WebSocket server)
- In-memory state (no database required)

**Communication:**
- WebSocket (Socket.io) for real-time bidirectional communication
- REST endpoints for health checks

### Application Structure

```
beer-game/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management
│   │   └── types/          # TypeScript definitions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Backend application
│   ├── src/
│   │   ├── game/           # Game logic and rules
│   │   ├── lobby/          # Room management
│   │   ├── socket/         # WebSocket handlers
│   │   └── server.ts       # Main entry point
│   └── package.json
└── package.json            # Root package (scripts)
```

---

## System Requirements

### Minimum Requirements
- **Operating System:** Linux, macOS, or Windows Server
- **Node.js:** v18.0.0 or higher (recommend v20 LTS)
- **npm:** v9.0.0 or higher
- **RAM:** 512 MB (1GB recommended for production)
- **Disk Space:** 500 MB
- **Network:** Stable internet connection, open ports 3000 and 5173 (or custom)

### Recommended Production Setup
- **OS:** Ubuntu 22.04 LTS or similar
- **Node.js:** v20 LTS
- **RAM:** 2 GB
- **CPU:** 2 cores
- **Reverse Proxy:** Nginx or Apache
- **Process Manager:** PM2 or systemd
- **SSL Certificate:** Let's Encrypt (for HTTPS)

---

## Installation Steps

### 1. Prerequisites

Install Node.js and npm:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18+
npm --version   # Should be v9+
```

### 2. Clone or Transfer Project Files

Transfer the entire `beer-game` directory to your server:
```bash
# Example using scp
scp -r /Users/asp2d/beer-game username@server:/var/www/

# Or using git (if hosted in repository)
git clone <repository-url> /var/www/beer-game
```

### 3. Install Dependencies

```bash
cd /var/www/beer-game

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Return to root
cd ..
```

---

## Configuration

### Environment Variables

Create environment files for different environments:

**Server Environment (`server/.env`):**
```bash
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# CORS Settings (update with your domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Logging
LOG_LEVEL=info
```

**Client Environment (`client/.env.production`):**
```bash
# API Configuration
VITE_API_URL=https://yourdomain.com
VITE_WS_URL=wss://yourdomain.com
```

### Port Configuration

Default ports:
- **Backend Server:** 3000
- **Frontend Dev Server:** 5173 (development only)

To change the server port, set the `PORT` environment variable or modify `server/src/server.ts`:
```typescript
const PORT = Number(process.env.PORT) || 3000;
```

### CORS Configuration

For production, update the CORS settings in `server/src/server.ts`:
```typescript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});
```

---

## Deployment Options

### Option 1: Development Mode (Quick Test)

Use this for testing on a staging server:

```bash
cd /var/www/beer-game
npm run dev
```

This runs both client (port 5173) and server (port 3000) in development mode with hot-reload.

**Access:**
- Client: http://server-ip:5173
- Server API: http://server-ip:3000

### Option 2: Production Build (Recommended)

#### A. Build the Applications

```bash
cd /var/www/beer-game

# Build client (creates static files)
cd client
npm run build  # Output: client/dist/

# Build server (compiles TypeScript)
cd ../server
npm run build  # Output: server/dist/
```

#### B. Serve with Static File Server

**Option 2A: Serve with Express (Simple)**

Modify `server/src/server.ts` to serve the client build:
```typescript
import path from 'path';

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
```

Then run:
```bash
cd /var/www/beer-game/server
node dist/server.js
```

**Option 2B: Serve with Nginx (Recommended)**

Nginx configuration (`/etc/nginx/sites-available/beer-game`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Client static files
    root /var/www/beer-game/client/dist;
    index index.html;

    # Client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /health {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /rooms {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket proxy for Socket.io
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket timeout settings
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/beer-game /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### C. Process Management with PM2

Install PM2 globally:
```bash
sudo npm install -g pm2
```

Create PM2 ecosystem file (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'beer-game-server',
    script: './server/dist/server.js',
    cwd: '/var/www/beer-game',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/beer-game/error.log',
    out_file: '/var/log/beer-game/access.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

Start with PM2:
```bash
cd /var/www/beer-game

# Create log directory
sudo mkdir -p /var/log/beer-game
sudo chown $USER:$USER /var/log/beer-game

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-start on reboot
pm2 startup systemd
# Follow the command it provides
```

PM2 Management Commands:
```bash
pm2 status              # Check status
pm2 logs beer-game-server  # View logs
pm2 restart beer-game-server  # Restart
pm2 stop beer-game-server     # Stop
pm2 delete beer-game-server   # Remove from PM2
```

---

## Network Requirements

### Firewall Configuration

**Required Ports:**

| Port | Protocol | Purpose | Access |
|------|----------|---------|--------|
| 80 | TCP | HTTP (redirect to HTTPS) | Public |
| 443 | TCP | HTTPS | Public |
| 3000 | TCP | Backend API/WebSocket | Internal only (behind proxy) |

**Ubuntu/Debian (ufw):**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH access
sudo ufw enable
```

**CentOS/RHEL (firewalld):**
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### SSL/TLS Certificate (HTTPS)

Using Let's Encrypt (recommended):
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Testing the Deployment

### 1. Health Check

```bash
curl http://localhost:3000/health
# Expected: {"status":"ok","timestamp":"2024-..."}
```

### 2. WebSocket Connection Test

Create a test file `test-socket.js`:
```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✓ Connected to server');
  console.log('Socket ID:', socket.id);
  process.exit(0);
});

socket.on('connect_error', (err) => {
  console.error('✗ Connection failed:', err.message);
  process.exit(1);
});
```

Run:
```bash
cd /var/www/beer-game
node test-socket.js
```

### 3. Full Application Test

1. Open browser to `https://yourdomain.com`
2. Create a new game room
3. Open 3 more browser tabs/windows
4. Join the room from each tab
5. Mark all players ready and start the game
6. Submit orders and verify turn processing

---

## Monitoring and Maintenance

### Log Files

**PM2 Logs:**
```bash
pm2 logs beer-game-server
pm2 logs beer-game-server --lines 100  # Last 100 lines
pm2 flush beer-game-server  # Clear logs
```

**Nginx Logs:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Monitoring Metrics

Check application health:
```bash
# Server health
curl https://yourdomain.com/health

# Active rooms
curl https://yourdomain.com/rooms

# PM2 monitoring
pm2 monit
```

### Resource Usage

Monitor server resources:
```bash
# CPU and Memory
htop

# Disk usage
df -h

# Network connections
netstat -tulpn | grep 3000
```

### Maintenance Tasks

**Weekly:**
- Review logs for errors
- Check disk space
- Verify SSL certificate status

**Monthly:**
- Update Node.js security patches
- Review and clear old logs
- Test backup/restore procedures

**Updates:**
```bash
cd /var/www/beer-game

# Pull latest code (if using git)
git pull origin main

# Reinstall dependencies
npm install
cd client && npm install
cd ../server && npm install

# Rebuild applications
cd /var/www/beer-game/client
npm run build
cd ../server
npm run build

# Restart server
pm2 restart beer-game-server
```

---

## Scaling Considerations

### Current Architecture Limitations

- **In-memory state:** Server restart clears all active games
- **Single server:** No horizontal scaling
- **No persistence:** Game history not saved

### For High-Traffic Scenarios

If you expect more than 50 concurrent games (200+ users):

1. **Add Redis for session storage:**
   - Install Redis adapter for Socket.io
   - Store room state in Redis
   - Enable multiple server instances

2. **Load balancing:**
   - Use Nginx/HAProxy for load balancing
   - Enable sticky sessions for WebSocket
   - Configure Socket.io for multi-server

3. **Database (optional):**
   - Add PostgreSQL/MongoDB for game history
   - Store completed game results for analysis
   - Track user sessions

### Multi-Server Setup (Advanced)

If needed, consult with developer about implementing:
- Redis adapter for Socket.io
- Session affinity in load balancer
- Shared state across instances

---

## Troubleshooting

### Server Won't Start

**Check logs:**
```bash
pm2 logs beer-game-server --err
```

**Common issues:**
- Port 3000 already in use: `sudo lsof -i :3000`
- Missing dependencies: `npm install` in server directory
- TypeScript not compiled: `cd server && npm run build`

### WebSocket Connection Failures

**Symptoms:** Client shows "Connecting to server..." indefinitely

**Checks:**
1. Verify server is running: `pm2 status`
2. Check firewall: `sudo ufw status`
3. Test WebSocket: `curl -i http://localhost:3000/socket.io/`
4. Review Nginx config for proper WebSocket proxy
5. Check CORS settings in server code

**Browser console errors:**
```
F12 > Console tab
Look for Socket.io connection errors
```

### Players Can't Join Rooms

**Check:**
- Server logs for room creation errors
- Network connectivity between players
- Browser console for JavaScript errors
- CORS settings allow the client origin

### High Memory Usage

**Monitor:**
```bash
pm2 monit
```

**Actions:**
- Restart server to clear memory: `pm2 restart beer-game-server`
- Check for memory leaks in logs
- Adjust PM2 max_memory_restart setting

### SSL Certificate Issues

**Test certificate:**
```bash
sudo certbot certificates
```

**Renew manually:**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Security Considerations

### Production Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] CORS restricted to specific domains
- [ ] Node.js and npm updated to latest LTS
- [ ] npm audit run and vulnerabilities addressed
- [ ] Server runs as non-root user
- [ ] Sensitive data not logged
- [ ] Rate limiting configured (if needed)
- [ ] Security headers configured in Nginx

### Nginx Security Headers

Add to Nginx config:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" always;
```

### Regular Security Updates

```bash
# Update system packages
sudo apt-get update && sudo apt-get upgrade -y

# Update npm packages
cd /var/www/beer-game
npm audit fix

# Rebuild if updates applied
cd client && npm run build
cd ../server && npm run build
pm2 restart beer-game-server
```

---

## Backup and Recovery

### Files to Backup

**Essential:**
- `/var/www/beer-game/` (entire application)
- `/etc/nginx/sites-available/beer-game` (Nginx config)
- `ecosystem.config.js` (PM2 config)

**Optional:**
- `/var/log/beer-game/` (application logs)
- SSL certificates (if not using Let's Encrypt)

### Backup Script

```bash
#!/bin/bash
BACKUP_DIR="/backups/beer-game"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup application
tar -czf "$BACKUP_DIR/beer-game-$DATE.tar.gz" /var/www/beer-game

# Backup Nginx config
cp /etc/nginx/sites-available/beer-game "$BACKUP_DIR/nginx-config-$DATE"

# Keep only last 7 days
find "$BACKUP_DIR" -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Restore Procedure

```bash
# Stop services
pm2 stop beer-game-server

# Restore files
cd /var/www
tar -xzf /backups/beer-game/beer-game-YYYYMMDD_HHMMSS.tar.gz

# Restore Nginx config
sudo cp /backups/beer-game/nginx-config-YYYYMMDD_HHMMSS /etc/nginx/sites-available/beer-game
sudo nginx -t
sudo systemctl reload nginx

# Restart application
cd /var/www/beer-game
pm2 restart beer-game-server
```

---

## Support and Contact

### Application Information
- **Project Location:** `/var/www/beer-game/`
- **Documentation:** See `README.md` in project root
- **Game Rules:** Documented in README.md under "Game Rules"

### Useful Commands Quick Reference

```bash
# View application status
pm2 status

# View logs
pm2 logs beer-game-server

# Restart application
pm2 restart beer-game-server

# Check health
curl http://localhost:3000/health

# View active rooms
curl http://localhost:3000/rooms

# Nginx commands
sudo nginx -t              # Test config
sudo systemctl reload nginx  # Reload config
sudo systemctl status nginx  # Check status

# SSL certificate
sudo certbot certificates
sudo certbot renew
```

### Getting Help

**Application Issues:**
- Check PM2 logs: `pm2 logs beer-game-server`
- Check browser console (F12)
- Review troubleshooting section above

**Server Issues:**
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify network connectivity
- Check firewall settings

**Contact Developer:**
- For code issues or feature requests
- For architecture changes
- For scaling beyond current capacity

---

## Appendix: Game Configuration

### Modifying Game Parameters

Edit `server/src/types/game.types.ts`:

```typescript
export const DEFAULT_CONFIG: GameConfig = {
  startingInventory: 12,      // Initial inventory per player
  pipelineInventory: 4,       // Cases in each pipeline slot
  initialDemand: 4,           // Starting customer demand
  demandJump: 8,              // Demand after jump
  demandJumpWeek: 5,          // Week when demand increases
  holdingCost: 0.5,           // Cost per case per week (inventory)
  backorderCost: 1.0,         // Cost per case per week (shortage)
  orderDelay: 2,              // Weeks for order to reach supplier
  shippingDelay: 2,           // Weeks for shipment to arrive
  maxWeeks: 36                // Total game length
};
```

After changes:
```bash
cd /var/www/beer-game/server
npm run build
pm2 restart beer-game-server
```

---

**Document Version:** 1.0
**Last Updated:** March 2024
**Prepared for:** UVA Batten School IT Department
**Application Owner:** Professor (asp2d)
