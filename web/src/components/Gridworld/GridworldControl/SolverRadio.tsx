import { useContext, ChangeEvent } from "react";
import { SolverType } from "../types";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";

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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: GridworldActionType.SET_SOLVER,
      solver: parseInt(event.target.value) as SolverType,
    });
  };
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="solver"
        value={solverType}
        checked={checked}
        aria-checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="ml-2 mr-4">
        {label}
      </label>
    </div>
  );
};

export default SolverRadio;
