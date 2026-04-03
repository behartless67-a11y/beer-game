# Beer Game - Quick Start Guide for IT

## What This Is
A real-time multiplayer web game (4 players per room) for teaching supply chain management. Built with React frontend and Node.js backend using WebSockets.

## Minimum Requirements
- Node.js v18+
- Ubuntu/Linux server (or similar)
- 1GB RAM
- Ports 80, 443 open
- Domain name with SSL

## Quick Production Setup (30 minutes)

### 1. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Transfer Files
```bash
# Put the beer-game folder at:
/var/www/beer-game/
```

### 3. Install Dependencies
```bash
cd /var/www/beer-game
npm install
cd client && npm install && npm run build
cd ../server && npm install && npm run build
cd ../..
```

### 4. Install PM2
```bash
sudo npm install -g pm2
```

### 5. Create PM2 Config
Create `/var/www/beer-game/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'beer-game-server',
    script: './server/dist/server.js',
    cwd: '/var/www/beer-game',
    instances: 1,
    autorestart: true,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### 6. Start Server
```bash
cd /var/www/beer-game
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the command it gives you
```

### 7. Configure Nginx
Create `/etc/nginx/sites-available/beer-game`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /var/www/beer-game/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }

    location ~ ^/(health|rooms) {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/beer-game /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Setup SSL
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 9. Configure Firewall
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 10. Test
```bash
# Check server
curl http://localhost:3000/health

# Check website
curl https://yourdomain.com

# Check PM2
pm2 status
```

---

## Daily Operations

### View Status
```bash
pm2 status
pm2 logs beer-game-server
```

### Restart
```bash
pm2 restart beer-game-server
```

### Update Application
```bash
cd /var/www/beer-game
git pull  # or transfer new files
cd client && npm install && npm run build
cd ../server && npm install && npm run build
pm2 restart beer-game-server
```

---

## Important Notes

1. **No Database:** All game state is in-memory. Server restart clears active games.
2. **WebSocket Required:** Make sure Nginx proxy config includes WebSocket headers.
3. **CORS:** Update `server/src/server.ts` to allow your domain.
4. **Capacity:** Current setup handles ~50 concurrent games (200 users).

---

## Troubleshooting

**Can't connect:**
- Check `pm2 logs beer-game-server` for errors
- Verify port 3000 is listening: `sudo lsof -i :3000`
- Test WebSocket: `curl -i http://localhost:3000/socket.io/`

**Server won't start:**
- Check if port in use: `sudo lsof -i :3000`
- Verify build completed: `ls server/dist/server.js`
- Check logs: `pm2 logs beer-game-server --err`

**SSL issues:**
- Test cert: `sudo certbot certificates`
- Renew: `sudo certbot renew && sudo systemctl reload nginx`

---

## Contact
For detailed information, see [DEPLOYMENT.md](DEPLOYMENT.md)

**Application Owner:** Professor (asp2d), UVA Batten School
**Purpose:** Educational simulation for supply chain management courses
