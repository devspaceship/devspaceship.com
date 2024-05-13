import { CellPolicy, CellType, GridworldState } from "./types";
import { GridworldAction, GridworldActionType } from "./actions";
import solveStep from "./solvers";

const getDrawingType = (
  state: GridworldState,
  row: number,
  column: number,
): CellType => {
  const typeToDrawingType = {
    [CellType.WALL]: CellType.EMPTY,
    [CellType.EMPTY]: CellType.WALL,
    [CellType.END]: CellType.END,
  };
  const cell_state = state.grid[row][column];
  return typeToDrawingType[cell_state.type];
};

export const reducer = (
  state: GridworldState,
  action: GridworldAction,
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
        grid: state.grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            stateValue: 0,
            stateActionValue: {
              [CellPolicy.UP]: 0,
              [CellPolicy.DOWN]: 0,
              [CellPolicy.LEFT]: 0,
              [CellPolicy.RIGHT]: 0,
            },
            policy: CellPolicy.UP,
          })),
        ),
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
      if (state.solverState.intervalId !== undefined) {
        clearInterval(state.solverState.intervalId);
      }
      // eslint-disable-next-line no-case-declarations
      const drawingType = getDrawingType(state, action.row, action.column);
      return {
        ...state,
        grid: state.grid.map((row, i) => {
          return row.map((cell, j) => {
            return i === action.row && j === action.column
              ? {
                  ...cell,
                  type: drawingType,
                }
              : cell;
          });
        }),
        policyVisible: false,
        drawingState: {
          drawing: true,
          cellType: drawingType,
        },
        solverState: {
          ...state.solverState,
          running: false,
          intervalId: undefined,
        },
      };
    case GridworldActionType.DRAW:
      if (!state.drawingState.drawing) {
        return state;
      }
      return {
        ...state,
        grid: state.grid.map((row, i) =>
          row.map((cell, j) => {
            if (
              i === action.row &&
              j === action.column &&
              cell.type !== CellType.END
            ) {
              return {
                ...cell,
                type: state.drawingState.cellType,
              };
            } else if (state.drawingState.cellType === CellType.END) {
              if (action.row === i && action.column === j) {
                return {
                  ...cell,
                  type: state.drawingState.cellType,
                };
              } else if (cell.type === state.drawingState.cellType) {
                return {
                  ...cell,
                  type: CellType.EMPTY,
                };
              }
              return cell;
            }
            return cell;
          }),
        ),
      };
    case GridworldActionType.STOP_DRAWING:
      return {
        ...state,
        drawingState: {
          ...state.drawingState,
          drawing: false,
        },
      };
    default:
      throw new Error("Invalid Gridworld reducer action type");
  }
};
