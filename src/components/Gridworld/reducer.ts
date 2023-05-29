import { GridworldState } from "./types";
import { GridworldAction, GridworldActionType } from "./actions";

export const reducer = (
  state: GridworldState,
  action: GridworldAction
): GridworldState => {
  switch (action.type) {
    case GridworldActionType.SET_SOLVER:
      return {
        ...state,
        config: {
          ...state.config,
          solver: action.solver,
        },
      };
    case GridworldActionType.SET_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    case GridworldActionType.START_SOLVING:
      return {
        ...state,
        solverState: {
          ...state.solverState,
          running: true,
          step: 0,
          intervalId: action.intervalId,
        },
      };
    case GridworldActionType.SOLVE_STEP:
      console.log("Solving step");
      return state;
    case GridworldActionType.STOP_SOLVING:
      return {
        ...state,
        solverState: {
          ...state.solverState,
          running: false,
          intervalId: undefined,
        },
      };
    default:
      throw new Error("Invalid Gridworld reducer action type");
  }
};
