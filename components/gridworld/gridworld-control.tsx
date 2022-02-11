import React from 'react';

interface PolicyIterationConfig {
  gamma: number;
  threshold: number;
}

interface ValueIterationConfig extends PolicyIterationConfig {
  k: number;
}

interface SarsaQLearningConfig {
  num_iter: number;
  alpha: number;
  gamma: number;
  eps_0: number;
  T: number;
}

interface Solver {
  name: string;
  configs: {
    'policy-iteration': PolicyIterationConfig;
    'value-iteration': ValueIterationConfig;
    sarsa: SarsaQLearningConfig;
    'q-learning': SarsaQLearningConfig;
  };
}

interface GridWorldControlProps {
  solver: Solver;
  setSolver: (solver: Solver) => void;
  solve: () => void;
}

const GridWorldControl = (props: GridWorldControlProps) => {
  const { solver, setSolver, solve } = props;

  interface SolverRadioProps {
    name: string;
    label: string;
  }

  const SolverRadio = (props: SolverRadioProps) => {
    const { name, label } = props;

    return (
      <span className="solver-radio">
        <input
          type="radio"
          name="solver"
          id={name}
          value={name}
          aria-label={label}
          checked={solver.name === name}
          onChange={(e) => setSolver({ ...solver, name: e.target.value })}
        />
        <label htmlFor={name}>{label}</label>
      </span>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        solve();
      }}
    >
      <div id="solver-selection-wrapper">
        <SolverRadio name="policy-iteration" label="Policy Iteration" />
        <SolverRadio name="value-iteration" label="Value Iteration" />
        <SolverRadio name="sarsa" label="SARSA" />
        <SolverRadio name="q-learning" label="Q-Learning" />
      </div>
      <input type="submit" value="Solve" aria-label="Solve" />
    </form>
  );
};

export default GridWorldControl;
