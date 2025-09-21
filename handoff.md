# Claude Code Session Handoff

## Current Status
Working on Slidev presentation for Project Flora pitch deck. Have been debugging slide layout issues.

## What's Working ✅
- **Slide 1**: Title3.vue layout works perfectly (Flora-branded title slide)
- **Development server**: `npm run dev` running on http://localhost:3030/
- **Global Flora colors**: Available in style.css as CSS custom properties
- **File structure**: slides.md imports individual slides from slides/ folder

## Current Issues 🔧
- **Slide 2**: Two-column layout not working properly in Slidev
- **Layout**: Using `layout: two-cols` but cards showing stacked instead of side-by-side
- **Text sizing**: Text appears too large
- **Card styling**: `.card` class styling may not be applying correctly

## Recent Changes Made
1. **Fixed slide import syntax**: Changed from `## src: ./slides/02-problem.md` to proper frontmatter `src: ./slides/02-problem.md`
2. **Fixed layout name**: Changed from `TwoCols` to `two-cols` (kebab-case)
3. **Restored slide separator**: Put back `---` in 02-problem.md to separate "Ecosystem Broken" from "Complexity Spectrum"
4. **Added CSS overrides**: Added `!important` declarations to force card styling

## Key Files
- `/home/geoff/projects/project-flora-pitch-deck/slides.md` - Main presentation structure
- `/home/geoff/projects/project-flora-pitch-deck/slides/02-problem.md` - Broken slide content
- `/home/geoff/projects/project-flora-pitch-deck/layouts/Title3.vue` - Working slide layout
- `/home/geoff/projects/project-flora-pitch-deck/style.css` - Global Flora styles
- `/home/geoff/projects/project-flora-pitch-deck/_style.css` - Backup of full Flora styles

## Expected Slide 2 Structure
Should show two slides:
1. **"The Landscape Software Ecosystem is Broken"** - two columns with Annie (Professional) and Jake (Prosumer) cards
2. **"The Software Complexity Spectrum"** - with AxisScale component and grid layout

## Next Steps
1. Debug why `two-cols` layout isn't creating side-by-side columns
2. Check if CSS conflicts between Slidev's default styles and our Flora styles
3. Possibly need to create custom Vue layout like Title3 instead of using built-in Slidev layouts

## Frustration Context
User extremely frustrated with Slidev being difficult to work with. Every slide has been a struggle. The original HTML version looked good but had scaling issues. Slidev should be easier but has been a nightmare of CSS conflicts and layout problems.

## MCP Setup Intent
User wants to set up MCP Puppeteer server for rapid iteration/debugging of Vue components.