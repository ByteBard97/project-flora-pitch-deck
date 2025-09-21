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
const title = props.frontmatter?.title || 'Default Title';
try {
  renderComponent();
} catch (e) {
  console.log('Something went wrong');
}
```

#### ✅ GOOD - Fails Fast:
```js
if (!props.frontmatter?.title) {
  throw new Error(`Missing title in frontmatter. Props: ${JSON.stringify(props)}`);
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