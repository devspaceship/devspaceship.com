import React, { useState, useEffect } from 'react';
import GridworldSvg from './gridworld-svg';
import GridworldControl from './gridworld-control';
import { matrix, policyIteration, valueIteration } from './gridworld-solvers';

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
      sarsa: {},
      'q-learning': {},
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
