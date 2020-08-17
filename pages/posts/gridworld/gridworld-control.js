import React from 'react';

export default (props) => {
  const { solver, setSolver, solve } = props;

  const SolverRadio = (props) => {
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
        <SolverRadio
          name="policy-iteration"
          label="Policy Iteration"
        />
        <SolverRadio
          name="value-iteration"
          label="Value Iteration"
        />
        <SolverRadio
          name="sarsa"
          label="SARSA"
        />
        <SolverRadio
          name="q-learning"
          label="Q-Learning"
        />
      </div>
      <input type="submit" value="Solve" aria-label="Solve" />
    </form>
  );
};
