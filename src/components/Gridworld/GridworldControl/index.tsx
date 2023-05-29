import { useContext } from "react";
import { SolverType } from "../types";
import { GridworldStateContext } from "../GridworldContextProvider";
import SolverRadio from "./SolverRadio";
import ConfigRange from "./ConfigRange";

const GridworldControl = () => {
  const state = useContext(GridworldStateContext);
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
        {[SolverType.POLICY_ITERATION, SolverType.VALUE_ITERATION].includes(
          state.config.solver
        ) && (
          <>
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
          </>
        )}
        {state.config.solver === SolverType.VALUE_ITERATION && (
          <ConfigRange
            id="evaluations-before-improvement"
            label="Evaluations Before Improvement"
            min={1}
            max={10}
            step={1}
            integer
          />
        )}
        {[SolverType.SARSA, SolverType.Q_LEARNING].includes(
          state.config.solver
        ) && (
          <>
            <ConfigRange
              id="episodes"
              label="Episodes"
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
          </>
        )}
      </div>
    </>
  );
};

export default GridworldControl;
