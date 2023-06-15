import { useContext } from "react";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";
import { SolverType } from "../types";
import ConfigRange from "./ConfigRange";
import SolverRadio from "./SolverRadio";
import { FPS } from "../config";

const GridworldControl = () => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);

  const handleToggleSolve = () => {
    if (state.solverState.running) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(`clearing interval ${state.solverState.intervalId!}`);
      clearInterval(state.solverState.intervalId);
      dispatch({ type: GridworldActionType.STOP_SOLVING });
      return;
    }
    const intervalId = setInterval(() => {
      dispatch({ type: GridworldActionType.SOLVE_STEP });
    }, 1000 / FPS) as unknown as number;
    console.log(`setting interval ${intervalId}`);
    dispatch({ type: GridworldActionType.START_SOLVING, intervalId });
  };

  return (
    <>
      <div className="mt-4">
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
      <div className="mt-4">
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
      <button
        className="mt-4 rounded-full bg-primary-300 px-3 py-1 text-xl text-background-950"
        onClick={handleToggleSolve}
      >
        {state.solverState.running ? "Stop" : "Solve"}
      </button>
    </>
  );
};

export default GridworldControl;
