# Screenshot Capture Guide for Presentation

## Overview
You need 5 key screenshots for your faculty brown bag presentation. This guide walks you through capturing each one.

---

## Preparation

### Before You Start
1. **Start the application:**
   ```bash
   cd /Users/asp2d/beer-game
   npm run dev
   ```
   Wait for both servers to start (should see "Beer Game Server Running" and Vite ready message)

2. **Open browsers:**
   - Chrome or Safari recommended
   - Make browser window large (at least 1400px wide)
   - Clear any toolbars or bookmarks bar for clean screenshots

3. **Screenshot location:**
   - All screenshots should be saved to: `/Users/asp2d/beer-game/presentation-assets/`
   - Use PNG format for best quality

---

## Screenshot 1: Lobby Entry Screen

### What This Shows
The initial screen where students create or join game rooms

### Steps to Capture
1. Open new browser window
2. Navigate to: `http://localhost:5173`
3. You should see the initial landing screen with:
   - Title/header
   - Name entry field
   - "Create Room" and "Join Room" options
4. Make sure window is maximized
5. Take screenshot of full browser window

### How to Capture (macOS)
```bash
# Take interactive screenshot (then select the browser window)
screencapture -i ~/beer-game/presentation-assets/screenshot-1-lobby.png
```

Or: `Cmd + Shift + 4`, then click and drag to select browser window

### What to Include
- Full browser window (including address bar is fine)
- Make sure UI is clearly visible
- No overlapping windows

**Filename:** `screenshot-1-lobby.png`

---

## Screenshot 2: Room Creation/Waiting

### What This Shows
Students seeing who has joined their game room

### Steps to Capture
1. In the browser from Screenshot 1, enter your name
2. Click "Create Room"
3. You should now see a room waiting screen with:
   - Room code displayed
   - Your name listed as a player
   - Empty slots for other 3 players
   - "Ready" button
4. Take screenshot

### How to Capture
```bash
screencapture -i ~/beer-game/presentation-assets/screenshot-2-waiting-room.png
```

**Filename:** `screenshot-2-waiting-room.png`

---

## Screenshot 3: Active Game Interface

### What This Shows
The main gameplay screen with vintage gauges and controls

### Steps to Capture (Need 4 Players)
1. **Open 3 more browser windows** (total of 4)
2. In each new window, go to `http://localhost:5173`
3. Enter different names and **join the same room code**
4. When all 4 players are in, click "Ready" on all windows
5. Host clicks "Start Game"
6. You should see the game interface with:
   - Role displayed (Retailer, Wholesaler, etc.)
   - Vintage brass gauges showing inventory/costs
   - Order input field
   - Current week number
   - Pipeline displays
7. **Focus on ONE window** (pick the one with best gauge display)
8. Take screenshot of that game screen

### How to Capture
```bash
screencapture -i ~/beer-game/presentation-assets/screenshot-3-gameplay.png
```

### Tips
- Choose whichever role has the clearest/most interesting visual
- Make sure gauges are visible and readable
- Capture the full game board area

**Filename:** `screenshot-3-gameplay.png`

---

## Screenshot 4: Game in Progress (Multiple Turns)

### What This Shows
The game after several turns, showing costs accumulating

### Steps to Capture
1. Continue playing from Screenshot 3
2. **Submit orders for 5-10 turns**
   - In each window, enter an order amount (try 4-8 cases)
   - Click submit
   - Wait for all 4 players to submit
   - Turn processes automatically
   - Repeat
3. After several turns, you'll see:
   - Costs accumulating
   - Inventory changes
   - Pipeline filling up
   - Different numbers on gauges
4. Take screenshot showing the evolved state

### How to Capture
```bash
screencapture -i ~/beer-game/presentation-assets/screenshot-4-in-progress.png
```

### What to Capture
- Same view as Screenshot 3, but later in game
- Shows that costs/inventory are changing
- Demonstrates the dynamic nature

**Filename:** `screenshot-4-in-progress.png`

---

## Screenshot 5: Claude Code Conversation

### What This Shows
The actual conversation/collaboration with Claude Code

### Steps to Capture
1. **Open your Claude Code interface** (VS Code extension or desktop app)
2. **Find a good conversation** that shows:
   - One of your prompts (describing what you wanted)
   - Claude's response with code
   - Ideally with file tree visible on side
3. **Make sure the exchange is readable:**
   - Font size large enough
   - Full prompt and response visible (or key parts)
   - Code formatting clear

### What Makes a Good Example
Look for a conversation showing:
- Your pedagogical description (not technical)
- Claude providing code solution
- Clear cause-and-effect

### Example Conversations to Look For
- Initial game logic request
- "Add Myst-inspired design" prompt
- Room management implementation
- Bug fix conversation

### How to Capture
```bash
screencapture -i ~/beer-game/presentation-assets/screenshot-5-claude-conversation.png
```

### Alternative If No History Available
If you don't have access to conversation history:
- Take screenshot of the Claude Code interface showing the file structure
- Or take screenshot of the running app with file tree visible in editor
- Caption will explain this is the development environment

**Filename:** `screenshot-5-claude-conversation.png`

---

## Quick Capture All Script

If you want to capture all at once, here's the sequence:

```bash
# Make sure app is running first!
cd /Users/asp2d/beer-game

# Screenshot 1: Initial lobby
# (Open browser, go to localhost:5173)
echo "1. Capture initial lobby screen..."
read -p "Press enter when browser is ready..."
screencapture -i ~/beer-game/presentation-assets/screenshot-1-lobby.png

# Screenshot 2: Waiting room
# (Create a room)
echo "2. Create a room, then capture waiting screen..."
read -p "Press enter when room is created..."
screencapture -i ~/beer-game/presentation-assets/screenshot-2-waiting-room.png

# Screenshot 3: Game started
# (Open 3 more browsers, join, start game)
echo "3. Start game with 4 players, then capture gameplay..."
read -p "Press enter when game is started..."
screencapture -i ~/beer-game/presentation-assets/screenshot-3-gameplay.png

# Screenshot 4: After several turns
# (Play 5-10 turns)
echo "4. Play several turns, then capture in-progress game..."
read -p "Press enter when ready..."
screencapture -i ~/beer-game/presentation-assets/screenshot-4-in-progress.png

# Screenshot 5: Claude conversation
# (Open Claude Code interface)
echo "5. Open Claude Code conversation, then capture..."
read -p "Press enter when ready..."
screencapture -i ~/beer-game/presentation-assets/screenshot-5-claude-conversation.png

echo "All screenshots captured!"
echo "Check: ~/beer-game/presentation-assets/"
```

---

## After Capturing

### Verify Screenshots
Check that each image:
- Is clear and readable
- Shows the right content
- Is properly sized (should be ~1400-2000px wide)
- Saved in the right location

### View Them
```bash
cd ~/beer-game/presentation-assets
open screenshot-*.png
```

### Image Dimensions Check
```bash
cd ~/beer-game/presentation-assets
file screenshot-*.png
```

Should show dimensions like: `1440 x 900` or similar

---

## Alternative: Using Built-in Screenshot Tool

### macOS Screenshots (Easier Method)

1. **Press:** `Cmd + Shift + 5`
2. **Select:** "Capture Selected Window" (fourth option)
3. **Click:** Options → Save to → Desktop (or choose folder)
4. **Hover over** browser window and click
5. **Move file** from Desktop to `/Users/asp2d/beer-game/presentation-assets/`
6. **Rename** to match filenames above

### Advantages
- Visual interface
- Can see what you're capturing
- Easy window selection
- No command line needed

---

## Troubleshooting

### App Won't Start
```bash
# Kill any existing processes
lsof -ti:3000,5173 | xargs kill -9 2>/dev/null

# Restart
npm run dev
```

### Can't See All Four Players
- Use different browser windows (not tabs)
- Or use different browsers (Chrome + Safari + Firefox)
- Each needs to join the same room code

### Screenshots Too Dark/Light
- Adjust your display brightness
- Use default browser theme (not dark mode)
- Can adjust in image editor afterward if needed

### Game Interface Not Showing
- Wait a few seconds after clicking "Start Game"
- Check browser console (F12) for errors
- Make sure all 4 players clicked "Ready"

---

## Final Checklist

Before presentation:
- [ ] All 5 screenshots captured
- [ ] Screenshots are clear and readable
- [ ] Files named correctly
- [ ] Saved in `/Users/asp2d/beer-game/presentation-assets/`
- [ ] Tested opening them (to verify they're not corrupted)
- [ ] Made copies as backup

---

## Next Steps

Once you have screenshots:
1. Open Google Slides
2. Follow instructions in `PRESENTATION-SLIDES.md`
3. Insert screenshots into appropriate slides
4. Adjust sizing/layout as needed

**Ready to present!**
