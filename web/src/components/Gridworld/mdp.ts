import { HEIGHT, WIDTH } from "./config";
import { CellPolicy, CellType, GridworldState } from "./types";

const deltaRows = {
	[CellPolicy.UP]: -1,
	[CellPolicy.DOWN]: 1,
	[CellPolicy.LEFT]: 0,
	[CellPolicy.RIGHT]: 0,
};

const deltaColumns = {
	[CellPolicy.UP]: 0,
	[CellPolicy.DOWN]: 0,
	[CellPolicy.LEFT]: -1,
	[CellPolicy.RIGHT]: 1,
};

export const transition = (
	state: GridworldState,
	row: number,
	column: number,
	policy?: CellPolicy,
): [newRow: number, newColumn: number, reward: number] => {
	if (state.grid[row][column].type === CellType.END) {
		return [row, column, 0];
	}
	if (!policy) {
		policy = state.grid[row][column].policy;
	}
	const newRow = row + deltaRows[policy];
	const newColumn = column + deltaColumns[policy];
	const outOfBounds =
		newRow < 0 || newRow >= HEIGHT || newColumn < 0 || newColumn >= WIDTH;
	if (outOfBounds) {
		return [row, column, -1];
	}
	const tentativeState = state.grid[newRow][newColumn];
	const ranIntoAWall = tentativeState.type === CellType.WALL;
	const ranIntoGoal = tentativeState.type === CellType.END;
	if (ranIntoAWall) {
		return [row, column, -1];
	} else if (ranIntoGoal) {
		return [newRow, newColumn, 100];
	} else {
		return [newRow, newColumn, -1];
	}
};
