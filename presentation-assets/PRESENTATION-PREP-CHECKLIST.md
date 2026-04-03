# Brown Bag Presentation - Preparation Checklist

## Overview
This checklist helps you prepare for your faculty brown bag on Friday about building teaching tools with Claude Code.

**Presentation Date:** Friday, March 29, 2024
**Audience:** Faculty (mixed AI experience levels)
**Duration:** 10-15 minutes + Q&A
**Goal:** Show journey and inspire faculty to build their own teaching tools

---

## 📁 Phase 1: Content Preparation (1-2 hours)

### Documents Review
- [ ] Read through `PRESENTATION-SLIDES.md` (full slide content)
- [ ] Review `KEY-PROMPTS-GUIDE.md` (example prompts to reference)
- [ ] Familiarize yourself with `SCREENSHOT-GUIDE.md`

### Decide on Approach
- [ ] **Option A:** Create Google Slides from the markdown content
- [ ] **Option B:** Present from markdown/notes with live demo focus
- [ ] **Option C:** Combination of slides + extended demo

**Recommendation:** Option A (Google Slides) for most professional presentation

---

## 📸 Phase 2: Screenshot Capture (30 minutes)

### Setup
- [ ] Start the beer game server: `npm run dev` in `/Users/asp2d/beer-game`
- [ ] Verify both servers running (ports 3000 and 5173)
- [ ] Open browser, test that `http://localhost:5173` loads

### Capture 5 Key Screenshots
Use the `SCREENSHOT-GUIDE.md` for detailed instructions

- [ ] **Screenshot 1:** Lobby entry screen (`screenshot-1-lobby.png`)
- [ ] **Screenshot 2:** Room waiting area (`screenshot-2-waiting-room.png`)
- [ ] **Screenshot 3:** Active gameplay interface (`screenshot-3-gameplay.png`)
- [ ] **Screenshot 4:** Game in progress after several turns (`screenshot-4-in-progress.png`)
- [ ] **Screenshot 5:** Claude Code conversation (`screenshot-5-claude-conversation.png`)

### Verify Screenshots
- [ ] All 5 files exist in `/Users/asp2d/beer-game/presentation-assets/`
- [ ] Images are clear and readable
- [ ] Proper dimensions (~1400px+ wide)
- [ ] No sensitive information visible

---

## 🎨 Phase 3: Build Google Slides (45-60 minutes)

### Setup Presentation
- [ ] Go to [slides.google.com](https://slides.google.com)
- [ ] Create new presentation
- [ ] Title: "Building Teaching Tools with Claude Code"
- [ ] Choose simple, professional theme (recommend: Simple Light or Swiss)

### Build Each Slide

#### Slide 1: Title
- [ ] Add title: "Building Teaching Tools with Claude Code"
- [ ] Add subtitle: "A Non-Coder's Journey from Idea to Deployment"
- [ ] Add your name and date
- [ ] Optional: Background image (faded screenshot of game)

#### Slide 2: The Challenge
- [ ] Layout: Title + Two Columns
- [ ] Left column: Copy text about pedagogical goal, traditional options, what you wanted
- [ ] Right column: Insert image/diagram of supply chain or traditional beer game
- [ ] Add speaker notes from markdown

#### Slide 3: The Process
- [ ] Layout: Title + Three Columns (or two if three is cramped)
- [ ] Column 1: "Starting Point" content
- [ ] Column 2: "The Build Process" content
- [ ] Column 3: "The Collaboration" content
- [ ] Insert Screenshot 5 (Claude Code conversation) if space allows
- [ ] Add callout box: "I never wrote a single line of code"
- [ ] Add speaker notes

#### Slide 4: The Result
- [ ] Layout: Title + Two Columns
- [ ] Left column: Features list (student experience, faculty experience, technical achievement)
- [ ] Right column: Insert Screenshots 1-4 (arrange as grid or series)
- [ ] Add captions to each screenshot
- [ ] Add speaker notes

#### Slide 5: What This Makes Possible
- [ ] Layout: Title + Two Columns
- [ ] Left column: Examples for your teaching (simulations, tools, content)
- [ ] Right column: Key insights (what makes it different, what you need)
- [ ] Add workflow diagram (create with shapes: Challenge → Conversation → Application → Learning)
- [ ] Bottom callout: "The question isn't 'Can I code this?' The question is 'What do my students need?'"
- [ ] Add speaker notes

#### Slide 6 (Optional): Questions/Resources
- [ ] Contact information
- [ ] Resources list
- [ ] Discussion starters

### Polish
- [ ] Check consistent fonts across all slides
- [ ] Verify text is readable (test from distance)
- [ ] Ensure color scheme is consistent
- [ ] Check slide transitions (keep simple or none)
- [ ] Add slide numbers

---

## 🎯 Phase 4: Demo Preparation (30 minutes)

### Decide on Demo Approach
- [ ] **Option A:** Live demo during presentation
- [ ] **Option B:** Pre-recorded video walkthrough
- [ ] **Option C:** Screenshots only (safest, already in slides)

**Recommendation:** Option C (screenshots) for main talk, Option A (live) if time permits

### If Doing Live Demo

#### Test Setup (Day Before)
- [ ] Start servers on your laptop: `npm run dev`
- [ ] Test on local network (connect phone/tablet to verify network access works)
- [ ] Test in presentation room if possible (network/firewall)
- [ ] Bookmark `http://localhost:5173` in browser
- [ ] Prepare 4 browser windows/tabs in advance

#### Demo Script (2-3 minutes)
- [ ] Window 1: Show lobby entry
- [ ] Windows 1-4: Create room and have others join
- [ ] All windows: Click "Ready" and start game
- [ ] One window: Show placing an order
- [ ] One window: Show results after turn processes
- [ ] Close demo: "And this runs for 36 weeks with full cost tracking"

#### Backup Plan
- [ ] Have screenshots ready in slides if demo fails
- [ ] Have recorded video as backup (optional)
- [ ] Can show static interface if live demo doesn't work

---

## 📝 Phase 5: Practice & Refinement (30-45 minutes)

### Run Through Presentation
- [ ] Practice full presentation out loud (time yourself)
- [ ] Target: 10-12 minutes for slides, leaving 3-5 for Q&A/demo
- [ ] Check slide transitions and flow
- [ ] Practice explaining technical concepts in accessible terms

### Refine Content
- [ ] Cut anything that goes over time
- [ ] Emphasize key messages:
  - "You don't need coding skills"
  - "It's a conversation about pedagogy"
  - "Start with teaching goals"
  - "What could you build?"

### Prepare for Questions
Review the "Anticipate Questions" section in PRESENTATION-SLIDES.md:
- [ ] How much does it cost? ($20/month or free)
- [ ] How long did it take? (15-20 hours over 3 weeks)
- [ ] Do I need to understand code? (No, conversation-based)
- [ ] What if something breaks? (Claude helps debug)
- [ ] Cost vs. hiring developer? ($20 vs. $5,000+)
- [ ] What are limitations? (Complex graphics/video, large data)

### Create Handout (Optional)
- [ ] Print KEY-PROMPTS-GUIDE.md for interested faculty
- [ ] Create one-page resource sheet with:
  - Claude Code URL
  - Your contact info
  - Key takeaways
  - This project GitHub link (if you create one)

---

## 💻 Phase 6: Technical Setup (Day Before / Morning Of)

### Laptop Preparation
- [ ] Charge laptop fully
- [ ] Bring charging cable
- [ ] Test projector connection (HDMI adapter if needed)
- [ ] Close unnecessary applications
- [ ] Turn off notifications (Do Not Disturb mode)
- [ ] Clear browser history/close extra tabs
- [ ] Set display resolution appropriate for projector

### Application Setup
- [ ] Navigate to beer-game folder: `cd /Users/asp2d/beer-game`
- [ ] Start servers: `npm run dev`
- [ ] Verify both running (check terminal output)
- [ ] Open browser to `http://localhost:5173`
- [ ] Bookmark or keep tab open

### Backup Materials
- [ ] Copy presentation to USB drive
- [ ] Save screenshots separately as backup
- [ ] Email yourself copy of slides
- [ ] Have README.md available to show if needed

### Network Considerations
- [ ] If demoing over network, test venue WiFi beforehand
- [ ] Have mobile hotspot ready as backup
- [ ] For safety, localhost demo is sufficient (doesn't need network)

---

## 🎤 Phase 7: Day-Of Checklist

### Morning Of Presentation
- [ ] Review slides one final time
- [ ] Test beer game servers on laptop
- [ ] Pack laptop, charger, adapters
- [ ] Print handouts if prepared
- [ ] Bring water (you'll be talking!)

### 30 Minutes Before
- [ ] Arrive early to test equipment
- [ ] Connect laptop to projector
- [ ] Test display mirroring/extending
- [ ] Open presentation in Google Slides
- [ ] Start beer game servers (if demoing)
- [ ] Open browser windows for demo
- [ ] Test audio if showing video
- [ ] Set phone to silent

### 5 Minutes Before
- [ ] Close email/messaging apps
- [ ] Turn on Do Not Disturb
- [ ] Have first slide displayed
- [ ] Water nearby
- [ ] Slides ready to advance
- [ ] Demo browser windows ready (if applicable)
- [ ] Take a breath and remember: you built something cool!

---

## 🎬 Presentation Flow Guide

### Opening (1 minute)
"I want to share how I built a professional teaching simulation for my courses, despite having no coding background. This isn't about becoming a developer - it's about having pedagogical conversations that happen to produce software."

### The Problem (2 minutes)
- Explain the Beer Game and why it matters
- Traditional options and their limitations
- What you really wanted for your students

### The Process (5 minutes) ⭐ **Core of presentation**
- Your starting point (professor, not programmer)
- The iterative conversation with Claude
- What Claude did vs. what you did
- Time investment reality (15-20 hours over 3 weeks)
- "I described teaching goals, Claude translated to technology"

### The Result (3 minutes)
- Show screenshots of the game
- Quick demo if time permits
- Highlight: professional quality, works in real classroom
- Does exactly what's needed pedagogically

### What's Possible (2-3 minutes)
- Examples for their teaching
- Key insights (no coding needed, start with pedagogy)
- Real barrier isn't technical - it's imagining possibilities
- "What could you build?"

### Q&A / Demo (Remaining time)
- Open for questions
- Extended demo if interest
- Share resources

---

## 📊 Success Metrics

After the presentation, you'll know it went well if:
- [ ] Faculty ask "How do I get started?"
- [ ] Someone mentions a specific tool they want to build
- [ ] Questions focus on application, not just amazement
- [ ] Multiple people want to see the game or talk more
- [ ] You get follow-up emails asking for resources

---

## 📚 Post-Presentation Follow-Up

### Immediate (Day Of)
- [ ] Share slide deck with interested faculty
- [ ] Send link to Claude Code (claude.ai/code)
- [ ] Share KEY-PROMPTS-GUIDE.md if requested

### This Week
- [ ] Email recap to attendees with resources
- [ ] Offer office hours for interested faculty
- [ ] Consider: Upload to GitHub for sharing
- [ ] Consider: Blog post about the experience

### Longer Term
- [ ] Track who starts building with Claude
- [ ] Offer to be resource for colleagues
- [ ] Consider: Faculty learning community around AI tools
- [ ] Share lessons learned as they emerge

---

## 🆘 Troubleshooting

### "Demo isn't working"
→ Fall back to screenshots (that's why they're in slides)

### "Projector won't connect"
→ Have slides accessible on phone/tablet as absolute backup

### "Running over time"
→ Skip or abbreviate Slide 5 (possibilities), go straight to Q&A

### "Questions are too technical"
→ "That's a great technical question - the key is you don't need to know that to use this. Claude handles the implementation."

### "Someone asks to see code"
→ Have GitHub open as backup, or offer to show after presentation

---

## 🎯 Key Messages to Reinforce

Throughout presentation, return to these themes:

1. **"I never wrote code"** - This is about conversation, not programming
2. **"Start with teaching goals"** - Pedagogy first, technology follows
3. **"It's iterative"** - Took 3 weeks of back-and-forth, that's normal
4. **"What do your students need?"** - That's the only question that matters
5. **"You can do this"** - If I can, you can

---

## ✅ Final Pre-Flight Check

**Thursday Evening (Night Before):**
- [ ] Slides complete and polished
- [ ] Screenshots captured and inserted
- [ ] Demo tested and working (or backup ready)
- [ ] Laptop fully charged
- [ ] Adapters/cables packed
- [ ] Handouts printed (if doing)
- [ ] You've practiced at least once
- [ ] You're excited to share!

**Friday Morning:**
- [ ] Review slides
- [ ] Test demo one more time
- [ ] Nothing to install or download (already have everything)
- [ ] Arrive 30 min early

---

## 🎉 You've Got This!

Remember:
- You built something genuinely impressive
- Your journey is inspiring and relatable
- Faculty want to know what's possible
- Enthusiasm is more important than polish
- Questions mean engagement - that's good!

The goal isn't to make them experts in AI - it's to make them excited about possibilities and willing to try.

**Break a leg!**

---

**Last Updated:** March 29, 2024
**Presentation Date:** Friday, March 29, 2024
