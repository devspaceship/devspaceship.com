/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import _ from "lodash";
import type { Action, GridState, Policy, QTable } from "./types";

const ACTIONS: Action[] = ["N", "E", "S", "W"];

// a <= x <= b
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
// n rows * m columns
const matrix: <T>(n: number, m: number, v: T) => T[][] = (n, m, v) =>
  new Array(n).fill(null).map(() => new Array(m).fill(v));
const is_stable = (p1: Policy, p2: Policy) =>
  JSON.stringify(p1) === JSON.stringify(p2);

const transition = (
  gridstate: GridState,
  i: number,
  j: number,
  action: Action
) => {
  const state = gridstate[i][j];
  if (state === "E" || state === "T") {
    return [i, j, 0];
  }
  const n = gridstate.length;
  const m = gridstate[0].length;
  const di = { N: -1, E: 0, S: 1, W: 0 };
  const dj = { N: 0, E: 1, S: 0, W: -1 };
  const i_ = clamp(i + di[action], 0, n - 1);
  const j_ = clamp(j + dj[action], 0, m - 1);
  const newState = gridstate[i_][j_];
  switch (newState) {
    case "T":
      return [i_, j_, -100];
    case "E":
      return [i_, j_, 100];
    default:
      return [i_, j_, -1];
  }
};

const policyEvaluation = (
  gridstate: GridState,
  policy: Policy,
  gamma = 0.97,
  threshold = 1e-5,
  VInit: number[][] | null = null
): number[][] => {
  const n = policy.length;
  const m = policy[0].length;

  let VOld, VNew;
  if (VInit !== null) {
    VOld = _.cloneDeep(VInit);
    VNew = _.cloneDeep(VInit);
  } else {
    VOld = matrix(n, m, 0);
    VNew = matrix(n, m, 0);
  }

  while (true) {
    let delta = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const [i_, j_, r] = transition(gridstate, i, j, policy[i][j]);
        VNew[i][j] = r + gamma * VOld[i_][j_];
        delta = Math.max(delta, Math.abs(VNew[i][j] - VOld[i][j]));
      }
    }

    if (delta < threshold) {
      return VNew;
    }

    VOld = _.cloneDeep(VNew);
  }
};

const policyImprovement = (
  gridstate: GridState,
  V: number[][],
  gamma: number
): Policy => {
  const n = V.length;
  const m = V[0].length;

  const policy: Policy = matrix(n, m, "N");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let best = -Infinity;
      let bestAction: Action = "N";

      for (const action of ACTIONS) {
        const [i_, j_, r] = transition(gridstate, i, j, action);
        const reward = r + gamma * V[i_][j_];
        if (reward > best) {
          best = reward;
          bestAction = action;
        }
      }

      policy[i][j] = bestAction;
    }
  }

  return policy;
};

const policyIteration = (
  gridstate: GridState,
  gamma = 0.97,
  threshold = 1e-5
) => {
  const n = gridstate.length;
  const m = gridstate[0].length;
  let V = matrix(n, m, 0);
  let pi: Policy = matrix(n, m, "N");
  let newPi;

  while (true) {
    V = policyEvaluation(gridstate, pi, gamma, threshold, V);
    newPi = policyImprovement(gridstate, V, gamma);
    if (is_stable(pi, newPi)) {
      break;
    }
    pi = newPi;
  }

  return newPi;
};

const valueIteration = (
  gridstate: GridState,
  gamma = 0.97,
  threshold = 1e-5
) => {
  const n = gridstate.length;
  const m = gridstate[0].length;
  const V_new = matrix(n, m, 0);
  let V_old = matrix(n, m, 0);

  while (true) {
    let delta = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let best = -Infinity;

        for (const action of ACTIONS) {
          const [i_, j_, r] = transition(gridstate, i, j, action);
          const v = r + gamma * V_old[i_][j_];
          if (v > best) {
            best = v;
          }
        }

        V_new[i][j] = best;
        delta = Math.max(delta, Math.abs(V_new[i][j] - V_old[i][j]));
      }
    }

    if (delta < threshold) {
      break;
    }
    V_old = _.cloneDeep(V_new);
  }

  return policyImprovement(gridstate, V_new, gamma);
};

const random_choice = (choices: Action[]) =>
  choices[Math.floor(Math.random() * choices.length)];

const epsilon_greedy_policy = (
  pi: Policy,
  i: number,
  j: number,
  eps_0: number,
  T: number,
  t: number
): Action => {
  const eps = eps_0 / (1 + t / T);
  return Math.random() < eps ? random_choice(ACTIONS) : pi[i][j];
};

const random_policy = (n: number, m: number) => {
  const pi: Policy = matrix(n, m, "N");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      pi[i][j] = epsilon_greedy_policy(pi, i, j, 1, 1, 0);
    }
  }
  return pi;
};

const random_valid_state = (gridstate: GridState) => {
  const n = gridstate.length;
  const m = gridstate[0].length;
  return [Math.floor(Math.random() * n), Math.floor(Math.random() * m)];
};

const init_Q = (n: number, m: number): QTable => {
  const Q: QTable = matrix(n, m, { N: 0, E: 0, S: 0, W: 0 });
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      Q[i][j] = { N: 0, E: 0, S: 0, W: 0 };
    }
  }
  return Q;
};

const Q_to_policy = (Q: QTable): Policy => {
  const n = Q.length;
  const m = Q[0].length;
  const pi: Policy = matrix(n, m, "N");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const q = Q[i][j];
      let best_action: Action = "N";
      let best_q = q[best_action];
      const remaining_actions: Action[] = ["E", "S", "W"];
      for (const action of remaining_actions) {
        if (q[action] > best_q) {
          best_action = action;
          best_q = q[action];
        }
      }
      pi[i][j] = best_action;
    }
  }
  return pi;
};

const SARSA_Q = (
  gridstate: GridState,
  num_iter: number,
  alpha: number,
  gamma: number,
  eps_0: number,
  T: number,
  Q_mode = false
) => {
  const n = gridstate.length;
  const m = gridstate[0].length;
  const Q = init_Q(n, m);
  let pi = random_policy(n, m);

  for (let t = 0; t < num_iter; t++) {
    let [i, j] = random_valid_state(gridstate);
    let a = epsilon_greedy_policy(pi, i, j, eps_0, T, t);
    let counter = 0;
    while (true) {
      counter += 1;
      const [i_, j_, r] = transition(gridstate, i, j, a);
      const a_ = epsilon_greedy_policy(pi, i_, j_, eps_0, T, t);

      if (Q_mode) {
        Q[i][j][a] =
          (1 - alpha) * Q[i][j][a] +
          alpha * (r + gamma * Math.max(...ACTIONS.map((a) => Q[i_][j_][a])));
      } else {
        Q[i][j][a] =
          (1 - alpha) * Q[i][j][a] + alpha * (r + gamma * Q[i_][j_][a_]);
      }

      [i, j, a] = [i_, j_, a_];
      if (["E", "T"].includes(gridstate[i][j]) || counter > 500) {
        break;
      }
    }
    pi = Q_to_policy(Q);
  }

  return pi;
};

export { matrix, policyIteration, valueIteration, SARSA_Q };