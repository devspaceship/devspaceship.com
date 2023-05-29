import {
  ChangeEvent,
  MouseEventHandler,
  TouchEventHandler,
  useState,
} from "react";

interface Solver {
  name: string;
  gamma: number;
  threshold: number;
  k: number;
  num_iter: number;
  alpha: number;
  eps_0: number;
  T: number;
}

// TODO Use function of previous value in setter
// TODO Or switch to useReducer
interface GridworldControlProps {
  solver: Solver;
  setSolver: (solver: Solver) => void;
  solve: () => void;
}

const GridworldControl = (props: GridworldControlProps) => {
  const { solver, setSolver, solve } = props;

  interface SolverRadioProps {
    name: string;
    label: string;
  }

  const SolverRadio = (props: SolverRadioProps) => {
    const { name, label } = props;

    return (
      <>
        <label htmlFor={name} className="pr-3">
          {label}
        </label>
        <input
          type="radio"
          name="solver"
          id={name}
          value={name}
          checked={solver.name === name}
          onChange={(e) => setSolver({ ...solver, name: e.target.value })}
        />
      </>
    );
  };

  const [sliderState, setSliderState] = useState({
    policy_value_iter_gamma: 97,
    policy_value_iter_threshold: -5,
    value_iter_k: 7,
    SARSA_Q_N: 10000,
    SARSA_Q_alpha: 3,
    SARSA_Q_eps_0: 100,
    SARSA_Q_T: 350,
  });

  const handle_change = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSliderState({ ...sliderState, [target.id]: parseInt(target.value) });
  };

  const handle_after_change_touch: TouchEventHandler<HTMLInputElement> = (
    event
  ) => {
    const target = event.target as HTMLInputElement;
    handle_after_change(target);
  };

  const handle_after_change_mouse: MouseEventHandler<HTMLInputElement> = (
    event
  ) => {
    const target = event.target as HTMLInputElement;
    handle_after_change(target);
  };

  const handle_after_change = (target: HTMLInputElement) => {
    const value = target.value;
    switch (target.id) {
      case "policy_value_iter_gamma":
        setSolver({
          ...solver,
          gamma: parseFloat(value) / 100,
        });
        break;
      case "policy_value_iter_threshold":
        setSolver({
          ...solver,
          threshold: 10 ** parseInt(value),
        });
        break;
      case "value_iter_k":
        setSolver({
          ...solver,
          k: parseInt(value),
        });
        break;
      case "SARSA_Q_N":
        setSolver({
          ...solver,
          num_iter: parseInt(value),
        });
        break;
      case "SARSA_Q_alpha":
        setSolver({
          ...solver,
          alpha: parseInt(value) / 100,
        });
        break;
      case "SARSA_Q_eps_0":
        setSolver({
          ...solver,
          eps_0: parseInt(value) / 100,
        });
        break;
      case "SARSA_Q_T":
        setSolver({
          ...solver,
          T: parseInt(value),
        });
        break;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        solve();
      }}
    >
      <div className="mb-4 mt-3 flex flex-row justify-evenly">
        <div>
          <SolverRadio name="policy-iteration" label="Policy Iteration" />
        </div>
        <div>
          <SolverRadio name="value-iteration" label="Value Iteration" />
        </div>
        <div>
          <SolverRadio name="sarsa" label="SARSA" />
        </div>
        <div>
          <SolverRadio name="q-learning" label="Q-Learning" />
        </div>
      </div>

      {/* <div md={2} lg={3} className="justify-content-evenly flex flex-row"> */}
      <div className="flex flex-row justify-evenly">
        <div>
          <label className="mr-3" htmlFor="policy_value_iter_gamma">
            Gamma
          </label>
          <input
            type="range"
            min="0"
            max="99"
            value={sliderState.policy_value_iter_gamma}
            id="policy_value_iter_gamma"
            onChange={handle_change}
            onTouchEnd={handle_after_change_touch}
            onMouseUp={handle_after_change_mouse}
          />
          <div>{sliderState.policy_value_iter_gamma / 100}</div>
        </div>
        {solver.name === "policy-iteration" ||
        solver.name === "value-iteration" ? (
          <div>
            <label className="mr-3" htmlFor="policy_value_iter_threshold">
              Threshold
            </label>
            <input
              type="range"
              min="-8"
              max="-2"
              value={sliderState.policy_value_iter_threshold}
              id="policy_value_iter_threshold"
              onChange={handle_change}
              onTouchEnd={handle_after_change_touch}
              onMouseUp={handle_after_change_mouse}
            />
            <div>1e{sliderState.policy_value_iter_threshold}</div>
          </div>
        ) : null}
        {solver.name === "value-iteration" ? (
          <div>
            <label className="mr-3" htmlFor="value_iter_k">
              Evaluations between improvements
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={sliderState.value_iter_k}
              id="value_iter_k"
              onChange={handle_change}
              onTouchEnd={handle_after_change_touch}
              onMouseUp={handle_after_change_mouse}
            />
            <div>{sliderState.value_iter_k}</div>
          </div>
        ) : null}
        {solver.name === "sarsa" || solver.name === "q-learning" ? (
          <>
            <div>
              <label className="mr-3" htmlFor="SARSA_Q_N">
                Number of iterations
              </label>
              <input
                type="range"
                min="4000"
                max="10000"
                value={sliderState.SARSA_Q_N}
                id="SARSA_Q_N"
                onChange={handle_change}
                onTouchEnd={handle_after_change_touch}
                onMouseUp={handle_after_change_mouse}
              />
              <div>{sliderState.SARSA_Q_N}</div>
            </div>
            <div>
              <label className="mr-3" htmlFor="SARSA_Q_alpha">
                Learning Rate
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={sliderState.SARSA_Q_alpha}
                id="SARSA_Q_alpha"
                onChange={handle_change}
                onTouchEnd={handle_after_change_touch}
                onMouseUp={handle_after_change_mouse}
              />
              <div>{sliderState.SARSA_Q_alpha / 100}</div>
            </div>
            <div>
              <label className="mr-3" htmlFor="SARSA_Q_eps_0">
                Epsilon 0
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderState.SARSA_Q_eps_0}
                id="SARSA_Q_eps_0"
                onChange={handle_change}
                onTouchEnd={handle_after_change_touch}
                onMouseUp={handle_after_change_mouse}
              />
              <div>{sliderState.SARSA_Q_eps_0 / 100}</div>
            </div>
            <div>
              <label className="mr-3" htmlFor="SARSA_Q_T">
                Exploration Period
              </label>
              <input
                type="range"
                min="1"
                max="1000"
                value={sliderState.SARSA_Q_T}
                id="SARSA_Q_T"
                onChange={handle_change}
                onTouchEnd={handle_after_change_touch}
                onMouseUp={handle_after_change_mouse}
              />
              <div>{sliderState.SARSA_Q_T}</div>
            </div>
          </>
        ) : null}
      </div>
      <span className="text-bold rounded-full bg-primary-300 px-4 py-2 text-background-950">
        <input type="submit" value="Solve" aria-label="Solve" />
      </span>
    </form>
  );
};

export default GridworldControl;

// TODO Refactor form range into component
