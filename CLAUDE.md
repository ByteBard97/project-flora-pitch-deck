# CLAUDE.md - Development Guidelines

## CRITICAL DEBUGGING PHILOSOPHY: FAIL FAST AND LOUD

### ❌ NEVER USE FALLBACKS

- **NO `|| 'default value'`** - Fallbacks hide real problems
- **NO `?.` optional chaining to paper over undefined data** - Find why it's undefined
- **NO defensive programming** - We want crashes when data is missing
- **NO graceful degradation** - We want explicit failures

### ❌ NEVER USE TRY-CATCH BLOCKS

- **NO `try { ... } catch { ... }`** - Errors must bubble up
- **NO error swallowing** - Every error is valuable information
- **NO "just in case" error handling** - Fix the root cause instead

### ✅ ALWAYS FAIL FAST AND LOUD

- **Throw explicit errors** when data is missing
- **Use assertions** to validate assumptions
- **Force crashes** to reveal configuration issues
- **Make problems visible immediately**

### Examples:

#### ❌ BAD - Hides Problems:

```js
const title = props.frontmatter?.title || "Default Title";
try {
  renderComponent();
} catch (e) {
  console.log("Something went wrong");
}
```

#### ✅ GOOD - Fails Fast:

```js
if (!props.frontmatter?.title) {
  throw new Error(
    `Missing title in frontmatter. Props: ${JSON.stringify(props)}`
  );
}
const title = props.frontmatter.title;
```

### Debugging Strategy:

1. **Add explicit error checks** for missing data
2. **Throw detailed error messages** with context
3. **Use console.log liberally** during debugging
4. **Remove debugging code** only after problems are solved
5. **Never mask problems** with fallback values

### Vue Component Rules:

- Every prop must be validated on component load
- Missing data should throw errors with full context
- Use explicit error boundaries, not silent failures
- Log all received props during debugging

## FAIL FAST = FASTER DEBUGGING = BETTER CODE

---

## 🚨 CRITICAL SLIDEV CSS CONSTRAINTS

### ✅ CONTAINER QUERY UNITS - THE PERFECT SOLUTION

**Container query units (`cqw`, `cqh`) are the BEST way to create responsive layouts in Slidev.**

#### Required Setup:

```vue
<template>
  <div class="slide-root">
    <div class="slide-content">
      <!-- Your slide content -->
    </div>
  </div>
</template>

<style scoped>
.slide-root {
  container-type: size;
  width: 100%;
  height: 100%;
}
</style>
```

#### Perfect Responsive CSS:

```css
/* Typography scales with container */
h1 {
  font-size: clamp(20px, 4cqw, 64px);
}
h2 {
  font-size: clamp(16px, 2.2cqw, 32px);
}

/* Layout spacing scales with container */
.main-content {
  gap: clamp(8px, 3cqw, 80px);
}
.right-column {
  gap: clamp(8px, 2cqh, 32px);
}

/* Padding/margins scale with container */
.slide-content {
  padding: clamp(8px, 2cqw, 40px) clamp(8px, 2cqh, 24px);
}
```

#### Why This Works:

- `1cqw` = 1% of container width
- `1cqh` = 1% of container height
- `clamp(min, preferred, max)` provides responsive bounds
- Scales perfectly from 1080p to 4K automatically
- Works with Slidev's transform/zoom system

#### Container Query Debugging:

```javascript
// Add this to verify container queries are working
const probe = document.createElement("div");
probe.style.cssText =
  "position: absolute; left: -9999px; width: 100cqw; height: 100cqh;";
slideRoot.appendChild(probe);
const cqW = probe.offsetWidth; // Should equal container width
const cqH = probe.offsetHeight; // Should equal container height
slideRoot.removeChild(probe);
console.log(
  "Container queries working:",
  Math.abs(cqW - container.clientWidth) < 5
);
```

### ❌ NEVER USE VIEWPORT UNITS IN SLIDEV

- **NO `vh` (viewport height)** - Slidev environment confounds this completely
- **NO `vw` (viewport width)** - Causes unpredictable scaling issues
- **NO `vmin` or `vmax`** - Same problems as vh/vw
- **NO `clamp()` with viewport units** - Will fail across different resolutions

### ✅ SLIDEV-SAFE CSS UNITS (fallback options)

- **Use `rem` and `em`** for scalable sizing
- **Use `%` for proportional layouts** within containers
- **Use `px` for fixed dimensions** when needed
- **Use CSS transforms** with media queries for multi-resolution support

### Multi-Resolution Strategy:

```css
/* Design at base 1920x1080, then scale up */
@media (min-width: 2560px) {
  .slide-container {
    transform: scale(1.8);
    transform-origin: top left;
    width: 55.56vw; /* Only in transform container */
    height: 55.56vh; /* Only in transform container */
  }
}

@media (min-width: 3840px) {
  .slide-container {
    transform: scale(2.5);
    transform-origin: top left;
    width: 40vw;
    height: 40vh;
  }
}
```

**Key Insight:** Slidev's presentation environment breaks standard responsive CSS. Always design for base resolution (1920x1080) using rem/px, then scale the entire container for higher resolutions.

---

## Project Overview

This is a Slidev-based presentation system for Project Flora pitch deck.

### Key Commands

```bash
npm run dev        # Start Slidev development server
npm run build      # Build presentation
npm run export     # Export to PDF
```

### Architecture

- **Slidev** - Vue-based presentation framework
- **slides.md** - Main slide configuration file
- **slides/** - Individual slide markdown files
- **layouts/** - Vue layout components
- **components/** - Reusable Vue components
- **style.css** - Global styling with Flora brand colors

---

## SLIDE DECK CONVERSION PROCESS - MANDATORY STEPS

### CRITICAL: Follow these steps IN ORDER for EVERY slide conversion

**Status: Slides 1-3 completed, Slide 4 half-done, Slides 5-13 pending**

### ⚠️ NEVER CLAIM COMPLETION WITHOUT VERIFICATION

#### Step 1: STUDY THE ORIGINAL

```bash
# Always start by examining the original slide
ls /home/geoff/projects/project-flora-pitch-deck/extracted-slides/
# Read the original HTML file for the slide
# Take screenshot of original website at /home/geoff/projects/project-flora-pitch-deck/docs/index.html
```

#### Step 2: CREATE VUE LAYOUT

- Create Vue layout file in `/layouts/` directory
- Use Vue components, NOT markdown HTML
- Include all content from original
- Add Flora brand green gradient background
- Include smooth animations

#### Step 3: CONTINUOUS VERIFICATION LOOP

```bash
# Take HD screenshot using tools
node tools/snap.js --url "http://localhost:3030/[SLIDE_NUMBER]" --out "screenshots/slide[N]-current.png" --width 1920 --height 1080 --wait 3000

# MANDATORY: Read and examine the screenshot
# Compare against original design
# Verify ALL content is visible (not cut off)
# Check ALL text is readable
# Ensure proper spacing and layout
```

#### Step 4: FIX UNTIL PERFECT

- **NEVER move to next slide until current slide is 100% complete**
- Fix any cut-off content
- Adjust layout to fit all content in viewport
- Ensure animations work properly
- Verify against original design

#### Step 5: FINAL VERIFICATION

- Take final HD screenshot
- Compare side-by-side with original
- Verify all 4 requirements met:
  1. ✅ All content visible (nothing cut off)
  2. ✅ Proper Flora green background
  3. ✅ Layout matches original design
  4. ✅ Smooth animations working

### 🚨 MANDATORY REQUIREMENTS FOR EVERY SLIDE

1. **Green gradient background**: `linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%)`
2. **All content visible**: Nothing cut off at edges or bottom
3. **HD quality**: Use custom snap tools, not low-res puppeteer screenshots
4. **Vue components**: No markdown HTML, pure Vue layouts
5. **Animations**: Smooth transitions and entrance effects
6. **Typography**: Readable font sizes, proper contrast

### 🔄 VERIFICATION PROCESS

**For EVERY change:**

1. Make change to Vue file
2. Take HD screenshot using `node tools/snap.js`
3. Read screenshot file to verify visually
4. Compare against original design
5. If not perfect, repeat until it is

**NEVER claim completion without this verification loop**

### 📁 File Structure per Slide

```
/layouts/Slide[N].vue           # Main Vue layout
/slides/[N]-[slide-name].md     # Minimal markdown (just layout reference)
/screenshots/slide[N]-final.png     # Final verified screenshot
```

### 🛠️ Available Tools

- `tools/snap.js` - HD screenshots with custom viewport
- `tools/snap-full.js` - Full page screenshots
- `tools/snap-scroll.js` - Scrolling screenshots
- `tools/snap-and-click.js` - Interactive screenshots

### ❌ COMMON MISTAKES TO AVOID

1. **Claiming completion without verification**
2. **Using markdown HTML instead of Vue**
3. **Not checking if content is cut off**
4. **Not comparing against original design**
5. **Using low-resolution screenshots**
6. **Moving to next slide before current is perfect**

### 📋 SLIDE CONVERSION CHECKLIST

For each slide, verify:

- [ ] Vue layout created in `/layouts/`
- [ ] All original content included
- [ ] Green gradient background applied
- [ ] HD screenshot taken and verified
- [ ] No content cut off or clipped
- [ ] Layout matches original design
- [ ] Animations working smoothly
- [ ] Typography readable and proper
- [ ] Final comparison with original passed

**Only mark complete when ALL checkboxes are ✅**

---

## AUTOMATED SLIDE CONVERSION PROCESS

### 🔄 REPEATABLE LOOP FOR ALL 13 SLIDES

**Current Status: Slides 1-3 ✅ | Slide 4 ❌ (broken) | Slides 5-13 ⏳**

### Step-by-Step Process (Run Until All 13 Complete)

#### 1. IDENTIFY NEXT SLIDE

```bash
# Check which slide needs work
ls /home/geoff/projects/project-flora-pitch-deck/extracted-slides/
# Current target: Fix Slide 4, then 5-13
```

#### 2. STUDY ORIGINAL

```bash
# Read original HTML
Read: /home/geoff/projects/project-flora-pitch-deck/extracted-slides/[SLIDE-NAME].html
# Take reference screenshot if needed
node tools/snap.js --url "file:///home/geoff/projects/project-flora-pitch-deck/docs/index.html" --out "screenshots/original-slide[N].png"
```

#### 3. CREATE/FIX VUE LAYOUT

```bash
# Create or edit Vue layout
Write/Edit: /home/geoff/projects/project-flora-pitch-deck/layouts/Slide[N].vue
# Update slide markdown to use layout
Edit: /home/geoff/projects/project-flora-pitch-deck/slides/[N]-*.md
```

#### 4. VERIFY WITH HD SCREENSHOT

```bash
# Take HD screenshot
node tools/snap.js --url "http://localhost:3030/[N]" --out "screenshots/slide[N]-current.png" --width 1920 --height 1080 --wait 3000
# MANDATORY: Read screenshot to verify
Read: /home/geoff/projects/project-flora-pitch-deck/screenshots/slide[N]-current.png
```

#### 5. CHECK COMPLETION CRITERIA

- ✅ All content visible (nothing cut off)
- ✅ Green gradient background
- ✅ Matches original design
- ✅ Readable typography
- ✅ Smooth animations

#### 6. IF NOT PERFECT → FIX AND REPEAT FROM STEP 3

#### 7. IF PERFECT → MOVE TO NEXT SLIDE

### 🎯 SIMPLE SUCCESS CRITERIA

**For each slide, answer YES to all:**

1. Can I see ALL text content from the original?
2. Is nothing cut off at edges/bottom?
3. Does it have the green gradient background?
4. Are animations working smoothly?
5. Is the layout clean and readable?

**If ANY answer is NO → Keep fixing until ALL are YES**

### 📝 SLIDE QUEUE

1. ✅ Slide 1 (Title) - Complete
2. ✅ Slide 2 (Problem) - Complete
3. ✅ Slide 3 (Franken-Stack) - Complete
4. ❌ Slide 4 (Opportunity) - BROKEN (Market Readiness Signals cut off)
5. ⏳ Slide 5 - Pending
6. ⏳ Slide 6 - Pending
7. ⏳ Slide 7 - Pending
8. ⏳ Slide 8 - Pending
9. ⏳ Slide 9 - Pending
10. ⏳ Slide 10 - Pending
11. ⏳ Slide 11 - Pending
12. ⏳ Slide 12 - Pending
13. ⏳ Slide 13 - Pending

**CURRENT TARGET: Fix Slide 4 Market Readiness Signals**

### ⚡ AUTOMATION READY

This process is designed to be:

- **Mechanical** - Same steps every time
- **Verifiable** - HD screenshots prove completion
- **Foolproof** - Can't claim done until criteria met
- **Repeatable** - Run all night until 13/13 complete
