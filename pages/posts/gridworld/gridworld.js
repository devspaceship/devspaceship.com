import React, { useState, useEffect } from 'react';
import GridworldSvg from './gridworld-svg';
import GridworldControl from './gridworld-control';
import {
  matrix,
  policyIteration,
  valueIteration,
  SARSA,
} from './gridworld-solvers';

export default () => {
  const [gridstate, setGridstate] = useState([
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'T', 'T', 'T', 'A', 'A', 'A'],
    ['A', 'A', 'T', 'T', 'A', 'T', 'A', 'S', 'T', 'T', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'T', 'A', 'A', 'A', 'T', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'T', 'T', 'A', 'A', 'A'],
    ['A', 'T', 'A', 'A', 'A', 'T', 'T', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'T', 'T', 'T', 'T', 'T', 'A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'E'],
  ]);
  // TODO Change variable name from grid to policy
  const [policy, setPolicy] = useState({
    visible: false,
    grid: matrix(8, 12, 'N'),
  });
  const [solver, setSolver] = useState({
    name: 'policy-iteration',
    configs: {
      'policy-iteration': { gamma: 0.97, threshold: 1e-5 },
      'value-iteration': { gamma: 0.97, threshold: 1e-5, k: 7 },
      sarsa: { num_iter: 1e4, alpha: 0.03, gamma: 0.97, eps_0: 1, T: 350 },
      'q-learning': {
        num_iter: 1e4,
        alpha: 0.03,
        gamma: 0.97,
        eps_0: 1,
        T: 350,
      },
    },
  });

  const solve = () => {
    if (solver.name === 'policy-iteration') {
      const { gamma, threshold } = solver.configs['policy-iteration'];
      setPolicy({
        visible: true,
        grid: policyIteration(gridstate, gamma, threshold),
      });
    } else if (solver.name === 'value-iteration') {
      const { gamma, threshold } = solver.configs['value-iteration'];
      setPolicy({
        visible: true,
        grid: valueIteration(gridstate, gamma, threshold),
      });
    } else if (solver.name === 'sarsa') {
      const { num_iter, alpha, gamma, eps_0, T } = solver.configs.sarsa;
      setPolicy({
        visible: true,
        grid: SARSA(gridstate, num_iter, alpha, gamma, eps_0, T),
      });
    }
  };

  useEffect(() => {
    setPolicy((p) => {
      return { ...p, visible: false };
    });
  }, [gridstate]);

  return (
    <div>
      <GridworldSvg
        gridstate={gridstate}
        setGridstate={setGridstate}
        policy={policy}
      />
      <GridworldControl solver={solver} setSolver={setSolver} solve={solve} />
    </div>
  );
};

// TODO Replace all [[0] for j in range(M)] for i in range(N) by matrix(n,m,0) in md file
