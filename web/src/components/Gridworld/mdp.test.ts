import { describe, expect, it } from "vitest";
import { transition } from "./mdp";
import { CellPolicy, CellType, type GridworldState } from "./types";

/**
 * Creates a minimal test grid with specified dimensions.
 * All cells are initialized as EMPTY with UP policy and 0 values.
 */
const createMinimalGrid = (rows: number, cols: number): GridworldState => {
	const grid = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => ({
			type: CellType.EMPTY,
			policy: CellPolicy.UP,
			stateValue: 0,
			stateActionValue: {
				[CellPolicy.UP]: 0,
				[CellPolicy.DOWN]: 0,
				[CellPolicy.LEFT]: 0,
				[CellPolicy.RIGHT]: 0,
			},
		})),
	);

	return {
		policyVisible: true,
		config: {
			solver: 0,
			discountRate: 0.9,
			evaluationsBeforeImprovement: 1,
			episodes: 100,
			learningRate: 0.1,
			initialExplorationCoefficient: 1,
			explorationPeriod: 100,
		},
		grid,
		solverState: { running: false, step: 0 },
		drawingState: { drawing: false, cellType: CellType.EMPTY },
	};
};

describe("transition", () => {
	describe("normal movement", () => {
		it("moves up when policy is UP", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				2,
				1,
				CellPolicy.UP,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("moves down when policy is DOWN", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				0,
				1,
				CellPolicy.DOWN,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("moves left when policy is LEFT", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				1,
				2,
				CellPolicy.LEFT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("moves right when policy is RIGHT", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				1,
				0,
				CellPolicy.RIGHT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});
	});

	describe("boundary conditions", () => {
		it("stays in place when moving up from top edge", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				0,
				1,
				CellPolicy.UP,
			);

			expect(newRow).toBe(0);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving down from bottom edge", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				2,
				1,
				CellPolicy.DOWN,
			);

			expect(newRow).toBe(2);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving left from left edge", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				1,
				0,
				CellPolicy.LEFT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving right from right edge", () => {
			const state = createMinimalGrid(3, 3);
			const [newRow, newColumn, reward] = transition(
				state,
				1,
				2,
				CellPolicy.RIGHT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);
		});
	});

	describe("wall collisions", () => {
		it("stays in place when moving into a wall from above", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.WALL;

			const [newRow, newColumn, reward] = transition(
				state,
				0,
				1,
				CellPolicy.DOWN,
			);

			expect(newRow).toBe(0);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving into a wall from the right", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.WALL;

			const [newRow, newColumn, reward] = transition(
				state,
				1,
				2,
				CellPolicy.LEFT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving into a wall from below", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.WALL;

			const [newRow, newColumn, reward] = transition(
				state,
				2,
				1,
				CellPolicy.UP,
			);

			expect(newRow).toBe(2);
			expect(newColumn).toBe(1);
			expect(reward).toBe(-1);
		});

		it("stays in place when moving into a wall from the left", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.WALL;

			const [newRow, newColumn, reward] = transition(
				state,
				1,
				0,
				CellPolicy.RIGHT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);
		});
	});

	describe("goal state", () => {
		it("moves to goal and receives reward of 100", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.END;

			const [newRow, newColumn, reward] = transition(
				state,
				0,
				1,
				CellPolicy.DOWN,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(100);
		});

		it("stays in goal state with 0 reward when already at goal", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.END;

			const [newRow, newColumn, reward] = transition(
				state,
				1,
				1,
				CellPolicy.DOWN,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(1);
			expect(reward).toBe(0);
		});

		it("stays in goal state regardless of policy direction", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].type = CellType.END;

			for (const policy of [
				CellPolicy.UP,
				CellPolicy.DOWN,
				CellPolicy.LEFT,
				CellPolicy.RIGHT,
			]) {
				const [newRow, newColumn, reward] = transition(state, 1, 1, policy);
				expect(newRow).toBe(1);
				expect(newColumn).toBe(1);
				expect(reward).toBe(0);
			}
		});
	});

	describe("default policy usage", () => {
		it("uses cell's policy when no policy parameter provided", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].policy = CellPolicy.RIGHT;

			const [newRow, newColumn, reward] = transition(state, 1, 1);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);
		});

		it("overrides cell's policy when policy parameter provided", () => {
			const state = createMinimalGrid(3, 3);
			state.grid[1][1].policy = CellPolicy.RIGHT;

			const [newRow, newColumn, reward] = transition(
				state,
				1,
				1,
				CellPolicy.LEFT,
			);

			expect(newRow).toBe(1);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);
		});
	});

	describe("corner cases", () => {
		it("handles top-left corner", () => {
			const state = createMinimalGrid(3, 3);

			// Moving up from top-left
			let [newRow, newColumn, reward] = transition(state, 0, 0, CellPolicy.UP);
			expect(newRow).toBe(0);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);

			// Moving left from top-left
			[newRow, newColumn, reward] = transition(state, 0, 0, CellPolicy.LEFT);
			expect(newRow).toBe(0);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);
		});

		it("handles bottom-right corner", () => {
			const state = createMinimalGrid(3, 3);

			// Moving down from bottom-right
			let [newRow, newColumn, reward] = transition(
				state,
				2,
				2,
				CellPolicy.DOWN,
			);
			expect(newRow).toBe(2);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);

			// Moving right from bottom-right
			[newRow, newColumn, reward] = transition(state, 2, 2, CellPolicy.RIGHT);
			expect(newRow).toBe(2);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);
		});

		it("handles top-right corner", () => {
			const state = createMinimalGrid(3, 3);

			// Moving up from top-right
			let [newRow, newColumn, reward] = transition(state, 0, 2, CellPolicy.UP);
			expect(newRow).toBe(0);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);

			// Moving right from top-right
			[newRow, newColumn, reward] = transition(state, 0, 2, CellPolicy.RIGHT);
			expect(newRow).toBe(0);
			expect(newColumn).toBe(2);
			expect(reward).toBe(-1);
		});

		it("handles bottom-left corner", () => {
			const state = createMinimalGrid(3, 3);

			// Moving down from bottom-left
			let [newRow, newColumn, reward] = transition(
				state,
				2,
				0,
				CellPolicy.DOWN,
			);
			expect(newRow).toBe(2);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);

			// Moving left from bottom-left
			[newRow, newColumn, reward] = transition(state, 2, 0, CellPolicy.LEFT);
			expect(newRow).toBe(2);
			expect(newColumn).toBe(0);
			expect(reward).toBe(-1);
		});
	});
});
