# Faculty Brown Bag Presentation: Building Teaching Tools with Claude Code

## Presentation Overview
**Title:** Building a Teaching Tool with Claude Code: A Non-Coder's Journey
**Duration:** 10-15 minutes
**Audience:** Faculty with varying AI experience levels
**Format:** 4-5 slides + demo

---

## SLIDE 1: Title Slide

### Visual Layout
- **Title:** Building a Teaching Tool with Claude Code
- **Subtitle:** A Non-Coder's Journey from Idea to Deployment
- **Your Name & Affiliation**
- **Date:** March 29, 2024

### Background Image Suggestion
- Simple, clean background
- Optional: Screenshot of the Beer Game interface (faded/watermarked)

### Speaker Notes
"I want to share how I built a full-fledged teaching simulation for my courses, despite having minimal coding experience. This is about what's possible when you combine pedagogical goals with AI collaboration."

---

## SLIDE 2: The Challenge

### Title: "The Problem I Needed to Solve"

### Content (Left Side - Text)

**The Pedagogical Goal:**
- Teach systems thinking and the "bullwhip effect" in supply chains
- Students need to *experience* emergent behavior, not just read about it
- Classic MIT Beer Game requires physical setup and manual tracking

**Traditional Options:**
- Commercial software: Expensive, inflexible, limited customization
- Paper version: Time-consuming, error-prone, hard to run with remote students
- Existing online versions: Don't fit my pedagogical approach

**What I Wanted:**
- Web-based multiplayer game (4 players per room)
- Real-time gameplay with automated calculations
- Multiple simultaneous games for entire class
- Custom branding and atmosphere

### Visual (Right Side)
**[SCREENSHOT NEEDED: Traditional Beer Game Setup]**
- Photo of physical beer game with cards/tokens OR
- Diagram showing supply chain with Retailer → Wholesaler → Distributor → Factory

### Speaker Notes
"I've been teaching this for years with paper and calculators. It works, but it's clunky. Students spend more time on arithmetic than strategic thinking. I knew there had to be a better way, but I'm not a software developer."

---

## SLIDE 3: The Process - My Journey with Claude Code

### Title: "From Idea to Application: The Conversation"

### Content Layout: Three Columns

#### Column 1: "Starting Point"
**My Experience Level:**
- Professor, not programmer
- Basic understanding of web applications
- Comfortable with concepts, not code

**My First Prompt:**
- "I need to build a web-based version of the Beer Game"
- Explained the rules and pedagogical goals
- Asked for guidance on approach

#### Column 2: "The Build Process"
**Iterative Conversation (~3 weeks):**

1. **Architecture Discussion**
   - Claude explained: Frontend, Backend, WebSockets
   - We chose: React + Node.js + Socket.io

2. **Feature Development**
   - Room creation and player joining
   - Real-time turn processing
   - Cost calculations and game logic

3. **Design Iteration**
   - Started simple
   - I asked for "Myst-inspired atmosphere"
   - Claude built custom gauges and vintage UI

4. **Testing & Refinement**
   - Fixed bugs through conversation
   - Adjusted game balance
   - Added deployment documentation

**Total Prompts:** ~50-75 exchanges
**Total Time:** ~15-20 hours across 3 weeks
**Lines of Code Generated:** ~3,000+

#### Column 3: "The Collaboration"
**What Claude Did:**
- Wrote all the code
- Explained concepts as we went
- Suggested better approaches
- Created deployment guides
- Fixed bugs I encountered

**What I Did:**
- Described what I needed pedagogically
- Tested and gave feedback
- Asked clarifying questions
- Made design decisions
- Learned concepts along the way

### Visual Elements
**[SCREENSHOT NEEDED: Claude Code Interface]**
- Show the chat interface with a conversation about the project
- Highlight a prompt and Claude's code response
- Capture the file tree showing project structure

**Optional Callout Box:**
"I never wrote a single line of code. I described what I needed, tested it, and gave feedback."

### Speaker Notes
"The key insight: This wasn't about me learning to code. It was a conversation about pedagogy that happened to result in software. I spoke in terms of teaching goals, Claude translated to technology."

---

## SLIDE 4: The Result - The Beer Game

### Title: "What We Built: A Complete Teaching Simulation"

### Content Layout: Split Screen

#### Left Side: Features Built
**Student Experience:**
- Join game room with simple code
- Choose role (Retailer/Wholesaler/Distributor/Factory)
- Submit weekly orders via web interface
- See real-time inventory and costs
- Experience the bullwhip effect emerging

**Faculty Experience:**
- Run multiple simultaneous games
- Students connect from any device
- Automatic calculation and tracking
- Custom Myst-inspired atmosphere
- Debrief with results

**Technical Achievement:**
- Full-stack web application
- WebSocket real-time communication
- Multiplayer room management
- Responsive design
- Deployment-ready with documentation

#### Right Side: Screenshots (3-4 images)

**[SCREENSHOT 1: Lobby/Room Selection]**
- Shows the entrance screen where players create/join rooms
- Caption: "Students join game rooms with simple codes"

**[SCREENSHOT 2: Game Interface - Player View]**
- Shows the main game interface with vintage gauges
- Shows inventory, costs, order interface
- Caption: "Real-time gameplay with automated calculations"

**[SCREENSHOT 3: Game Board View]**
- Shows all four roles in action or the supply chain visualization
- Caption: "Myst-inspired design makes dry supply chain concepts engaging"

**[SCREENSHOT 4: Results/Summary]**
- Shows end-game results or cost tracking
- Caption: "Students see the bullwhip effect emerge from their decisions"

### Speaker Notes
"This is a professional-grade application. It handles multiple classes, works on any device, and the vintage aesthetic actually helps students engage with what could be dry supply chain math. Most importantly, it does exactly what I need pedagogically."

---

## SLIDE 5: What This Makes Possible

### Title: "What You Can Build (Even Without Coding Skills)"

### Content: Two-Column Layout

#### Left Column: "Examples for Your Teaching"

**Interactive Simulations:**
- Economic models and game theory exercises
- Political scenario simulations
- Budget allocation exercises
- Negotiation simulations
- Data analysis tools

**Custom Course Tools:**
- Rubric-based grading assistants
- Research literature organizers
- Student discussion facilitators
- Case study analysis frameworks
- Portfolio assessment tools

**Content Creation:**
- Interactive problem sets
- Adaptive quizzes
- Visualization tools
- Data dashboards
- Student collaboration platforms

#### Right Column: "Key Insights"

**What Makes This Different:**
✓ You don't need to learn programming
✓ Describe your pedagogical goals clearly
✓ Iterate through conversation
✓ Test and refine based on how it works
✓ Focus on teaching, not technology

**What You Do Need:**
- Clear sense of the problem you're solving
- Willingness to describe what you want
- Patience to test and iterate
- Basic comfort with trying new tools
- ~10-20 hours for a substantial project

**The Real Barrier Isn't Technical:**
- It's imagining what's possible
- It's being willing to experiment
- It's investing the time to iterate

### Visual Element
**[DIAGRAM/GRAPHIC]**
Simple workflow diagram:
```
Your Teaching Challenge
    ↓
Conversation with Claude
    ↓
Working Application
    ↓
Better Student Learning
```

### Bottom Callout Box (Emphasized)
**"The question isn't 'Can I code this?'**
**The question is 'What do my students need?'"**

### Speaker Notes
"The revolution here isn't that AI can write code. It's that the barrier between pedagogical imagination and working tools has collapsed. If you can describe what your students need, you can build it. The limitation is no longer technical skill, it's pedagogical creativity and time investment."

---

## TRANSITION TO LIVE DEMO (Optional Slide 6)

### Title: "Let's See It in Action"

### Content
"I'll now do a quick walkthrough..."

### Demo Script (2-3 minutes)
1. Show lobby - "This is what students see first"
2. Create a room - "Teacher or first student creates room"
3. Join from multiple browsers - "Other students join with code"
4. Start game - "When 4 players ready, game begins"
5. Show one turn - "Each player orders, system processes automatically"
6. Show results updating - "Real-time cost tracking"

### Backup Plan
If live demo doesn't work, have screenshot walkthrough ready

---

## CLOSING SLIDE: Questions & Resources

### Title: "Questions?"

### Content

**Resources:**
- Claude Code: claude.ai/code
- This project: [github link if you create one]
- Contact: [your email]

**Available to Share:**
- The game itself (for your classes)
- Deployment documentation
- Examples of my prompts
- Lessons learned

### Discussion Starters
- "What would you build for your courses?"
- "What's the one teaching problem you wish had a tool?"
- "What questions do you have about the process?"

---

## PRESENTATION TIPS

### Timing Breakdown (15 minutes)
- Slide 1 (Title): 30 seconds
- Slide 2 (Challenge): 2 minutes
- Slide 3 (Process): 5 minutes ⭐ (This is the heart)
- Slide 4 (Result): 3 minutes
- Slide 5 (Possibilities): 3 minutes
- Demo/Q&A: Remaining time

### Key Messages to Emphasize
1. **You don't need coding skills** - This is about conversation, not programming
2. **Start with pedagogy** - Technology follows teaching goals
3. **Iteration is normal** - This took several weeks of back-and-forth
4. **It's accessible now** - The tools exist and work today

### Anticipate Questions

**"How much does it cost?"**
- Claude Code is free for basic use, ~$20/month for Pro

**"How long did this really take?"**
- ~15-20 hours spread over 3 weeks, mostly testing and iterating

**"Do I need to understand the code?"**
- No. I can't write this code myself. I can describe what I want.

**"What if something breaks?"**
- Claude helps debug through conversation, same as building

**"Could I hire a developer instead?"**
- Sure, for ~$5,000-10,000 and 2-3 months. This was $20 and 3 weeks.

**"What are the limitations?"**
- Complex video/graphics, large-scale data processing, but most teaching tools are well within scope

---

## SCREENSHOT CAPTURE INSTRUCTIONS

### Screenshot 1: Lobby/Room Entry
**To Capture:**
1. Open http://localhost:5173 in browser
2. Maximize window, clear browser
3. Show the initial screen where students enter name and create/join room
4. Capture full browser window
5. Save as: `screenshot-1-lobby.png`

### Screenshot 2: Game Interface
**To Capture:**
1. Start a game with 4 players
2. Get to an active game turn
3. Show one player's view with gauges, inventory, order interface
4. Make sure vintage/Myst aesthetic is visible
5. Save as: `screenshot-2-gameplay.png`

### Screenshot 3: Supply Chain View
**To Capture:**
1. During active gameplay
2. Show the full supply chain if visible, or multiple player perspectives
3. Emphasize the interconnected nature
4. Save as: `screenshot-3-supply-chain.png`

### Screenshot 4: Results/Costs
**To Capture:**
1. Show the cost tracking or end-game results
2. Demonstrate the data visualization
3. Save as: `screenshot-4-results.png`

### Screenshot 5: Claude Code Conversation
**To Capture:**
1. Open Claude Code chat history
2. Find a good exchange showing: your prompt + Claude's code response
3. Show file tree on side if possible
4. Make sure text is readable
5. Save as: `screenshot-5-claude-conversation.png`

---

## ADDITIONAL VISUAL ASSETS NEEDED

### For Slide 2 (The Challenge)
- Photo or diagram of traditional Beer Game setup
- Source: Search for "beer game supply chain" or use simple diagram

### For Slide 5 (Possibilities)
- Simple workflow diagram (can create in Google Slides with shapes/arrows)
- Or find icon set for: idea → conversation → tool → learning

---

## GOOGLE SLIDES IMPORT INSTRUCTIONS

1. **Create new Google Slides presentation**
   - Go to slides.google.com
   - Choose blank presentation
   - Set theme to simple/professional (recommend: "Simple Light" or "Swiss")

2. **For each slide:**
   - Use the markdown content above as your guide
   - Copy text into appropriate text boxes
   - Insert screenshots from your presentation-assets folder
   - Adjust layouts to match the described structure

3. **Recommended Layouts:**
   - Slide 1: Title slide
   - Slide 2: Title and two columns
   - Slide 3: Title and three columns (or two if three is cramped)
   - Slide 4: Title and two columns
   - Slide 5: Title and two columns

4. **Design Tips:**
   - Keep it clean and readable
   - Use consistent fonts (suggest: Roboto or Open Sans)
   - Limit colors: 2-3 colors max plus black/white
   - Make sure code screenshots are large enough to read
   - Test readability from back of room

---

**End of Slide Content**
