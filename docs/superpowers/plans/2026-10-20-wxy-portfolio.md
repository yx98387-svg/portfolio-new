# WXY AI Designer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable React + Vite desktop-first portfolio for AI designer Wang Xinyuan.

**Architecture:** A single React page composes semantic, anchor-addressable sections from small data arrays. CSS owns the editorial layout, art-direction placeholders, responsive rules, and low-motion decorative animation; no runtime data or third-party visual dependency is needed.

**Tech Stack:** React 18, Vite 5, Vitest, CSS.

**Spec:** `docs/superpowers/specs/2026-10-20-wxy-portfolio.md`

## Global Constraints

- Use React + Vite and validate with `npm run build`.
- Make the desktop content width 1700px or less.
- Present only supplied resume claims as factual content.
- Use CSS-created conceptual artwork until genuine project images are supplied.

---

### Task 1: Establish the application shell

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/App.test.jsx`

**Interfaces:**
- Produces: `App`, a default React component rendering the primary named site sections.

- [ ] **Step 1: Write the failing test**

```jsx
it('renders the hero identity and all primary landmark sections', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /wang xinyuan/i })).toBeInTheDocument()
  expect(screen.getByRole('region', { name: /about/i })).toBeInTheDocument()
  expect(screen.getByRole('region', { name: /selected work/i })).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL because `App` is absent.

- [ ] **Step 3: Write minimal implementation**

```jsx
export default function App() {
  return <main><h1>Wang Xinyuan</h1></main>
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.jsx`
Expected: PASS after all semantic sections are implemented.

### Task 2: Build the portfolio content and visual system

**Files:**
- Modify: `src/App.jsx`
- Create: `src/styles.css`

**Interfaces:**
- Consumes: `App` from Task 1.
- Produces: full hero, about, project, strengths and contact presentation with anchor navigation.

- [ ] **Step 1: Write the failing test**

```jsx
it('exposes a direct email contact action', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:2402800273@qq.com')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL because the email link does not exist.

- [ ] **Step 3: Write minimal implementation**

```jsx
<a href="mailto:2402800273@qq.com">Email</a>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.jsx`
Expected: PASS.

### Task 3: Verify the runnable site

**Files:**
- Modify: `package.json` only if test/build scripts require adjustment.

- [ ] **Step 1: Run all tests**

Run: `npm test -- --run`
Expected: all tests pass.

- [ ] **Step 2: Build production output**

Run: `npm run build`
Expected: Vite exits with code 0 and creates `dist/`.

- [ ] **Step 3: Preview and inspect the desktop layout**

Run: `npm run dev -- --host 127.0.0.1`
Expected: page serves locally and the hero, project cards and contact ending are visually intact at desktop size.
