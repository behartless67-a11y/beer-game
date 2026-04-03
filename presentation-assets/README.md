# Presentation Materials for Faculty Brown Bag

## What's In This Folder

This folder contains everything you need for your Friday faculty brown bag presentation about building teaching tools with Claude Code.

---

## 📄 Documents

### 1. **PRESENTATION-SLIDES.md** (Main Document)
Complete slide-by-slide content for a 4-5 slide Google Slides presentation.

**What it contains:**
- Full text for each slide
- Layout instructions
- Speaker notes
- Visual descriptions
- Timing guidance
- Anticipated Q&A

**How to use:**
- Read through first to understand flow
- Use as guide to create Google Slides presentation
- Follow layout suggestions for each slide
- Copy speaker notes into Google Slides notes section

---

### 2. **KEY-PROMPTS-GUIDE.md** (Companion Document)
Detailed examples of prompts and conversation patterns from building the Beer Game.

**What it contains:**
- Example prompts from each development phase
- Effective prompt patterns
- Anti-patterns (what not to do)
- The conversation flow explained
- Time investment breakdown
- Questions you asked Claude

**How to use:**
- Reference during presentation when discussing process
- Share with interested faculty after presentation
- Use examples when explaining how you collaborated with Claude
- Optional: Print as handout for attendees

---

### 3. **SCREENSHOT-GUIDE.md** (Technical Instructions)
Step-by-step instructions for capturing the 5 screenshots needed for your slides.

**What it contains:**
- Detailed capture instructions for each screenshot
- Terminal commands for macOS screencapture
- Alternative methods (Cmd+Shift+5)
- Troubleshooting tips
- File naming conventions

**How to use:**
- Follow step-by-step to capture screenshots
- Reference if screenshots need to be retaken
- Allow ~30 minutes to capture all 5

---

### 4. **PRESENTATION-PREP-CHECKLIST.md** (Master Checklist)
Complete preparation checklist from content creation through day-of presentation.

**What it contains:**
- 7 phases of preparation
- Time estimates for each phase
- Technical setup instructions
- Day-of checklist
- Troubleshooting guide
- Success metrics

**How to use:**
- Use as your master planning document
- Check off tasks as you complete them
- Review day-of checklist Friday morning
- Reference troubleshooting section if issues arise

---

## 🖼️ Screenshots (To Be Created)

You need to capture these 5 screenshots:

1. **screenshot-1-lobby.png** - Initial lobby entry screen
2. **screenshot-2-waiting-room.png** - Room waiting area with players
3. **screenshot-3-gameplay.png** - Active game interface with gauges
4. **screenshot-4-in-progress.png** - Game after several turns
5. **screenshot-5-claude-conversation.png** - Claude Code interface/conversation

See **SCREENSHOT-GUIDE.md** for detailed capture instructions.

---

## 🚀 Quick Start Guide

### If You Have 2 Hours
1. **Read PRESENTATION-SLIDES.md** (20 min)
2. **Capture screenshots** using SCREENSHOT-GUIDE.md (30 min)
3. **Build Google Slides** from PRESENTATION-SLIDES.md (45 min)
4. **Practice once** (15 min)

### If You Have 4 Hours (Recommended)
1. Read PRESENTATION-SLIDES.md (20 min)
2. Review KEY-PROMPTS-GUIDE.md (30 min)
3. Capture screenshots (30 min)
4. Build Google Slides (60 min)
5. Review PRESENTATION-PREP-CHECKLIST.md (20 min)
6. Practice presentation 2-3 times (60 min)

### If You're Short on Time (1 Hour)
1. Skim PRESENTATION-SLIDES.md (10 min)
2. Capture screenshots (30 min)
3. Create quick slides with just key points + screenshots (20 min)
4. Plan to do more demo, less slides

---

## 📅 Recommended Timeline

### **Monday/Tuesday: Content Creation**
- Read all documents
- Understand structure and flow
- Capture screenshots
- Start building Google Slides

### **Wednesday: Slide Building**
- Complete Google Slides
- Insert all screenshots
- Add speaker notes
- Get slides to ~80% done

### **Thursday: Practice & Polish**
- Finish slides (100%)
- Practice presentation 2-3 times
- Time yourself
- Refine based on timing
- Test demo if doing live demo
- Prepare handouts if desired
- Review Q&A section

### **Friday Morning:**
- Quick review
- Test equipment
- Arrive 30 min early
- Present!

---

## 🎯 Core Messages for Your Presentation

Keep returning to these themes:

1. **You don't need coding skills** - It's conversation, not programming
2. **Start with pedagogy** - Teaching goals first, technology follows
3. **It's iterative** - 3 weeks of back-and-forth is normal
4. **Accessible now** - Tools exist and work today
5. **What could you build?** - Inspire imagination

---

## 💡 Presentation Structure (5 Slides)

**Slide 1:** Title
- Set the stage: "A non-coder's journey"

**Slide 2:** The Challenge
- The pedagogical problem I needed to solve

**Slide 3:** The Process ⭐
- How I collaborated with Claude (this is the heart)

**Slide 4:** The Result
- Screenshots of the working game

**Slide 5:** What's Possible
- What faculty can build / Takeaways

---

## 🛠️ Technical Requirements for Screenshots

### Before Capturing Screenshots:
```bash
cd /Users/asp2d/beer-game
npm run dev
```

Wait for servers to start, then open `http://localhost:5173`

### After Capturing:
Verify all 5 files exist:
```bash
ls -lh ~/beer-game/presentation-assets/screenshot-*.png
```

---

## 📤 Sharing Materials

### After Your Presentation:

**Share with interested faculty:**
- Google Slides (export as PDF or share link)
- KEY-PROMPTS-GUIDE.md (most useful for them)
- Link to Claude Code: [claude.ai/code](https://claude.ai/code)
- Your contact info for follow-up

**Optional:**
- Create GitHub repo for the beer game
- Write blog post about the experience
- Offer office hours for interested faculty

---

## ❓ Questions to Expect

Prepare responses for:
- Cost? (~$20/month or free tier)
- Time? (15-20 hours over 3 weeks)
- Need coding skills? (No, conversation-based)
- What breaks? (Claude helps debug)
- vs. hiring developer? ($20 vs. $5,000+)
- Limitations? (Complex graphics, large data - but most teaching tools are fine)

See PRESENTATION-SLIDES.md "Anticipate Questions" section for more.

---

## 🎬 Demo Options

### Option A: Screenshots Only (Safest)
- All screenshots in slides
- No live demo risk
- Still shows the result clearly

### Option B: Live Demo (If Confident)
- Start servers before presentation
- Have 4 browser windows ready
- 2-3 minute walkthrough
- Backup: fall to screenshots if issues

### Option C: Recorded Video (Middle Ground)
- Record demo in advance
- No live demo risk
- Shows actual interaction
- Requires video editing

**Recommendation:** Option A (screenshots) for main presentation, Option B if time and confidence permit.

---

## ✅ Pre-Presentation Checklist

**Content Ready:**
- [ ] Slides built in Google Slides
- [ ] All 5 screenshots captured and inserted
- [ ] Speaker notes added
- [ ] Practiced at least once

**Technical Ready:**
- [ ] Laptop charged
- [ ] Adapters/cables packed
- [ ] Demo tested (if doing live)
- [ ] Backup plan ready

**You're Ready:**
- [ ] Know your key messages
- [ ] Excited to share
- [ ] Prepared for questions
- [ ] Confident in your story

---

## 🎉 Remember

You built something genuinely impressive. You went from idea to working application in 3 weeks, despite not being a developer. That's the story - and it's inspiring.

The goal isn't to make faculty into AI experts. It's to make them excited about possibilities and willing to experiment.

**You've got this!**

---

## 📞 Need Help?

If you need to revise any of these documents or create additional materials, just ask Claude Code.

Example requests:
- "Make the slides more concise"
- "Add a slide about [topic]"
- "Create a one-page handout"
- "Help me practice Q&A responses"

---

## File Locations

All materials are in:
```
/Users/asp2d/beer-game/presentation-assets/
```

**Next steps:**
1. Start with PRESENTATION-PREP-CHECKLIST.md
2. Capture screenshots using SCREENSHOT-GUIDE.md
3. Build slides from PRESENTATION-SLIDES.md
4. Reference KEY-PROMPTS-GUIDE.md during presentation

**Good luck with your presentation! 🚀**
