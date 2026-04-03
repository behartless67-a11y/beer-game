# Railway Deployment Guide - Beer Game

## Quick Deploy with Railway CLI

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

This will open your browser to authenticate.

### Step 3: Initialize Project

```bash
cd C:\Users\Ben\Desktop\beer-game
railway init
```

- Select "Create new project"
- Name it something like "beer-game"

### Step 4: Deploy!

```bash
railway up
```

This will:
- Upload your code
- Install dependencies
- Build client and server
- Start the application

### Step 5: Generate Public URL

```bash
railway domain
```

This creates a public URL like: `beer-game-production.up.railway.app`

### Step 6: Open Your App

```bash
railway open
```

---

## Alternative: Deploy via Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo" or "Empty Project"
4. If empty project:
   - Click "Deploy"
   - Upload the `beer-game` folder
5. Railway will auto-detect Node.js and deploy
6. Click "Generate Domain" to get a public URL

---

## Verify Deployment

Once deployed, check:

```bash
# Check health endpoint
curl https://your-app.up.railway.app/health

# Check rooms endpoint
curl https://your-app.up.railway.app/rooms
```

Expected response from `/health`:
```json
{"status":"ok","timestamp":"2026-04-03T..."}
```

---

## Environment Variables

Railway automatically sets:
- `PORT` - The port your app should listen on
- `NODE_ENV` - Set to "production" automatically

No additional configuration needed!

---

## Monitoring

```bash
# View logs
railway logs

# Check service status
railway status

# View variables
railway variables
```

---

## Updating the App

After making changes:

```bash
railway up
```

Or set up automatic deployments from GitHub:
1. Push code to GitHub
2. In Railway dashboard: Settings → Connect to GitHub
3. Every push will auto-deploy

---

## Troubleshooting

### Build fails
```bash
railway logs
```
Check for missing dependencies or build errors.

### App crashes on start
```bash
railway logs
```
Look for startup errors. Most common: missing dependencies.

### Can't connect to WebSocket
Make sure your Railway domain supports WebSocket (it does by default).

### Need to restart
```bash
railway restart
```

---

## Cost Estimate

- **Free Trial:** $5 credit per month
- **After trial:** ~$5-10/month for this app
- Scales automatically with usage

---

## Custom Domain (Optional)

```bash
railway domain add yourdomain.com
```

Then add CNAME record in your DNS:
- Name: `@` or `www`
- Value: `your-app.up.railway.app`

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
