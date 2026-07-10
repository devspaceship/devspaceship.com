# madepro v0.2 — requirements from the Gridworld page

What the Gridworld post needs from madepro's stepping API, extracted from the current
TypeScript implementation (`web/src/components/Gridworld/`). This unblocks Phase 3 of
[PLAN.md](./PLAN.md).

## 1. Per-step solver API

The page animates one solver step per frame (15 FPS, `solveStep` in `solvers.ts`).
**"One step" means something different per solver:**

| Solver           | One step =                                                                                   | Terminates when                          |
| ---------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Policy iteration | full policy evaluation to convergence (delta < 1e-5), then one improvement sweep             | policy stable after improvement          |
| Value iteration  | `evaluations_before_improvement` evaluation sweeps (early stop), then one improvement sweep  | policy stable after improvement          |
| SARSA            | one full episode from a random empty start cell, capped at 1000 moves                        | step counter exceeds `episodes`          |
| Q-learning       | same as SARSA with max-Q backup                                                              | step counter exceeds `episodes`          |

Suggested shape — `solve()` becomes the loop over `step()`:

```rust
pub enum StepOutcome {
    Continue,
    Converged, // policy stable / episode budget exhausted
}

pub trait StepSolver<E: Mdp> {
    fn step(&mut self, env: &E, rng: &mut impl Rng) -> StepOutcome;
    // observability — see §2
    fn state_value(&self, state: &E::State) -> f64;
    fn greedy_action(&self, state: &E::State) -> E::Action;
    fn action_value(&self, state: &E::State, action: &E::Action) -> f64;
    fn steps_taken(&self) -> usize;
}
```

## 2. Observable intermediate state

The UI reads, **after every step**:

- **V(s) per cell** — rendered as cell color
- **current greedy policy per cell** — rendered as SVG arrows
- **Q(s, a) for all four actions** — SARSA/Q-learning derive the displayed policy via
  argmax over these (`solvers.ts:128-135`)
- **step counter** — drives both termination and epsilon decay

## 3. Config knobs (bound to UI sliders)

From `GridworldConfig` (`types.ts`) with defaults from `config.ts`:

| Knob                               | Default | Used by                        |
| ---------------------------------- | ------- | ------------------------------ |
| `discount_rate`                    | 0.97    | all solvers                    |
| `evaluations_before_improvement`   | 7       | value iteration                |
| `episodes`                         | 500     | SARSA / Q-learning termination |
| `learning_rate`                    | 0.3     | SARSA / Q-learning             |
| `initial_exploration_coefficient`  | 1.0     | epsilon-greedy                 |
| `exploration_period`               | 300     | epsilon-greedy                 |

Epsilon decay schedule (must match exactly for behavioral parity):

```
epsilon = initial_exploration_coefficient / (1 + step / exploration_period)
```

Convergence threshold for policy evaluation: `1e-5` (`LOG_THRESHOLD = -5`).

## 4. Mutable environment (easy to miss)

Users **draw walls and end cells on the grid mid-session** (`drawingState`). Therefore:

- Constructing a gridworld env from a `Vec<Vec<CellType>>` (EMPTY / WALL / END, default
  grid is 12×8) must be cheap and ergonomic — not one-time setup.
- Handle the degenerate grid gracefully: with **zero empty cells** the current code
  returns a no-op instead of panicking (`chooseEpisodeStart` → `[-1, -1]`,
  `solvers.ts:77-79`). No panics on any user-drawable grid.

## 5. RNG injection

SARSA/Q-learning need randomness (episode starts, epsilon-greedy). Take
`&mut impl Rng` (or a stored seedable RNG) instead of calling `thread_rng()`
internally:

- deterministic tests for free
- cleaner wasm story (no ambient entropy assumptions)

## 6. wasm32 support

- `getrandom` with the `wasm_js` feature (transitively via `rand`)
- add a `wasm32-unknown-unknown` build target to madepro CI
- no `std::time::Instant` or threads in solver code paths

## Parity check

Done when: all four solvers, run step-by-step with the defaults above on the default
12×8 grid, produce the same value/policy evolution as the TS version side by side.
