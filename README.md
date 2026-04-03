# The Beer Game - Multiplayer Simulation

A web-based implementation of the classic Beer Distribution Game for teaching systems dynamics and the bullwhip effect in supply chain management. Features real-time multiplayer gameplay with Myst-inspired atmospheric graphics.

## What is the Beer Game?

The Beer Game is a supply chain simulation developed at MIT in the 1960s. Four players manage different roles (Retailer, Wholesaler, Distributor, Factory) and must order inventory to meet downstream demand. The game demonstrates how local optimization and information delays create system-wide chaos - a phenomenon known as the "bullwhip effect."

**Key Learning Outcomes:**
- Understanding systems thinking and emergent behavior
- Recognizing the bullwhip effect in supply chains
- Experiencing the impact of information delays and local decision-making
- Learning the value of communication and system-wide visibility

## Game Rules

- **Players:** 4 (Retailer, Wholesaler, Distributor, Factory)
- **Objective:** Minimize total costs over 36 weeks
- **Costs:**
  - Inventory holding: $0.50 per case per week
  - Backorder (shortage): $1.00 per case per week
- **Delays:**
  - Order delay: 2 weeks (orders take 2 weeks to reach supplier)
  - Shipping delay: 2 weeks (shipments take 2 weeks to arrive)
- **Demand:** Starts at 4 cases/week, jumps to 8 cases/week at week 5

## Installation

### Prerequisites

- Node.js v18+ (you have v24.14.0 ✓)
- npm (you have v11.9.0 ✓)

### Setup

1. **Clone or navigate to the project:**
   ```bash
   cd /Users/asp2d/beer-game
   ```

2. **Install all dependencies:**
   ```bash
   npm install --cache=/tmp/npm-cache
   cd client && npm install --cache=/tmp/npm-cache
   cd ../server && npm install --cache=/tmp/npm-cache
   cd ..
   ```

## Running the Game

### Option 1: Run Both Server and Client (Recommended)

From the project root:
```bash
npm run dev
```

This starts:
- Server on `http://localhost:3000`
- Client on `http://localhost:5173`

### Option 2: Run Separately

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

## Playing Locally (Same Computer)

1. Start the application with `npm run dev`
2. Open **4 browser windows** at `http://localhost:5173`
3. In **Window 1:** Create a room with your name
4. In **Windows 2-4:** Join the room that was created
5. When all 4 players are in, everyone clicks "Ready"
6. Host (Window 1) clicks "Start Game"
7. Play begins!

## Classroom Setup (Network Play)

### Instructor Setup

1. **Start the server:**
   ```bash
   cd /Users/asp2d/beer-game
   npm run dev
   ```

2. **Find your local IP address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

   Look for an address like `192.168.1.X` or `10.0.0.X`

3. **Share the URL with students:**
   ```
   http://[YOUR_IP]:5173
   ```

   Example: `http://192.168.1.100:5173`

4. **Make sure your firewall allows connections** on ports 3000 and 5173

### Student Instructions

1. Connect to the same Wi-Fi network as the instructor
2. Open the URL provided by the instructor in your browser
3. Enter your name and either:
   - Create a new room (if you're the first of your group)
   - Join an existing room
4. Wait for 4 players total, then all click "Ready"
5. The room host starts the game

### Running Multiple Games

- Each room supports exactly 4 players
- For a class of 20 students, you'll have 5 rooms running simultaneously
- Each game is independent and isolated

## Game Play

### Your Turn

Each turn (week):
1. **Review your status:**
   - Current inventory
   - Backorders (unfilled orders)
   - Incoming orders from downstream
   - Incoming shipments from upstream
   - This week's costs

2. **Place your order:**
   - Enter a quantity (number of cases)
   - Submit your order

3. **Wait for other players** to submit their orders

4. **Turn processes automatically** when all 4 players have submitted

5. **Review the results:**
   - Your updated inventory
   - New costs
   - Pipeline changes

### Understanding Your Role

**Retailer:**
- Receives customer demand directly
- Orders from Wholesaler
- Customer demand starts at 4 cases/week, jumps to 8 at week 5

**Wholesaler:**
- Receives orders from Retailer
- Orders from Distributor
- Cannot see actual customer demand

**Distributor:**
- Receives orders from Wholesaler
- Orders from Factory
- Even further removed from customer demand

**Factory:**
- Receives orders from Distributor
- "Orders" are production commands (beer brewing)
- Most removed from customer demand

### Tips for Success

- **Start conservatively:** Don't panic-order when you see backorders
- **Remember the 4-week delay:** Your orders won't arrive for 4 weeks
- **Avoid overreacting:** Small demand changes shouldn't trigger massive orders
- **Think system-wide:** Your actions ripple through the entire supply chain

## Technical Details

### Architecture

- **Frontend:** React 18 + TypeScript + Vite + Zustand + Tailwind CSS
- **Backend:** Node.js + Express + Socket.io + TypeScript
- **Real-time Communication:** WebSocket (Socket.io)
- **State Management:** Server-authoritative (all game logic on server)

### Project Structure

```
beer-game/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # React hooks (socket, etc.)
│   │   ├── store/        # Zustand state management
│   │   └── types/        # TypeScript types
│   └── public/assets/    # Visual assets
├── server/               # Node.js backend
│   ├── src/
│   │   ├── game/         # Game logic
│   │   ├── lobby/        # Room management
│   │   ├── socket/       # WebSocket handlers
│   │   └── types/        # TypeScript types
│   └── server.ts
└── package.json          # Root package with scripts
```

### Visual Design

The interface uses a Myst-inspired aesthetic with:
- Aged parchment textures
- Brass mechanical gauges
- Vintage typography (IM Fell English font)
- Sepia tones and oxidized metal colors
- Canvas-based animated gauges

## Troubleshooting

### "Cannot connect to server"

- Make sure the server is running (`npm run dev` from root)
- Check that port 3000 and 5173 are not in use by other applications
- Verify your firewall settings

### "Room not found" or "Room is full"

- Rooms support exactly 4 players
- If a room is full, create a new one
- Room IDs are case-sensitive

### Players can't connect over network

- Confirm all devices are on the same network
- Check firewall settings on instructor's computer
- Try disabling VPN if active
- On macOS, go to System Preferences > Security & Privacy > Firewall > Allow Node

### Game is lagging or not responding

- Check your network connection
- Ensure server console shows no errors
- Try refreshing the browser
- Check browser console (F12) for errors

## For Educators

### Discussion Points

After playing, facilitate discussion around:

1. **What happened?**
   - How did inventory levels change over time?
   - When did costs spiral out of control?
   - What was the peak inventory/backorder?

2. **Why did it happen?**
   - The 4-week delay created information lag
   - Each player only saw their local view
   - Rational local decisions led to system-wide problems

3. **Real-world applications:**
   - How does this apply to actual supply chains?
   - Where do we see the bullwhip effect in practice?
   - What solutions exist? (Information sharing, vendor-managed inventory, etc.)

4. **Leadership lessons:**
   - Systems thinking vs. local optimization
   - Importance of communication and transparency
   - Structural problems require structural solutions

### Customization

To modify game parameters, edit [server/src/types/game.types.ts](server/src/types/game.types.ts):

```typescript
export const DEFAULT_CONFIG: GameConfig = {
  startingInventory: 12,      // Initial inventory for each player
  pipelineInventory: 4,       // Cases in each pipeline slot
  initialDemand: 4,           // Starting customer demand
  demandJump: 8,              // Demand after the jump
  demandJumpWeek: 5,          // Week when demand changes
  holdingCost: 0.5,           // $ per case per week
  backorderCost: 1.0,         // $ per case per week
  orderDelay: 2,              // Weeks for order to reach supplier
  shippingDelay: 2,           // Weeks for shipment to arrive
  maxWeeks: 36                // Total game length
};
```

## License

This project is for educational use. The Beer Game was originally developed at MIT Sloan School of Management.

## Support

For issues or questions:
- Check the troubleshooting section above
- Review server console logs for errors
- Check browser console (F12 > Console tab) for client errors

---

**Built with TypeScript, React, Socket.io, and a vintage aesthetic. Enjoy the game and learn about systems thinking!** 🍺
