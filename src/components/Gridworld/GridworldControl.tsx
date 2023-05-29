import { ChangeEvent, useContext } from "react";
import { GridworldActionType, GridworldConfig, SolverType } from "./types";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "./GridworldContextProvider";

const SolverRadio = ({
  id,
  label,
  solverType,
}: {
  id: string;
  label: string;
  solverType: SolverType;
}) => {
  const state = useContext(GridworldStateContext);
  const checked = solverType === state.config.solver;
  const dispatch = useContext(GridworldDispatchContext);
  const handleChangeSolver = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: GridworldActionType.SET_SOLVER,
      solver: parseInt(event.target.value) as SolverType,
    });
  };
  return (
    <>
      <input
        type="radio"
        id={id}
        name="solver"
        value={solverType}
        checked={checked}
        aria-checked={checked}
        onChange={handleChangeSolver}
      />
      <label htmlFor={id} className="ml-2 mr-3">
        {label}
      </label>
    </>
  );
};

const ConfigRange = ({
  id,
  label,
  min,
  max,
  step,
  integer = false,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number | "any";
  integer?: boolean;
}) => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);
  const configKey = id.replace(/-(\w)/g, (_, letter: string) =>
    letter.toUpperCase()
  );
  console.log("ConfigRange", id, label, configKey, min, max, step);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = integer
      ? parseInt(event.target.value)
      : parseFloat(event.target.value);
    dispatch({
      type: GridworldActionType.SET_CONFIG,
      config: {
        ...state.config,
        [configKey]: value,
      },
    });
  };
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={state.config[configKey as keyof GridworldConfig]}
        onChange={handleChange}
        className="ml-2 mr-3"
      />
    </>
  );
};

const GridworldControl = () => {
  return (
    <>
      <div>
        <SolverRadio
          id="policy-iteration"
          label="Policy Iteration"
          solverType={SolverType.POLICY_ITERATION}
        />
        <SolverRadio
          id="value-iteration"
          label="Value Iteration"
          solverType={SolverType.VALUE_ITERATION}
        />
        <SolverRadio id="sarsa" label="SARSA" solverType={SolverType.SARSA} />
        <SolverRadio
          id="q-learning"
          label="Q-Learning"
          solverType={SolverType.Q_LEARNING}
        />
      </div>
      <div>
        <ConfigRange
          id="discount-rate"
          label="Discount Rate"
          min={0}
          max={1}
          step={0.01}
        />
        <ConfigRange
          id="log-threshold"
          label="Threshold"
          min={-8}
          max={-3}
          step="any"
          integer
        />
        <ConfigRange
          id="evaluations-before-improvement"
          label="Evaluations Before Improvement"
          min={1}
          max={10}
          step={1}
          integer
        />
        <ConfigRange
          id="iterations"
          label="Iterations"
          min={1}
          max={100_000}
          step={1}
          integer
        />
        <ConfigRange
          id="learning-rate"
          label="Learning Rate"
          min={0}
          max={1}
          step={0.01}
        />
        <ConfigRange
          id="initial-exploration-coefficient"
          label="Initial Exploration Coefficient"
          min={0}
          max={1}
          step={0.01}
        />
        <ConfigRange
          id="exploration-period"
          label="Exploration Period"
          min={0}
          max={1000}
          step={1}
          integer
        />
      </div>
    </>
  );
};

export default GridworldControl;
