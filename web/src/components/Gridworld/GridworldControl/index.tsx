import { useContext } from "react";
import { RadioGroup } from "ui/radio-group";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";
import { SolverType } from "../types";
import GridworldConfigSlider from "./GridworldConfigSlider";
import SolverRadio from "./SolverRadio";
import { FPS } from "../config";
import { Button } from "ui/button";
import { configSliderData, solverRadioData } from "./config";

const GridworldControl = () => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);

  const handleToggleSolve = () => {
    if (state.solverState.running) {
      dispatch({ type: GridworldActionType.STOP_SOLVING });
      return;
    }
    const intervalId = setInterval(() => {
      dispatch({ type: GridworldActionType.SOLVE_STEP });
    }, 1000 / FPS) as unknown as number;
    dispatch({ type: GridworldActionType.START_SOLVING, intervalId });
  };

  const handleChangeSolver = (solver: string) => {
    const solverType = parseInt(solver) as SolverType;
    dispatch({ type: GridworldActionType.SET_SOLVER, solver: solverType });
  };

  return (
    <>
      <RadioGroup
        name="solver"
        defaultValue={`${SolverType.POLICY_ITERATION}`}
        onValueChange={handleChangeSolver}
        className="mt-4 justify-center sm:flex sm:flex-row"
      >
        {solverRadioData.map(({ id, label, solverType }) => (
          <SolverRadio key={id} id={id} label={label} solverType={solverType} />
        ))}
      </RadioGroup>
      <div className="mt-4 md:flex md:flex-row md:justify-center">
        {configSliderData.map(
          ({ condition, id, label, min, max, step }) =>
            condition.includes(state.config.solver) && (
              <GridworldConfigSlider
                key={id}
                id={id}
                label={label}
                min={min}
                max={max}
                step={step}
              />
            )
        )}
      </div>
      <div className="text-center">
        <Button
          onClick={handleToggleSolve}
          className="mt-3 rounded-full text-xl"
        >
          {state.solverState.running ? "Stop" : "Solve"}
        </Button>
      </div>
    </>
  );
};

export default GridworldControl;
