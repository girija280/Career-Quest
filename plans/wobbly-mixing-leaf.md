# Career Quest — Bug Fixes: Step 0 Layout + College Guide Restore

## Issue 1 — Step 0 Left Column Empty Space

**Root cause:** The left column in `.intake-grid` only has 2 short cards (Persona + Time Horizon), while the right column has 4 cards + submit. The auth block lives *above* the grid at full width. The left column naturally ends halfway down the page, leaving a large whitespace gap.

**Fix:**
- Move the auth block (sign-in / create account toggle + email/password fields) *inside* the left column as the first card. It currently lives at `lines 124–147` above the `.intake-grid`.
- This gives the left column 3 stacked cards (Auth + Persona + Horizon) which roughly balances the right's 4 cards + submit.
- Remove the auth block from its current above-grid position.
- No right-column changes needed.

**File:** `public/step-0-intake.html`

---

## Issue 2 — College "Guide & Exploring" Removed

**Root cause:** The previous step-4-colleges.html had expandable, detail-rich college cards users could browse. The rewrite reduced cards to a minimal compatibility-ranked list with no drill-down — removing the exploration experience.

**Fix — Expandable college cards (same pattern as step-3-courses.html):**
- Each college card shows a collapsed summary: name, location, compat badge, avg placement, and an "Explore →" chevron.
- Clicking expands the card to reveal: total fees, entrance exam, scholarships list, top recruiters, and a detailed description/guide note.
- Only one card expanded at a time.
- The "Select This College" button lives *inside* the expanded state only (consistent with step-3-courses.html pattern).
- Score-based ranking and Reach/Target/Safe badges are preserved.
- The CGL section (filter tab) also gets expanded cards with the same pattern.

**File:** `public/step-4-colleges.html`

---

## Files to Modify

| File | Change |
|------|--------|
| `public/step-0-intake.html` | Move auth block into left column; remove full-width auth above grid |
| `public/step-4-colleges.html` | Add expand/collapse to college cards; move Select button inside expanded state |

---

## Verification
1. Step 0 on desktop (≥900px): left and right columns should be roughly equal height with no large gap.
2. Step 0 on mobile: single column, auth appears first, then persona, horizon, scores, etc.
3. Step 4: cards collapsed by default; clicking expands to show full details; Select button only inside expanded state; compat ranking and Reach/Target/Safe badges preserved.

# Career Quest — 6-Page Redesign & Engine Upgrade

## Context
User reviewed all 6 pages and identified UX, layout, engine, and logic issues across each. Changes preserve the core localStorage state machine and inter-page flow, but significantly improve quiz depth, layout ergonomics, branch explanation quality, page ordering, and college filtering.

---

## Page 1 — Landing Page (`public/index.html`)

**Problem:** No scroll cue; users don't know content exists below the fold.

**Fix:**
- Add a subtle animated scroll indicator (chevron/arrow + "Explore" label) at the bottom of the hero viewport that fades out on scroll.
- Optionally add a faint gradient at the hero bottom to imply continuation.
- No structural changes needed — just a scroll-hint element with a CSS keyframe bounce.

---

## Page 2 — Step 0 Intake (`public/step-0-intake.html`)

**Problems:**
1. "Sign In" shows empty form — should reload previously saved profile from localStorage.
2. PC layout scrolls awkwardly (single-column, very tall).
3. Background color hurts eyes (likely leftover dark + white mix after the sed patch).

**Fix:**

### Auth / returning user
- On `setAuthMode('signin')`, read `cq_state` and populate all fields (persona, horizon, exam scores, financial, location) from saved profile. Show a "Welcome back" banner.
- On `setAuthMode('create')`, clear fields and start fresh.

### PC two-column layout
- Wrap the form in a two-column grid on screens ≥ 900px:
  - **Left column:** Auth block + Persona + Horizon
  - **Right column:** Exam Scores + Financial + Location + Submit
- Keep single-column stacking for mobile (already works).

### Color fix
- The sed replacement likely turned the dark header gradient into a same-color navy-on-white mix. Replace the h2 gradient with a clean `color: var(--navy)` or a navy→blue directional gradient with proper visibility.
- Ensure section label colors use proper token values (`var(--blue)`, `var(--purple)` etc.) with sufficient contrast on white.

---

## Page 3 — Step 1 Quiz (`public/step-1-quiz.html`)

**Problem:** Only 14 binary situational questions — too vague, doesn't test actual ability. User wants distinct sections: IQ / GK / Math / Situational Judgment / Personality, with persona-aware difficulty and an API integration point.

**Fix — Major engine rewrite:**

### Section structure (5 sections, ~30–40 questions total)
Each section has an intro card showing section name, description, and estimated time before questions begin.

| Section | Questions | Trait targets | Persona variants |
|---------|-----------|---------------|-----------------|
| **IQ & Logic** | 6 | ABS, SYS, MTH | Same across personas; difficulty scales |
| **General Knowledge** | 6 | ABS, CRE | GK topics shift by persona (12th → NCERT, BTech → current affairs in tech) |
| **Mathematics** | 6 | MTH, ABS | 12th: Boards-level; BTech: engineering math |
| **Situational Judgment** | 6 | RSK, AMB, STM, FIN | Same base, 12th framing vs. workplace framing |
| **Personality Assessment** | 8 | BLD, CRE, AMB, RSK, STM, FIN, HW, SYS | Always the same; these are preference questions |

**Total: ~32 questions** (can tune per section)

### Question types
- **IQ/Math/GK:** 4-option MCQ (A/B/C/D). Correct = trait boost + accuracy score. Wrong = no penalty but logged.
- **Situational/Personality:** 4-option scale or binary choice (existing style).

### API integration point
- Add a config flag `USE_API_QUESTIONS = false` at top of script.
- When true: fetch from `GET /api/questions?persona={persona}&section={section}` before each section.
- When false (default): use the inline JS question bank.
- This way the engine is ready for a real API without breaking the offline fallback.

### Persona-aware question bank
- `QUESTIONS` object keyed by `{ section, persona }` — persona defaults to `'12th_pass'` if not set.
- 12th Pass math questions reference NCERT chapters; BTech reference calculus/linear algebra.
- GK for 12th: Indian geography, science events. BTech: tech industry, AI news.

### Scoring
- IQ/Math/GK questions: track both `score[trait]` (as before) AND `accuracy[section]` (correct/total). `accuracy` saved to localStorage for use in branch explanation page.
- Personality/Situational: same additive trait delta as current.

### UI improvements
- Section progress: show "Section 2 of 5 — Mathematics" above the question bar.
- Section intro card: full-screen with icon, section name, number of questions, and a "Begin" button.
- Answer feedback: on MCQ, highlight correct in green / wrong in red for 800ms before advancing.
- Background: apply `background: var(--bg-2)` to `body` for quiz area to avoid glare on white.

---

## Page 4 — Step 2 Branch Map (`public/step-2-branches.html`)

**Problem:** AI Explain drawer shows raw trait names ("your SYS score is 8") instead of human-readable strengths.

**Fix — Rewrite mock AI explanation generator:**

Replace the current generic `reason` string with a dynamic narrative built from the user's actual top traits. Logic:

```js
function buildExplanation(branch, scores) {
  const topTraits = getTopTraits(scores, 3); // returns [{code, label, score}]
  const narratives = {
    ABS: "You think in abstractions — you're comfortable working with ideas that don't have a physical form.",
    BLD: "You have a strong drive to build and ship things — you're energized by seeing something work.",
    SYS: "You naturally see how parts connect into wholes — you'd thrive designing systems that scale.",
    MTH: "You're comfortable with mathematical reasoning, which is the foundation of most engineering branches.",
    HW: "You're drawn to physical systems — circuits, sensors, and hardware that interact with the real world.",
    RSK: "You're willing to take calculated risks, which maps well to entrepreneurial and research roles.",
    STM: "You have the academic stamina to push through complex multi-year specialization.",
    AMB: "You're comfortable in ambiguous situations — a quality that matters in research and early-stage roles.",
    FIN: "You think practically about financial outcomes, which helps you make grounded career choices.",
    CRE: "You bring creative thinking to problems, which is valuable in design, UX, and innovative engineering."
  };
  // Compose: "Based on your strengths in [trait1], [trait2], and [trait3], [branch] is a strong fit because..."
}
```

- Replace the hardcoded `fits` insight list with trait-specific insight lines pulled from the user's actual scores.
- All phrasing is positive and constructive (strength-framing, not gap-framing).
- No raw trait codes shown to user — only the label (e.g., "Systems Thinking", not "SYS").

---

## Page 5 — Step 3 Specializations (`public/step-3-courses.html`)

**Two changes:**

### A. Move to after college selection (reorder pages)
Reorder the flow:
- Current: Quiz → Branch → **Specializations** → Colleges → Career
- New: Quiz → Branch → **Colleges** → Specializations → Career

Implementation:
- Rename the navigation links across all pages: step-3 now points to `step-4-colleges.html`, step-4 colleges now points to `step-3-courses.html`, step-3-courses links to `step-5-careers.html`.
- Update `renderNav()` active indices in each file accordingly (step-3-courses becomes stage 4 in the nav, step-4-colleges becomes stage 3).
- No changes to localStorage keys — just the nav flow.

### B. Exploration-first mode (selection still required to proceed)
- Each spec card defaults to a collapsed "explore" state: name, difficulty, one-line description, and an "Explore →" expand button.
- Expanding a card reveals: curriculum topics, top institutes offering the spec, typical first-job titles, and average starting salary.
- A "Select This Specialization" button appears only inside the expanded state — users must read before they can pick.
- Once selected, the card shows a "Selected ✓" state and the sticky CTA unlocks "Continue to Career Outlook →".
- `selectedCourse` is still written to localStorage and still required to advance.

---

## Page 6 — Step 4 Colleges (`public/step-4-colleges.html`)

**Two changes:**

### A. Remove tier tabs, use exam scores for filtering
- Remove the 5 manual tier tabs (Tier 1, Tier 2, Tier 3, Independent, CGL).
- Instead, auto-filter and sort colleges by compatibility with the user's exam scores from `state.profile.examScores`.
- Scoring logic: each college has an `exam` field (e.g. `"JEE Advanced"`, `"MHT-CET"`). Match the user's score to the relevant exam and compute a compatibility percentage.
- Show all colleges in a single ranked list with a compatibility badge (e.g., "94% match", "Reach", "Safe", "Target").
- Keep a lightweight filter bar: "All", "Govt/PSU", "Private" — replacing the tier tabs.
- CGL/Govt paths remain accessible via the "Govt/PSU" filter.

### B. Score estimation popup (when score missing)
- If `state.profile.examScores` is empty or the relevant score is missing, show a modal before rendering:
  - Title: "Estimate Your Score"
  - Per exam: slider or dropdown (Excellent / Good / Average / Below Average)
  - Helper text: e.g., "Maharashtra students: MHT-CET 150+ ≈ JEE Main 85th percentile"
  - On confirm: save estimated scores to `cq_state.profile.examScores` and render colleges.
- This replaces the tier manual selection with a data-driven approach.

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/index.html` | Add scroll-hint element + CSS |
| `public/step-0-intake.html` | Two-column PC layout, Sign In prefill, color fixes |
| `public/step-1-quiz.html` | Full quiz engine rewrite (5 sections, ~32 Q, API hook) |
| `public/step-2-branches.html` | Rewrite `buildExplanation()` with human-readable trait narratives |
| `public/step-3-courses.html` | Exploration mode (no select), update nav links to step-5 |
| `public/step-4-colleges.html` | Remove tier tabs, add score-based ranking, score estimation popup |
| `public/step-5-careers.html` | Update nav links (step-3 now follows step-4) |
| `public/step-5b-mtech.html` | Update any back-links |
| `public/step-6-advice.html` | Update any back-links |
| `public/intro.css` | No structural changes needed |

---

## State / localStorage Changes

| Key | Before | After |
|-----|--------|-------|
| `profile.examScores` | Optional | Still optional; estimation popup fills it if missing |
| `selectedCourse` | Required | Optional (exploration mode) |
| `selectedTier` | Written by college page | Removed; replaced by `collegeFitScore` |
| `quizScores` | 10 trait totals | Same + `quizAccuracy: { iq, gk, math }` added |

---

## Verification
1. Open `/` — confirm scroll indicator visible, fades on scroll.
2. Step 0 → create account → fill all fields → submit → navigate forward.
3. Return to Step 0 → click Sign In → confirm fields pre-populate.
4. Step 1 → complete all 5 sections → confirm trait scores accumulate correctly, accuracy tracked.
5. Step 2 → open AI Explain → confirm human-readable narrative, no raw trait codes shown.
6. Step 4 → open with no exam scores → confirm estimation popup appears → confirm college list ranked.
7. Step 3 → confirm reached after step 4 → no selection required, explore mode works.
8. Full run-through end to end: landing → step 0 → 1 → 2 → 4 (colleges) → 3 (specs explore) → 5 → 6 (report).
