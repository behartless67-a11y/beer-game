# Actual User Prompts from Beer Game Development
## Real Journey from March 2-29, 2026

This document contains the ACTUAL prompts used during the Beer Game development process, extracted from conversation history files.

---

## PHASE 1: Discovery & Initial Request
**Date: March 2, 2026 (evening)**

### Prompt 1: Initial Learning
**Time: 9:39 PM**
```
tell me what you know about the beer game as a way to understand systems dynamics in leadership classes.
```
**Context:** User started by learning about the game before building anything.

### Prompt 2: Understanding Rules
**Time: 9:39 PM**
```
tell me the rules of the game for each of the players
```
**Context:** Wanted to understand mechanics before requesting development.

### Prompt 3: Understanding Systems Dynamics
**Time: 9:40 PM**
```
what happens in the gameplay that disrupts the system?
```
**Context:** Focused on the learning outcomes and pedagogical value.

### Prompt 4: The Build Request
**Time: 9:43 PM**
```
alright, I'd like you to build me a version of the game that students can play against each other. Give it some nice Myst style graphics and user interfaces.
```
**Context:** First build request. Note the aesthetic direction (Myst-inspired) and multiplayer focus. This single prompt initiated the entire project.

**What happened after:** Claude entered plan mode, explored approaches, and built the entire game (React + TypeScript frontend, Node.js + Socket.io backend, full multiplayer system) overnight.

---

## PHASE 2: Bug Fixes & Testing
**Date: March 3, 2026 (early morning)**

### Prompt 5: First Bug Report
**Time: 2:53 AM**
```
it appears that the initial screen only allows players to create a new room and not to join a room. Can you check that and then fix it?
```
**Context:** Testing revealed UI issue with room joining.

### Prompt 6: Persistent Issue
**Time: 2:55 AM**
```
nope, I still have to create a room to see the room.
```
**Context:** Bug wasn't fully fixed, providing feedback.

---

## PHASE 3: Handling Disconnections
**Date: March 3, 2026 (evening)**

### Prompt 7: Critical Bug
**Time: 6:38 PM**
```
Ok, we've hit a bug. When someone disconnects, there's no way to boot them from the room so another person can join.
```
**Context:** Real-world testing revealed game management issue.

### Prompt 8: Context Window Management
**Time: 6:42 PM**
```
looks like we're about at the limit of the context window. Please create a log of what we've done so that I can paste it into the editing session. Leave enough context about what we are trying to accomplish and the decisions you have made so that we can make progress.
```
**Context:** Learning about AI limitations and how to work around them.

### Prompt 9: Session Management
**Time: 6:43 PM**
```
ok, how do we start over with a new context window? Can you make that happen?
```
**Context:** First experience with needing to continue work across sessions.

---

## PHASE 4: Continuation in New Session
**Date: March 3, 2026 (evening continued)**

### Prompt 10: Resuming Work
**Time: 6:48 PM**
```
can you help me work on the Beer-Game in that folder?
```
**Context:** Started new session, pointing Claude to existing project.

### Prompt 11: Specific Bug
**Time: 6:50 PM**
```
2. When I click on the box below "Click on a room to join" I don't actually join it.
```
**Context:** Direct, numbered bug report. Simple and clear.

### Prompt 12: Join Room Issue
**Time: 7:03 PM**
```
when you initally open the server, your only choice is to create a new room. Make it so you can also see open rooms to join.
```
**Context:** Feature request to improve lobby functionality.

### Prompt 13: Error Message
**Time: 7:05 PM**
```
Ok, now when I create a room and then try to join it, it says "Failed to join room: Already in another room" even though I haven't joined another one. What's happening?
```
**Context:** Debugging with error message details. Asking Claude to explain the issue.

### Prompt 14: Feature Addition
**Time: 7:09 PM**
```
working well now. Now it's time to give each role it's own orientation screen describing the broad set up (without giving away the punchline) before they make their initial order. Make sure that they have a few lines of context with every new order.
```
**Context:** Moving from bugs to pedagogical enhancements. Note the instructional design thinking about "not giving away the punchline."

---

## PHASE 5: Later Sessions (March 11)

### Prompt 15: Quick Restart
**Time: March 11, 6:37 PM**
```
can you relaunch the game and let me login?
```
**Context:** Short, direct command to start the server. Shows comfort with the tool.

---

## PHASE 6: Deployment & Documentation (March 27-29)

### Prompt 16: Finding the Project
**Time: March 27, 7:38 PM**
```
find the beer game you built for me.
```
**Context:** Returning after weeks, asking Claude to locate the project.

### Prompt 17: Deployment Prep
**Time: March 27, 7:42 PM**
```
can you create a handoff document about this project for me so that my IT guy can put it on a server
```
**Context:** Thinking about production deployment and collaboration with IT staff.

### Prompt 18: Presentation Preparation
**Time: March 29, 4:59 PM**
```
I now need to create a short slide deck of three or four slides max five that explain the process we've gone through to build this and what would be required for other faculty to do it. For context, I am presenting at a faculty brown bag on Friday for a show-and-tell about how people are using AI in the classroom. This will be for people who have never used AI as well as those who are very involved in Claude Code. Build me slides including screenshots that would allow me to show the process by which I built the game and in doing so you should read our files and conversations from previous chats. Then also briefly show the game itself. Ask me a question do you have before you start to execute?
```
**Context:** Comprehensive presentation request with audience analysis and specific requirements.

### Prompt 19: Clarification
**Time: March 29, 5:01 PM**
```
format preference: Google Slides.
Main emphasis:
- My journey and faculty
- Screenshots: you build them
- Technical depth
- Stay high level and provide something about the prompts
This could even be in a separate document. - Take away for faculty: The first two
```
**Context:** Providing structured feedback with bullet points.

### Prompt 20: Demanding Authenticity
**Time: March 29, 5:11 PM**
```
Have you actually gone through and looked at my previous chats? Are you just making this up on the key prompts guide? I really want to show my own journey here.
```
**Context:** Pushing back on generic content, insisting on real examples. This led to the current task of extracting actual conversation history.

---

## KEY PATTERNS IN USER'S APPROACH

### 1. Learn First, Build Second
- Started with questions about the concept
- Understood rules and dynamics before requesting code
- Asked "what happens" before "how to build it"

### 2. Clear, Conversational Language
- No technical jargon in initial requests
- "Give it some nice Myst style graphics" - aesthetic direction without technical specs
- "working well now" - natural acknowledgment before next request

### 3. Iterative Bug Reporting
- Tested immediately after each change
- Reported specific behaviors: "When I click...", "it says..."
- Included error messages when available
- Simple numbered lists for multiple issues

### 4. Pedagogical Thinking Throughout
- "without giving away the punchline" - instructional design considerations
- "for students to play against each other" - clear on the use case
- Orientation screens for each role - thinking about player experience

### 5. Context Management Awareness
- Recognized when approaching context limits
- Asked for transition strategies
- Comfortable starting new sessions and pointing to existing work

### 6. Progressive Complexity
- Start simple: "can you build me a version"
- Then refine: lobby issues, disconnections, orientation screens
- Finally: deployment, documentation, teaching others

### 7. Practical Timeline
- Initial build: Single evening session
- Testing and bugs: Next day
- Refinement: Over several days
- Production ready: ~1 week
- Sharing knowledge: 3-4 weeks later

### 8. Authenticity Over Polish
- "I really want to show my own journey" - values real over idealized
- Willing to show the bugs and mistakes
- Interested in the actual process, not a sanitized version

---

## TECHNICAL NOTES

**What was built from that single Prompt 4:**
- Full-stack TypeScript application
- React 18 frontend with Vite
- Node.js + Express backend
- Socket.io real-time multiplayer
- Zustand state management
- Tailwind CSS styling
- Complete game logic (supply chain simulation)
- Myst-inspired visual design
- Multi-room lobby system
- 4-player simultaneous gameplay
- 36-week simulation with automatic turn processing

**Development Time:**
- Initial build: Overnight (one long session)
- Bug fixes and refinements: 2-3 additional sessions
- Total active development time: ~6-8 hours of user interaction

**Lines of Code Generated:** ~2,500+ lines across multiple TypeScript/TSX files

---

## FILE SOURCES

These prompts were extracted from:
- `/Users/asp2d/.claude/projects/-Users-asp2d/5a053094-89ad-469c-abd7-f4d1c26474d7.jsonl` (Initial build, March 2-3)
- `/Users/asp2d/.claude/projects/-Users-asp2d-beer-game/1987b6e1-ec97-4a63-861f-0c228b1422f4.jsonl` (Continuation, March 3-11)
- `/Users/asp2d/.claude/projects/-Users-asp2d-beer-game/8a04f188-a745-47c8-95eb-b36bab77500c.jsonl` (Recent work, March 27-29)

All timestamps are in UTC (Eastern Time would be UTC-5 or UTC-4 depending on DST).

---

**Document created:** March 29, 2026
**Purpose:** Faculty presentation on AI-assisted development
**Key message:** Complex software can be built through clear, natural conversation with AI
