# Key Prompts & Conversation Guide
## Building the Beer Game with Claude Code

This document provides example prompts and conversation patterns from the Beer Game development process. Use these to show faculty how to effectively collaborate with Claude Code.

---

## Phase 1: Initial Concept & Architecture (Week 1)

### Example Opening Prompt

```
I need to build a web-based version of the MIT Beer Game for my supply chain
management course. The Beer Game is a simulation where 4 players (Retailer,
Wholesaler, Distributor, Factory) manage inventory and orders in a supply chain.

Key requirements:
- 4 players per game
- Each player submits orders each turn
- 2-week delays for orders and shipments
- Track inventory and backorder costs
- Customer demand starts at 4, jumps to 8 at week 5
- Game runs for 36 weeks
- Need to run multiple simultaneous games for a class of 20+ students

What's the best way to build this? I'm comfortable with concepts but not a
developer.
```

**What This Shows:**
- Clear pedagogical goal stated upfront
- Specific game mechanics explained
- Practical classroom requirements included
- Honest about skill level
- Asking for guidance, not just code

### Claude's Response Pattern
Claude responded with:
1. Technology recommendations (React + Node.js + WebSockets)
2. Architecture explanation (frontend, backend, real-time communication)
3. Feasibility assessment (very doable)
4. Next steps (set up project structure)

**Key Insight:** Describe the *teaching problem*, not technical implementation.

---

## Phase 2: Feature Development (Week 1-2)

### Prompt: Building Core Gameplay

```
Let's start with the game logic. Each turn:
1. Players see their current inventory and incoming shipments
2. Each player places an order (number of cases)
3. When all 4 players submit, the turn processes automatically
4. Orders move up the supply chain (with 2-week delay)
5. Shipments move down the supply chain (with 2-week delay)
6. Costs calculate: $0.50/case inventory, $1.00/case backorder

Can you help me implement the turn processing logic?
```

**What This Shows:**
- Breaking complex system into steps
- Being specific about business rules
- Focusing on one feature at a time
- Providing exact numbers and rules

### Prompt: Adding Multiplayer Rooms

```
Right now it's a single game. I need multiple rooms so different groups
of students can play simultaneously.

How it should work:
- A student creates a room with a simple code (like "BLUE7" or "TEAM-A")
- Other students join that room by entering the code
- Each room supports exactly 4 players
- Rooms are independent - one room doesn't affect another
- When 4 players are in and ready, the host starts the game

What's the best way to implement room management?
```

**What This Shows:**
- Building on existing work
- Clear user flow described
- Constraints stated (exactly 4 players)
- Real classroom scenario explained

---

## Phase 3: Design & Polish (Week 2)

### Prompt: Visual Design Request

```
The game works great, but it looks pretty basic. I'd like to give it a
distinctive atmosphere - something inspired by the vintage aesthetic of
the game Myst. Aged parchment, brass gauges, vintage typography.

Can you redesign the interface with this theme while keeping all the
functionality intact?
```

**What This Shows:**
- Asking for design after function works
- Reference point (Myst) gives clear direction
- Constraint: keep functionality intact
- Quality matters for student engagement

### Claude's Response
Claude created:
- Custom canvas-based animated gauges
- Vintage color palette (sepia, brass, oxidized metal)
- Period-appropriate font (IM Fell English)
- Textured backgrounds
- Maintained all game logic

**Key Insight:** You can request professional design quality through description.

---

## Phase 4: Testing & Debugging (Week 2-3)

### Prompt: Bug Report

```
I'm testing with 4 browser windows and running into an issue. When the
third player joins, they see the room but the "Ready" button is grayed out
and they can't click it. The first two players don't have this problem.

Here's what I see in the browser console: [paste error message]

Can you help me figure out what's wrong?
```

**What This Shows:**
- Specific reproduction steps
- Exact symptom described
- Browser console info included
- Clear request for help

### Prompt: Game Balance Adjustment

```
After playtesting with colleagues, we found that starting inventory of 8
is too low - players immediately fall into backorders before they can react.

Can you change the starting inventory to 12 cases and also increase the
initial pipeline inventory from 2 to 4? This should give players a better
cushion to start.
```

**What This Shows:**
- Evidence-based request (we playtested)
- Specific numerical changes requested
- Explanation of why (pedagogical reasoning)
- Multiple related changes in one request

---

## Phase 5: Deployment Preparation (Week 3)

### Prompt: Deployment Documentation

```
This is working great locally. Now I need to get it onto a server so
students can access it from anywhere. I have IT support who can help,
but they'll need clear documentation.

Can you create a deployment guide that explains:
- What technology stack we're using
- How to install it on a Linux server
- Network requirements (ports, firewall)
- How to set up SSL/HTTPS
- How to monitor and maintain it
- Troubleshooting common issues

Write this for an IT professional who hasn't seen the codebase.
```

**What This Shows:**
- Thinking ahead to real-world use
- Identifying your audience (IT staff, not you)
- Comprehensive requirements list
- Acknowledging knowledge gap (IT professional will understand things you don't)

---

## Effective Prompt Patterns

### Pattern 1: "Describe User Experience"
Instead of: "Add authentication"
Try: "When students first arrive, they should enter their name. Then they can either create a new room or join an existing room by entering a room code. The room code should be easy to share - maybe 5-6 characters."

### Pattern 2: "Reference Examples"
Instead of: "Make it look better"
Try: "I'd like an aesthetic inspired by [Myst/steampunk/1920s newspaper/etc]. Think aged parchment, brass fixtures, vintage typography."

### Pattern 3: "Explain the Why"
Instead of: "Change the starting value to 12"
Try: "After playtesting, we found students immediately fall into backorders with starting inventory of 8. Can you increase it to 12 to give them more reaction time?"

### Pattern 4: "Break Down Complexity"
Instead of: "Build a multiplayer game with rooms and real-time updates and..."
Try: "Let's start with single-player game logic first. Once that works, we'll add multiplayer rooms. Then we'll add the lobby system."

### Pattern 5: "Specify Constraints"
Instead of: "Support multiple players"
Try: "Each room needs exactly 4 players - no more, no less. If someone tries to join a full room, show them an error message."

---

## What NOT to Do: Anti-Patterns

### ❌ Too Vague
"Make a game for my class"
- **Problem:** No specifics about what game, what features, what constraints

### ❌ Too Technical (Unnecessary)
"Use React hooks with useState and useEffect to manage the WebSocket connection and implement a reducer pattern for game state"
- **Problem:** You don't need to specify implementation details unless you have strong technical preferences

### ❌ Everything at Once
"Build a multiplayer game with 4 roles, room management, real-time updates, vintage graphics, mobile support, analytics dashboard, admin panel, and user accounts"
- **Problem:** Too much in one request. Build incrementally.

### ❌ No Context
"Add a button"
- **Problem:** Button for what? Who sees it? What should it do? When should it appear?

---

## Iterative Refinement Example

### First Request
"Can you add inventory tracking?"

### Better Request
"Each player needs to see their current inventory count. Show this prominently on their screen, updated after each turn."

### Even Better Request
"Each player needs to see:
- Current inventory (how many cases they have)
- Incoming shipments (what's arriving in next 2 turns)
- Backorders (unfilled demand from previous turns)
Display these as vintage brass gauges to match the Myst theme, with numbers that update smoothly after each turn."

**What Improved:**
1. First → Better: Added specificity about what to show and when
2. Better → Even Better: Added context of related information, visual design direction, and user experience details

---

## Questions I Asked Along the Way

These show good learning/clarification prompts:

### Understanding the Technology
```
"You mentioned WebSockets - can you explain what those are and why we need
them instead of regular web requests?"
```

### Making Decisions
```
"What are the tradeoffs between storing game state in a database versus
keeping it in memory? For a classroom simulation that runs for 1-2 hours,
which makes more sense?"
```

### Learning from Code
```
"I see you created a 'LobbyManager' class. Can you explain what this does
and why you organized it this way? I want to understand the structure."
```

### Exploring Options
```
"Is there a way to add optional features that instructors can toggle on/off?
For example, some might want to show the full supply chain visibility,
while others want information delays."
```

---

## The Conversation Flow

A typical development session looked like:

1. **I describe what I want** (pedagogical goal or user experience)
2. **Claude proposes approach** (explains technology choice)
3. **Claude writes code** (implements the feature)
4. **I test it** (try it in browser)
5. **I report results** (works great / found a bug / want to adjust)
6. **Claude refines** (fixes bugs or makes changes)
7. **Repeat** until feature is right

**Key Point:** This is iterative. Features rarely perfect on first try, and that's normal.

---

## Time Investment Reality

### What 15-20 hours looked like:

**Week 1 (8 hours):**
- 2 hours: Initial architecture discussion and setup
- 3 hours: Core game logic implementation and testing
- 3 hours: Multiplayer room system and debugging

**Week 2 (7 hours):**
- 2 hours: UI/UX improvements and vintage design
- 3 hours: Testing with multiple browsers and fixing edge cases
- 2 hours: Game balance adjustments based on playtesting

**Week 3 (5 hours):**
- 2 hours: Deployment documentation and configuration
- 2 hours: Final testing and polish
- 1 hour: Creating handoff materials for IT

**Actual Coding by Me:** 0 hours
**Actual Testing/Feedback by Me:** ~12 hours
**Actual Planning/Thinking by Me:** ~8 hours

---

## Takeaway for Faculty

### The New Skill Isn't Coding
The skill is:
1. **Clearly articulating** what you need pedagogically
2. **Describing user experiences** in concrete terms
3. **Testing and providing feedback** on what you get
4. **Iterating based on results** (not getting it perfect first time)
5. **Breaking complex problems** into manageable pieces

### This is Actually Familiar
If you've ever worked with:
- An instructional designer on a course
- A graphic designer on a visual
- A videographer on educational content
- A research assistant on data analysis

...you already know this workflow. It's collaborative creation through clear communication.

The difference: Claude can implement immediately, and you can test/refine in real-time.

---

## Your Prompts Will Be Different

These are examples from the Beer Game. Your prompts will reflect:
- Your discipline and domain
- Your teaching style
- Your students' needs
- Your specific pedagogy

**The pattern is transferable, not the specific prompts.**

---

## Questions to Ask Yourself Before Starting

1. **What's the teaching problem?** (Not the technical solution)
2. **Who are the users?** (Students? Faculty? Both?)
3. **What's the core experience?** (What should happen?)
4. **What are the constraints?** (Time? Devices? Network?)
5. **How will I know it works?** (What does success look like?)

Answer these clearly, and you're ready to start.

---

## Resources for Going Deeper

**If you want to learn more:**
- Claude Code documentation: claude.ai/code
- This project's README: See technical architecture explained
- Deployment docs: See what IT needs to know

**But remember:** You don't need to become a developer. You need to become a good collaborator with AI.

---

**Document Purpose:** Share with faculty who want to see actual prompts and conversation patterns from a real project. This demystifies the process and shows it's about clear communication, not coding skills.

**Last Updated:** March 29, 2024
