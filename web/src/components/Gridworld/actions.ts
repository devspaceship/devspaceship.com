import type { SolverType, GridworldConfig, CellState } from "./types";

export enum GridworldActionType {
	SET_SOLVER,
	SET_CONFIG,
	SET_GRID,
	START_SOLVING,
	SOLVE_STEP,
	STOP_SOLVING,
	START_DRAWING,
	DRAW,
	STOP_DRAWING,
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

interface StartDrawingAction {
	type: GridworldActionType.START_DRAWING;
	row: number;
	column: number;
}

interface DrawAction {
	type: GridworldActionType.DRAW;
	row: number;
	column: number;
}

interface StopDrawingAction {
	type: GridworldActionType.STOP_DRAWING;
}

export type GridworldAction =
	| SetSolverAction
	| SetConfigAction
	| SetGridAction
	| StartSolvingAction
	| SolveAction
	| StartDrawingAction
	| DrawAction
	| StopDrawingAction;
