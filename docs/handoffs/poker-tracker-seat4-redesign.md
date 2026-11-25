---
artifact_contract: "ce-handoff/v1"
created_at: "2026-11-25T17:18:27Z"
title: "Poker Tracker Redesign (Option B Quiet Studio Rail) & Design-Polish Skills"
summary: "Integrated a quieted version of Option B (Live From Seat 4) into the React/MUI/Firebase Poker Tracker app and identified design-polish skills (Impeccable, Vercel, Anthropic) for optional further polish."
keywords: ["pokertracker", "redesign", "seat-4", "ui-polish", "impeccable", "creativity"]
cwd: "/Users/philip/.gemini/antigravity/worktrees/pokertracker/poker_next_summary"
resume_focus: "Review the quieted Poker Tracker redesign, optionally install Impeccable or other design-polish skills for a further polish pass, and commit/ship when ready."
repository: "stedwick/pokertracker"
repo_root_sha: "0d10d55e1cd847aa287ce8439c7a603323c9ccec"
branch: "poker_next_summary"
head: "9b2e58407fe7ba5b0265c7fadcfe3d5e5aa62e78"
worktree_path: "/Users/philip/.gemini/antigravity/worktrees/pokertracker/poker_next_summary"
---

## Objective & User Intent

- **User request 1 (completed):** Ran a non-interactive `/creativity` run producing 3 distinct Poker Tracker redesign directions (3 judged drafts each = 9 builds), inspired by independent poker pros' websites and playing-card studios.
- **User decision:** User selected **Option B · Medium (*Live From Seat 4*)** and asked to mesh its design/spirit into the real React + MUI + Firebase app while preserving the original app's spirit, copy, structure, and functionality.
- **User feedback & latest intent (completed + open follow-up):** After inspecting the first React integration, the user said *"It's very loud. I want you to clean it up. Things like Seat 4 and ON AIR Portland Meadows and RAILBIRD BLUR, etc. Way too much text going on. It's hard for a human eye to see what the hell is going on."* They also invoked `/find-skills` asking for design-polish skills like **Impeccable**. The quiet cleanup is built and verified, and 3 verified skills were presented; the user has not yet inspected the quiet build or decided whether to install Impeccable / polish further / commit.

## Work Completed (All Uncommitted in Current Worktree)

### 1. Creative Exploration (gitignored, machine-local)
- Full `/creativity` run stored in machine-local gitignored directory `/Users/philip/.gemini/antigravity/worktrees/pokertracker/poker_next_summary/creativity-runs/poker-tracker-redesign/`:
  - `research.md`, `board/contact-sheet.html` (15 real captures of poker pros, indie poker trackers, and card studios)
  - `directions.md`, `a/draft-{1..3}/` (*In Position*, final 7.9), `b/draft-{1..3}/` (*Live From Seat 4*, final 7.2), `c/draft-{1..3}/` (*The Cage*, final 7.4), and `storyboard.html`.

### 2. Real React App Integration + Quiet Cleanup (in repo, uncommitted)
- `.gitignore`: Added `creativity-runs/` so exploration artifacts never enter git.
- `public/index.html`: Loaded `Space Grotesk` and `IBM Plex Mono` fonts; set `theme-color` to `#0A0B0D`.
- `src/assets/studio-rail.jpg`: Generated moody dark stitched-leather poker rail & steel dealer-button hero photo bundled by Webpack (also copied to `public/images/studio-rail.jpg` — note `public/images/` is now unused and can be deleted during cleanup).
- `src/seat4.css`: Quiet Studio Rail theme tokens for **Night Studio** (dark default, `#0A0B0D`) and **Sunlit Pit** (light, `#EAE3D7`), responsive layout, smoked-glass Big Blind privacy blur, and `prefers-reduced-motion`.
- `src/utils/ThemeSwitcher.js`: Upgraded MUI dark/light themes to match Night Studio & Sunlit Pit, synced `document.documentElement.dataset.theme`, kept `window.toggleTheme`, and added `Seat4UiContext` (`themeMode`, `toggleTheme`, `railbirdBlur`, `toggleRailbirdBlur`).
- `src/utils/pokerStats.js`: Pure helpers (`parseBigBlind`, `calcDurationHours`, `formatElapsedClock`, `formatSignedDollars`, `formatSignedBB`, `computeRoomSummaries`).
- `src/layout/PokerAppBar.js` & `src/utils/PokerUser.js`: Stripped loud text badges down to a quiet single-row header: spade mark + `Poker Tracker`, Eye icon (BB privacy toggle), Sun/Moon icon (light/dark), `Sign in`, and Menu (guests can now open `PokerMenu` for Light/Dark and CSV export; `Logout` in `src/utils/PokerMenu.js` only renders when signed in).
- `src/Poker/PnlCard.js`: Full-bleed studio-rail hero with calm `Bankroll` + tabular balance + inline edit pencil (`BankrollPopover` + Firestore `updateBankroll` preserved), single quiet summary line (`+$161 · +$7.65/hr · 21.0h`), and calm live session card (1-second elapsed clock, `in for $420`, `+$100` rebuy, inline `Cash out` wired to `crud.update`).
- `src/Poker/PokerLineChart.js` & `src/Poker/PokerBarChart.js`: Kept Recharts + `LTTB` downsampling inside quiet dark-glass cards (`Profit over time` and `Recent sessions`), dashed orange `$0` breakeven line, hover tooltips, and dynamic BB scaling in privacy mode.
- `src/Poker/PokerSessions.js`, `src/Poker/PokerSession.js`, `src/App.js`, `src/layout/userState.js`: Kept `InfiniteScroll`, `autofill`, `currentKey`, `PokerSessionForm`, `ConfirmDeleteSessionDialog`, Firebase Auth/Firestore sync, exact `DemoData.js` data, and exact empty state (`♣♥♠♦` / *"No sessions. Shouldn't you be out playing poker?"*). Removed the noisy 5-card Rooms wall and top demo banner; moved the demo notice back to a single quiet footer line.

### 3. Design-Polish Skills Discovered (`/find-skills`)
- `pbakaus/impeccable` (Paul Bakaus, 70K+ GitHub stars; `/quieter`, `/distill`, `/polish`, `/critique`, `/audit`, `npx impeccable detect src/`)
- `vercel-labs/agent-skills@web-design-guidelines` (100K+ installs)
- `anthropics/skills@frontend-design` (100K+ installs)

## Decisions, Constraints & Rejected Alternatives

- **User-driven:** Chose Option B (*Live From Seat 4*) over Option A (*In Position*) and Option C (*The Cage*); rejected loud broadcast badges (`SEAT 4`, `ON AIR`, `RAILBIRD BLUR`, 4-box stat grid, 5-card Rooms wall) in favor of calm scannability.
- **Agent calls / technical constraints:**
  - CRA 5 / Webpack 5 failed to resolve `url("/images/studio-rail.jpg")` in `src/seat4.css`, so the hero image was moved to `src/assets/studio-rail.jpg` and referenced as `url("./assets/studio-rail.jpg")`.
  - Dependencies were installed with `npm install --legacy-peer-deps` (modified `package-lock.json` slightly).
  - User global rules: use `portless` for dev servers, use GitButler (`but`) for git write commands, prefer simplest solution.

## Current State & Fragile Local State

- **Git / Worktree:** All changes are **uncommitted** on branch `poker_next_summary` (at `HEAD` `9b2e584`, same base commit as `main` and `orca/poker-next`) in linked worktree `/Users/philip/.gemini/antigravity/worktrees/pokertracker/poker_next_summary` (machine-local). Note: `git` commands need `BypassSandbox: true` in this worktree because `.git` points to `/Users/philip/src/pokertracker/.git/worktrees/poker_next_summary`.
- **Servers stopped on restart:** Both `portless` background servers (`https://pokertracker.dev` serving `build/` and `https://poker-redesign.dev` serving `creativity-runs/poker-tracker-redesign/`) were stopped by a server restart. Restart `portless pokertracker` (serving `build/` or `npm start`) before asking the user to inspect in the browser.
- **Minor cleanup item:** `public/images/studio-rail.jpg` is an unused duplicate of `src/assets/studio-rail.jpg`; `src/utils/PokerMenu.js` has 2 pre-existing unused-var ESLint warnings (`useState`, `CSVDownload`).

## Verification Performed

- `npm run build` exited `0` after the quiet cleanup (`main.76dd8531.js`, `main.b3edfb6e.css`, zero errors).
- Visually verified rendered screenshots of the quiet React build at desktop (`1440×900`, `1068px` full height) and phone (`390×844`) — saved at machine-local `/Users/philip/.gemini/antigravity/worktrees/pokertracker/poker_next_summary/creativity-runs/poker-tracker-redesign/react-verify-quiet/`.
- Not yet tested against a live Firebase Google sign-in session (tested in demo mode only).

## Plausible Next Steps

1. **Restart the live preview & inspect with the user:** Restart `portless pokertracker` serving `build/` (or `npm start`), let the user inspect the quieted build at `https://pokertracker.dev`, and adjust any remaining visual rough edges.
2. **Optional skill install & polish pass:** If the user confirms, install `pbakaus/impeccable` globally (`npx skills add pbakaus/impeccable -g -y`) and run a `/polish` / `/quieter` audit on `src/`.
3. **Cleanup & commit:** Remove unused `public/images/`, optionally clean `PokerMenu.js` unused imports, run `npm run build`, and commit via GitButler (`but`).
