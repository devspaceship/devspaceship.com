import { SolverType, GridworldConfig, CellState } from "./types";

export enum GridworldActionType {
  SET_SOLVER,
  SET_CONFIG,
  SET_GRID,
  START_SOLVING,
  SOLVE_STEP,
  STOP_SOLVING,
}

interface SetSolverAction {
  type: GridworldActionType.SET_SOLVER;
  solver: SolverType;
}

interface SetConfigAction {
  type: GridworldActionType.SET_CONFIG;
  config: GridworldConfig;
}

interface SetGridAction {
  type: GridworldActionType.SET_GRID;
  grid: CellState[][];
}

interface StartSolvingAction {
  type: GridworldActionType.START_SOLVING;
  intervalId: number;
}

interface SolveAction {
  type: GridworldActionType.SOLVE_STEP | GridworldActionType.STOP_SOLVING;
}

export type GridworldAction =
  | SetSolverAction
  | SetConfigAction
  | SetGridAction
  | StartSolvingAction
  | SolveAction;
