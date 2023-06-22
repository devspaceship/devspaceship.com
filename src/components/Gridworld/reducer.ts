import { GridworldState } from "./types";
import { GridworldAction, GridworldActionType } from "./actions";
import solveStep from "./solvers";

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
        policyVisible: true,
      };
    case GridworldActionType.SOLVE_STEP:
      return solveStep(state);
    case GridworldActionType.STOP_SOLVING:
      clearInterval(state.solverState.intervalId);
      return {
        ...state,
        solverState: {
          ...state.solverState,
          running: false,
          intervalId: undefined,
        },
      };
    case GridworldActionType.START_DRAWING:
      return {
        ...state,
        grid: state.grid.map((row, rowIndex) => {
          return row.map((cell, columnIndex) => {
            return rowIndex === action.row && columnIndex === action.column
              ? { ...cell, type: action.cellType }
              : cell;
          });
        }),
        drawingState: {
          drawing: true,
          cellType: action.cellType,
        },
      };
    default:
      throw new Error("Invalid Gridworld reducer action type");
  }
};
