# Career Quest: Replace Core Quiz and Lock Non-B.Tech Paths

## Goal

Refocus the current Career Quest flow on users actively seeking a B.Tech pathway:

1. Replace every question in the **IQ & Logic**, **Science & Technology**, and **Mathematics** sections.
2. Keep the current section length at six questions each (18 replacement questions total).
3. Allow progression only for study routes whose destination includes earning a B.Tech.
4. Keep non-B.Tech routes visible but clearly locked so users understand the product scope.

## Confirmed Product Decisions

- Use one shared 18-question core assessment for every unlocked B.Tech seeker rather than separate regular and diploma banks.
- Keep four answer choices, immediate correct/incorrect feedback, section accuracy, trait scoring, progress calculation, and Builder DNA results.
- Keep the existing status-specific **Pathway Decisions** questions and shared **Personality Assessment** questions.
- Show unavailable routes rather than hiding them.
- “B.Tech seeker” means a route whose selected study plan includes earning a B.Tech, not any route that merely happens after a previously completed B.Tech.

## Unlocked Route Matrix

Mark each horizon option explicitly as enabled or locked instead of inferring access from display text.

### 12th Pass

- **Unlocked:** 4-year B.Tech / BE route.
- **Unlocked:** 6-year integrated B.Tech + M.Tech route.
- **Locked:** certificates, non-engineering three-year bachelor degrees, and direct research/PhD route.
- Narrow mixed option labels so an unlocked card does not advertise unrelated B.Arch, B.Design, M.Sc, or MBA alternatives.

### Diploma Holder

- **Unlocked:** 3-year B.Tech lateral-entry route.
- **Unlocked:** 4-year B.Tech lateral-entry plus postgraduate diploma route.
- **Unlocked:** 5-year B.Tech lateral-entry plus M.Tech route.
- **Locked:** commerce lateral-entry and research/PhD-only route.

### Job Seeker / Working Professional

- **Unlocked:** the existing 4-year B.Tech route.
- **Locked:** certification, PG, non-engineering bachelor, and PhD routes.
- Preserve the repository’s existing route wording unless product/legal review separately requests changes to its delivery-mode claim.

### B.Tech Graduate and M.Tech Passed

- All listed horizons are locked because they are post-B.Tech education or upskilling routes rather than paths to earning a B.Tech.
- The persona/status buttons remain selectable so users can see the unavailable state and scope explanation.

## Intake UI and Access Rules

Update `public/step-0-intake.html`:

1. Add explicit availability metadata to every `HORIZON_MAP` option, such as `enabled: true` for the B.Tech routes.
2. Render locked options with:
   - native `disabled` behavior;
   - reduced visual emphasis;
   - a lock label such as “Coming soon”;
   - no hover/selected behavior that implies availability.
3. When a persona has no B.Tech-seeker route, show an explanatory message below the horizon list, for example: “Career Quest currently supports students planning to earn a B.Tech. More pathways are coming soon.”
4. Ensure changing persona always clears the previous horizon so a previously valid selection cannot leak into a locked persona.
5. Make `selectHorizon` reject unavailable options defensively even if called directly.
6. Make `handleSubmit` validate the persona/horizon pair against an explicit B.Tech route allowlist before saving or navigating.
7. Save an unambiguous path marker in the profile, for example `pathway: "btech"`, while retaining `persona` and `horizon` for existing downstream pages and reports.
8. When loading an older saved profile, only restore its horizon selection if that persona/horizon pair is currently allowed. Do not silently treat a stale non-B.Tech profile as valid.

## Direct-URL Guard

Update `public/step-1-quiz.html` so users cannot bypass the intake restriction with stale local storage or a direct URL:

1. Read `cq_state.profile`.
2. Validate its persona/horizon pair against the same explicit route matrix used by the intake.
3. If the profile is missing or the pair is not an unlocked B.Tech route, redirect to `step-0-intake.html?path=btech`.
4. On the intake page, detect that query parameter and present the existing modal pattern with a concise explanation that a supported B.Tech route must be selected.
5. Do not add unrelated guards to all downstream pages in this change; the canonical flow reaches them only after the guarded quiz. Existing standalone-page fallback behavior remains otherwise unchanged.

Because these are standalone HTML files with no shared application module, keep the small route predicate in both intake and quiz, using the same plainly named constant and test cases to minimize drift. Do not introduce a new global script solely for this small rule.

## Replacement Question Bank

Update `public/step-1-quiz.html`.

### IQ & Logic: 6 new questions

Replace all current IQ questions with moderate engineering-aptitude items covering a balanced mix of:

1. Number-pattern reasoning.
2. Letter or symbol sequence reasoning.
3. Syllogism/deductive logic.
4. Coding-decoding.
5. Ordering or constraint-based arrangement.
6. Spatial or direction reasoning that can be expressed clearly in text.

Avoid obscure vocabulary, culture-dependent trivia, ambiguous patterns, and questions that require an image not present in the UI.

### Science & Technology: 6 new questions

Replace the current general-knowledge/science bank with Class 11–12-level engineering foundations covering:

1. Mechanics or forces.
2. Electricity and circuits.
3. Energy, heat, or thermodynamics.
4. Chemistry/material properties.
5. Computing or digital technology fundamentals.
6. Renewable energy, environment, or a current engineering application with a stable factual answer.

Use the visible section name **Science & Technology** for every valid B.Tech seeker. Retain the internal `gk` key to avoid an unnecessary migration of `quizAccuracy.gk`.

### Mathematics: 6 new questions

Replace all current mathematics questions with moderate Class 11–12 engineering-entry concepts covering:

1. Algebra.
2. Functions or introductory calculus.
3. Coordinate geometry or trigonometry.
4. Probability.
5. Matrices or vectors.
6. Applied rate, ratio, or optimization reasoning.

Each knowledge question must have:

- a new stable unique ID;
- exactly four plausible options;
- exactly one `correct: true` option;
- mathematically and scientifically verified wording and answer;
- trait weights using the existing trait codes;
- no accidental answer-position pattern across the section.

## Question-Bank Refactor

1. Remove the existing persona-specific `gk` and `math` overrides from `PERSONA_QUESTIONS`.
2. Retain only the persona-specific `sj` arrays there for unlocked Diploma Holder and Job Seeker profiles.
3. Keep one common `iq`, `gk`, and `math` bank in `buildQuestions()`.
4. B.Tech Graduate and M.Tech Passed pathway banks may be removed as unreachable quiz content to avoid maintaining dead alternatives.
5. Keep the existing 12th-pass/default situational bank for regular and integrated B.Tech routes.
6. Preserve `quizScores`, `quizAccuracy`, `quizPersona`, downstream branch scoring, and result-card interfaces.

## Edge Cases

- A user selects an enabled route, changes persona, and submits: the old horizon must be cleared and submission blocked until a new enabled route is selected.
- A saved non-B.Tech profile is loaded through Sign In: fields may be restored, but its locked horizon must not be reselected.
- A user opens the quiz without `cq_state`: redirect to intake rather than defaulting to 12th Pass.
- A user manually changes local storage to an invalid persona/horizon combination: quiz guard redirects.
- A valid integrated or lateral-entry B.Tech profile must pass the guard.
- Locked cards must remain understandable and keyboard-accessible through native disabled semantics and adjacent explanatory copy.
- Question totals and progress must continue to derive from array lengths rather than hard-coded totals.

## Verification

### Static and Syntax Checks

1. Extract embedded scripts from the changed HTML files and run `node --check`.
2. Run `git diff --check`.
3. Verify all 18 replacement IDs are unique.
4. Programmatically assert for every new IQ, science, and mathematics item:
   - four options;
   - exactly one correct option;
   - valid trait keys only.

### Route-Matrix Checks

Exercise every persona/horizon pair:

- Confirm the unlocked matrix above renders enabled and can be selected.
- Confirm every other option renders disabled and cannot mutate `selectedHorizon`.
- Confirm submission accepts each enabled pair and rejects invalid or stale pairs.
- Confirm direct quiz access redirects for missing/invalid profiles and loads for all valid B.Tech pairs.

### Flow Regression

For at least:

1. 12th Pass → 4-year B.Tech;
2. 12th Pass → integrated B.Tech + M.Tech;
3. Diploma Holder → lateral-entry B.Tech;
4. Job Seeker → B.Tech;

verify that the quiz:

- shows the new section titles and questions;
- advances through all five sections;
- calculates the three accuracy cards;
- saves `quizScores`, `quizAccuracy`, and `quizPersona`;
- continues to `step-2-branches.html`.

### Build

Run the repository-prescribed production check:

```sh
pnpm build
```

Do not start another development server; use the already running Figma Make preview for any manual interaction checks.

## Files Expected to Change

- `public/step-0-intake.html`
- `public/step-1-quiz.html`

No database/schema change is required because profile and quiz state remain in the existing `cq_state` local-storage object.
