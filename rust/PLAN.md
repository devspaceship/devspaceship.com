# Rust Migration Plan — devspaceship.com

Rewrite of the Next.js site (`web/`) as a Leptos + Axum application living in this
directory, built incrementally alongside the existing site until parity, then cut over.

## Stack decision

| Concern            | Choice                                     | Why                                                                                         |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Framework          | **Leptos** (0.8 stable; 0.9 is alpha)      | Best SSR/hydration in Rust, fine-grained reactivity, islands keep WASM tiny for a blog      |
| Server             | **Axum** (via `leptos_axum`)               | robots/sitemap/headers as plain handlers; already the default cargo-leptos integration      |
| Rendering mode     | **SSR + islands**                          | Prose pages ship ~0 WASM; only Gridworld/Tesseract/graphs hydrate                           |
| Styling            | **Tailwind v4** (unchanged)                | cargo-leptos has first-class Tailwind support (`tailwind-input-file` in metadata)           |
| MDP logic          | **madepro** (own crate)                    | Already implements policy iteration, value iteration, SARSA, Q-learning + gridworld env    |
| Markdown           | **New open-source crate** (see Phase 2)    | No MDX equivalent in Rust — this is the gap worth publishing a crate for                    |
| Math               | Server-rendered KaTeX → **MathML output**  | Fixes the CSP inline-style problem for real (see Phase 2 notes)                             |
| Syntax highlighting| **syntect** at render time                 | Replaces highlight.js — no client JS, no CDN assets                                         |
| 3D                 | **Raw WebGL2** via `web-sys` + GLSL        | Deliberate: the point is learning shaders                                                   |

Dioxus was considered (future mobile apps) but rejected for this site: web-only,
SEO-heavy, and the interest is fine-grained reactivity. The framework-agnostic work here
(madepro, markdown crate, shaders, wasm-bindgen) transfers to a future Dioxus app anyway.

## Target layout

```
rust/
├── Cargo.toml            # workspace
├── site/                 # the Leptos app (bin, SSR + hydrate features)
│   ├── src/
│   │   ├── main.rs       # Axum server: leptos routes + robots/sitemap/headers
│   │   ├── app.rs        # Router, shell, <head> via leptos_meta
│   │   ├── layout.rs     # NavBar, SocialLinks, theme toggle, footer
│   │   ├── pages/        # home, posts index, beataptic, not_found
│   │   ├── posts/        # one module per post (gridworld, elevator, tesseract, bluesky)
│   │   └── islands/      # gridworld/, tesseract/, graphs/
│   ├── style/main.css    # Tailwind v4 entry
│   └── public/           # copied from web/public (OG images, CSVs, favicon)
└── PLAN.md
```

The markdown crate and any madepro changes live in their own repos; this workspace
depends on them from crates.io (path/git deps while iterating).

---

## Phase 0 — Scaffold (one evening)

1. `cargo install cargo-leptos`, then `cargo leptos new` (Axum template) into `rust/site`,
   wrapped in a workspace `rust/Cargo.toml`.
2. Wire Tailwind v4: point `tailwind-input-file` at `style/main.css`, port
   `web/src/app/globals.css` (theme variables, typography tweaks).
3. Dev server on **port 4201** so both sites run side by side. Add justfile recipes:
   `just rust-dev` (`cargo leptos watch`), `just rust-build`.
4. Copy `web/public/` assets into `site/public/`.

**Done when:** a hello-world page serves on :4201 with Tailwind classes applied.

## Phase 1 — Static shell (1–2 weekends)

Port everything that has no interactivity. All plain SSR components, no islands.

1. `layout.rs`: NavBar, SocialLinks, ProfilePicture, footer. Icons via the `icondata`
   crate (covers both FontAwesome and Lucide sets).
2. Theme toggle (replaces next-themes): a small island or inline script that reads
   `localStorage` and toggles a class on `<html>`. If inline script: give it a CSP nonce
   via Leptos's `use_nonce()` support — do not reintroduce `'unsafe-inline'`.
3. Pages: home (`app/page.tsx`), posts index (`app/posts/page.tsx`),
   beataptic (pure static — direct port), custom 404.
4. Axum handlers for `/robots.txt` and `/sitemap.xml` (ports of `robots.ts`/`sitemap.ts`).
5. Security headers as Axum middleware (`tower-http::SetResponseHeader`): port the CSP,
   X-Frame-Options, nosniff, referrer-policy from the Next config. Target a *stricter*
   CSP than today — that's a migration win to verify at cutover.
6. Meta/OG tags via `leptos_meta` (`<Title>`, `<Meta>`); reuse the existing OG/twitter
   images as static assets served by route convention or explicit meta tags.

**Done when:** home, posts index, beataptic, and 404 are pixel-comparable to prod.

## Phase 2 — Markdown crate (the open-source one) (2–3 weekends)

The MDX replacement. Scope it as **markdown + typed component slots**, not "MDX in Rust"
(no arbitrary inline code — that's what made MDX heavy in the first place).

Suggested design:

- Parse with **comrak** (CommonMark + GFM, footnotes, etc.).
- **Frontmatter** (title/summary/tags/date) parsed into a struct — replaces the
  `export const meta` pattern in the current `.mdx` files.
- **Component slots**: a directive syntax (e.g. `:::component{name="Gridworld"}` or
  MDX-style `<Gridworld />` tags) that splits the document into segments. The crate
  returns `Vec<Segment>` where `Segment = Html(String) | Component(name, attrs)`;
  the Leptos side maps `Component` names to actual islands. This keeps the crate
  framework-agnostic (usable from Dioxus later — good for adoption too).
- **Math**: detect `$...$` / `$$...$$`, render server-side with the `katex` crate using
  **MathML output** (`output: mathml`). This is the actual fix for the CSP issue:
  KaTeX's HTML output carries inline `style=""` attributes even when server-rendered,
  which still requires `style-src 'unsafe-inline'`. MathML Core output has none, is
  supported by all evergreen browsers, and needs no KaTeX CSS or fonts at all.
- **Code blocks**: syntect with a theme matching the current highlight.js one, emitting
  classed spans (one small static CSS file, works with light/dark).
- **Heading slugs + autolinks** (comrak has header-ID support; autolink anchors are a
  small post-processing pass) — replaces rehype-slug/rehype-autolink-headings.

Decision to make early: **build-time vs request-time rendering.** With 4 posts,
rendering at build via `build.rs` or `include_str!` + `LazyLock` is simplest and fastest;
request-time adds nothing here.

**Done when:** `bluesky.mdx` (pure prose + math, no components) renders through the
crate as the first migrated post.

## Phase 3 — Gridworld island with madepro (2 weekends)

1. Audit madepro 0.1.0 against what the page needs. The site animates **one solver step
   per tick** (`solveStep` in `Gridworld/solvers.ts`, driven by an interval) and renders
   intermediate state values/policies. If madepro's solvers only run to convergence,
   add a stepping API first (madepro 0.2): e.g. a `Solver` trait with
   `fn step(&mut self, mdp: &M) -> StepOutcome` exposing state values + current policy,
   with `solve()` as the loop over it. Also expose the knobs the UI has: discount rate,
   learning rate, exploration coefficient/period, evaluations-before-improvement.
2. WASM compatibility: SARSA/Q-learning need randomness — ensure `rand`/`getrandom`
   work in wasm32 (`getrandom` `wasm_js` feature). Add a wasm32 CI target to madepro.
3. Build the island: `#[island] fn Gridworld()` holding a `RwSignal<GridworldState>`
   wrapping madepro types. Interval via `leptos_use::use_interval_fn` or
   `set_interval` from leptos. Per-cell rendering (`GridworldCell`, `PolicyArrow` as
   SVG) reads derived signals — fine-grained updates replace the reducer + context +
   `structuredClone` pattern outright.
4. Controls: sliders/radio replace the Radix ones. Hand-roll (styled
   `<input type="range">` + radio group, ~the only Radix usage in the repo) rather than
   pulling in a component library for two widgets.
5. Port the gridworld post prose through the markdown crate with
   `<Gridworld />` as a component slot.

**Done when:** all four solvers animate correctly and match the TS behavior side by side.

## Phase 4 — Elevator post: graphs (1 weekend)

Current: two Recharts line charts (`Motion`, `EarthDensity`) fed by CSVs fetched with
TanStack Query + papaparse.

1. Parse CSVs server-side with the `csv` crate — at build time (they're static files in
   `public/static/posts/elevator/`). Kills the client fetch, papaparse, and TanStack
   Query equivalents entirely; the data is just embedded.
2. Charts: hand-rolled SVG line charts as Leptos components (axes, path from data,
   ~150 lines). Interactive tooltips are the only part needing an island; decide whether
   they're worth keeping — if yes, one small hover-tracking island; if no, the whole
   post ships zero WASM. (`leptos-chartistry` is the fallback if hand-rolling grates.)

**Done when:** elevator post renders both charts from the same CSVs, no client fetch.

## Phase 5 — Tesseract: WebGL2 + shaders (2–3 weekends, the fun one)

1. Port `Tesseract/utils.ts` math (4D rotation, projection) to Rust **including its
   existing tests** (`utils.test.ts` → `#[cfg(test)]`).
2. Island that grabs a `<canvas>`, gets a `WebGl2RenderingContext` via `web-sys`, and
   renders with hand-written GLSL. Learning path: start by doing rotation/projection on
   the CPU per frame and only uploading vertices (parity with the three.js version),
   then move the 4D→3D→2D pipeline into the vertex shader as the actual shader exercise.
3. `request_animation_frame` loop (`leptos_use::use_raf_fn` handles cleanup).
4. Drop `three`, `@react-three/fiber`, `@types/three` from the bundle-size ledger.

**Done when:** the tesseract spins on the post page with your own shaders.

## Phase 6 — Remaining posts + parity sweep (1 weekend)

1. Migrate gridworld/elevator/tesseract prose through the markdown crate (bluesky done
   in Phase 2), wiring their islands via component slots.
2. Parity checklist against prod: every route, meta/OG tags (validate with a link
   preview checker), sitemap/robots diff, Lighthouse + WASM size per page,
   CSP with zero `unsafe-*` (verify KaTeX-as-MathML holds), theme toggle,
   keyboard/a11y on the hand-rolled controls.
3. Port the two remaining test suites' spirit: `lib/utils` equivalents and component
   tests where they pay for themselves (Rust unit tests + `wasm-bindgen-test` for
   islands if warranted).

## Phase 7 — Cutover

1. Dockerfile for the Leptos site (multi-stage: `cargo leptos build --release`, distroless
   or debian-slim runtime); swap into `compose.yaml` behind the same port mapping.
2. Update justfile (`just dev` → rust site), CI (fmt/clippy/test + wasm build), README.
3. Deploy to a staging URL, run the Phase 6 checklist against it, then switch DNS/proxy.
4. Keep `web/` for one release tag, then delete it. 🦀

---

## Effort summary

| Phase                    | Estimate      |
| ------------------------ | ------------- |
| 0 Scaffold               | 1 evening     |
| 1 Static shell           | 1–2 weekends  |
| 2 Markdown crate         | 2–3 weekends  |
| 3 Gridworld + madepro    | 2 weekends    |
| 4 Graphs                 | 1 weekend     |
| 5 Tesseract WebGL        | 2–3 weekends  |
| 6 Parity sweep           | 1 weekend     |
| 7 Cutover                | 1 evening     |

~10 side-project weekends for full parity, with three reusable artifacts along the way:
madepro 0.2 (stepping API + wasm support), the markdown-with-component-slots crate, and
a WebGL shader you wrote yourself.

## Risks / open questions

- **Leptos 0.9** is in alpha; start on 0.8 and don't chase the alpha mid-migration.
- **madepro API shape**: the stepping/observability API is the one true blocker for
  Phase 3 — design it in madepro's repo first, before building the island.
- **MathML rendering fidelity**: eyeball the heaviest formulas early (elevator post);
  if MathML Core typography disappoints, fallback is KaTeX HTML output + hashing the
  inline styles into the CSP (`style-src-attr`), which is uglier but workable.
- **Compile times**: expect seconds-per-change instead of Fast Refresh; `cargo leptos
  watch` + incremental builds keep it tolerable at this codebase size, but it's real.
