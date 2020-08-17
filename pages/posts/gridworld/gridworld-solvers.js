import _ from 'lodash';
// const _ = require('lodash');

// a <= x <= b
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
// n rows * m columns
const matrix = (n, m, v) =>
  new Array(n).fill(null).map(() => new Array(m).fill(v));
const isStable = (p1, p2) => JSON.stringify(p1) === JSON.stringify(p2);

const transition = (gridstate, i, j, action) => {
  const state = gridstate[i][j];
  if (state === 'E' || state === 'T') {
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
    case 'T':
      return [i_, j_, -100];
    case 'E':
      return [i_, j_, 100];
    default:
      return [i_, j_, -1];
  }
};

const policyEvaluation = (
  gridstate,
  policy,
  gamma = 0.97,
  threshold = 1e-5,
  VInit = null
) => {
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

const policyImprovement = (gridstate, V, gamma) => {
  const n = V.length;
  const m = V[0].length;

  const policy = matrix(n, m, 0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let best = -Infinity;
      let bestAction = '';

      for (const action of ['N', 'E', 'S', 'W']) {
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

const policyIteration = (gridstate, gamma = 0.97, threshold = 1e-5) => {
  const n = gridstate.length;
  const m = gridstate[0].length;
  let V = matrix(n, m, 0);
  let pi = matrix(n, m, 'N');
  let newPi;

  while (true) {
    V = policyEvaluation(gridstate, pi, gamma, threshold, V);
    newPi = policyImprovement(gridstate, V, gamma);
    if (isStable(pi, newPi)) {
      break;
    }
    pi = newPi;
  }

  return newPi;
};

export { policyIteration, matrix };
