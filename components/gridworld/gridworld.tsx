import React, { useEffect, useState } from 'react';
import GridworldControl from './gridworld-control';
import {
  matrix,
  policyIteration,
  SARSA_Q,
  valueIteration,
} from './gridworld-solvers';
import GridWorldSVG from './gridworld-svg';
import { GridState, PolicyWrapper } from './types';

const GridWorld = () => {
  const [gridstate, setGridstate] = useState<GridState>([
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'T', 'T', 'T', 'A', 'A', 'A'],
    ['A', 'A', 'T', 'T', 'A', 'T', 'A', 'S', 'T', 'T', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'T', 'A', 'A', 'A', 'T', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'T', 'T', 'A', 'A', 'A'],
    ['A', 'T', 'A', 'A', 'A', 'T', 'T', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'T', 'T', 'T', 'T', 'T', 'A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'E'],
  ]);
  const [policy, setPolicy] = useState<PolicyWrapper>({
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
        grid: SARSA_Q(gridstate, num_iter, alpha, gamma, eps_0, T),
      });
    } else if (solver.name === 'q-learning') {
      const { num_iter, alpha, gamma, eps_0, T } = solver.configs['q-learning'];
      setPolicy({
        visible: true,
        grid: SARSA_Q(gridstate, num_iter, alpha, gamma, eps_0, T, true),
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
      <GridWorldSVG
        gridstate={gridstate}
        setGridstate={setGridstate}
        policy={policy}
      />
      <GridworldControl solver={solver} setSolver={setSolver} solve={solve} />
    </div>
  );
};

export default GridWorld;

// TODO Replace ps part of post with link to js code
// TODO Replace all [[0] for j in range(M)] for i in range(N) by matrix(n,m,0) in md file
// TODO Add hyperparameters controls and fine tune them
