import { ChangeEvent, useContext } from "react";
import { GridworldActionType, SolverType } from "./types";
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
  console.log(`solverType: ${solverType}, checked: ${checked.toString()}`);
  const dispatch = useContext(GridworldDispatchContext);
  const handleChangeSolver = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
        required
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

const GridworldControl = () => {
  return (
    <>
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
    </>
  );
};

export default GridworldControl;
