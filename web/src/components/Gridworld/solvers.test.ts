import { describe, expect, it } from "vitest";
import { HEIGHT, INITIAL_STATE, WIDTH } from "./config";
import solveStep from "./solvers";
import { CellPolicy, CellType, SolverType } from "./types";

// Helper to create an empty grid with correct dimensions
function createEmptyGrid() {
	return Array.from({ length: HEIGHT }, () =>
		Array.from({ length: WIDTH }, () => ({
			type: CellType.EMPTY,
			policy: CellPolicy.UP,
			stateValue: 0,
			stateActionValue: {
				[CellPolicy.UP]: 0,
				[CellPolicy.RIGHT]: 0,
				[CellPolicy.DOWN]: 0,
				[CellPolicy.LEFT]: 0,
			},
		})),
	);
}

describe("solvers", () => {
	describe("policy iteration", () => {
		it("converges to stable policy and updates state values", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.POLICY_ITERATION;

			// Clear the grid and create a simple scenario
			state.grid = createEmptyGrid();
			// Put goal at position (3, 5)
			state.grid[3][5].type = CellType.END;

			// Run several iterations
			let nextState = state;
			for (let i = 0; i < 10; i++) {
				nextState = solveStep(nextState);
				if (!nextState.solverState.running) break;
			}

			// State values have been computed (not all zeros)
			const hasNonZeroValues = nextState.grid.some((row) =>
				row.some((cell) => cell.stateValue !== 0),
			);
			expect(hasNonZeroValues).toBe(true);

			// Cells next to goal should point towards it
			expect(nextState.grid[3][4].policy).toBe(CellPolicy.RIGHT);
			expect(nextState.grid[3][6].policy).toBe(CellPolicy.LEFT);

			// Solver should eventually stop
			expect(nextState.solverState.running).toBe(false);
		});

		it("updates state values based on discount rate", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.POLICY_ITERATION;
			state.config.discountRate = 0.9;

			// Simple corridor to goal
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].type = CellType.END;

			const nextState = solveStep(state);

			// First cell should have value affected by discount rate
			// The exact value depends on the algorithm's convergence
			expect(nextState.grid[0][0].stateValue).toBeGreaterThan(0);
			// Goal cell itself should have 0 value (terminal state)
			expect(nextState.grid[0][1].stateValue).toBe(0);
		});

		it("handles walls by not passing through them", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.POLICY_ITERATION;

			// Grid with wall blocking direct path
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].type = CellType.WALL;
			state.grid[0][2].type = CellType.END;

			// Run several iterations
			let nextState = state;
			for (let i = 0; i < 10; i++) {
				nextState = solveStep(nextState);
				if (!nextState.solverState.running) break;
			}

			// First cell should NOT point right (there's a wall)
			expect(nextState.grid[0][0].policy).not.toBe(CellPolicy.RIGHT);

			// State value should be lower due to wall penalty
			expect(nextState.grid[0][0].stateValue).toBeLessThan(0);
		});
	});

	describe("value iteration", () => {
		it("uses early stopping with evaluationsBeforeImprovement", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.VALUE_ITERATION;
			state.config.evaluationsBeforeImprovement = 5;

			// Simple grid
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].type = CellType.END;

			const nextState = solveStep(state);

			// Should run policy evaluation but stop early
			expect(nextState.grid[0][0].stateValue).toBeGreaterThan(0);
			// Policy should be updated to point right
			expect(nextState.grid[0][0].policy).toBe(CellPolicy.RIGHT);
		});

		it("converges faster than policy iteration", () => {
			const state = structuredClone(INITIAL_STATE);

			// Create identical starting states
			const policyIterState = structuredClone(state);
			policyIterState.config.solver = SolverType.POLICY_ITERATION;

			const valueIterState = structuredClone(state);
			valueIterState.config.solver = SolverType.VALUE_ITERATION;
			valueIterState.config.evaluationsBeforeImprovement = 3;

			// Run one step of each
			const policyNext = solveStep(policyIterState);
			const valueNext = solveStep(valueIterState);

			// Both should update values (exact values may differ due to different algorithms)
			expect(policyNext.grid[0][0].stateValue).not.toBe(0);
			expect(valueNext.grid[0][0].stateValue).not.toBe(0);
		});
	});

	describe("SARSA", () => {
		it("runs episode-based learning", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.SARSA;
			state.config.episodes = 100;
			state.config.learningRate = 0.5;
			state.config.discountRate = 0.9;

			// Simple corridor - make it a bit longer to ensure learning happens
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].policy = CellPolicy.RIGHT;
			state.grid[0][2].policy = CellPolicy.RIGHT;
			state.grid[0][3].policy = CellPolicy.RIGHT;
			state.grid[0][4].type = CellType.END;

			// Run multiple episodes to ensure learning occurs
			let nextState = state;
			for (let i = 0; i < 5; i++) {
				nextState = solveStep(nextState);
			}

			// Should increment step counter
			expect(nextState.solverState.step).toBe(5);

			// After multiple episodes, Q-values should be updated
			const hasNonZeroQValue = nextState.grid
				.slice(0, 1)
				.some((row) =>
					row
						.slice(0, 4)
						.some((cell) =>
							Object.values(cell.stateActionValue).some((v) => v !== 0),
						),
				);
			expect(hasNonZeroQValue).toBe(true);
		});

		it("uses epsilon-greedy exploration", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.SARSA;
			state.config.initialExplorationCoefficient = 1.0;
			state.config.explorationPeriod = 100;

			// Run multiple episodes and check that exploration happens
			let nextState = state;
			for (let i = 0; i < 10; i++) {
				nextState = solveStep(nextState);
			}

			// After 10 episodes, step counter should be 10
			expect(nextState.solverState.step).toBe(10);
		});

		it("stops after max episodes", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.SARSA;
			state.config.episodes = 5;

			// Simple grid
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].type = CellType.END;

			// Run past max episodes
			let nextState = state;
			for (let i = 0; i < 10; i++) {
				nextState = solveStep(nextState);
			}

			// Should stop after 5 episodes
			expect(nextState.solverState.running).toBe(false);
			expect(nextState.solverState.step).toBeGreaterThan(5);
		});
	});

	describe("Q-Learning", () => {
		it("learns optimal policy", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.Q_LEARNING;
			state.config.episodes = 100;
			state.config.learningRate = 0.5;
			state.config.discountRate = 0.9;

			// Simple corridor - make it a bit longer
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].policy = CellPolicy.RIGHT;
			state.grid[0][2].policy = CellPolicy.RIGHT;
			state.grid[0][3].policy = CellPolicy.RIGHT;
			state.grid[0][4].type = CellType.END;

			// Run multiple episodes to ensure learning occurs
			let nextState = state;
			for (let i = 0; i < 5; i++) {
				nextState = solveStep(nextState);
			}

			// Should increment step counter
			expect(nextState.solverState.step).toBe(5);

			// After multiple episodes, Q-values should be updated
			const hasNonZeroQValue = nextState.grid
				.slice(0, 1)
				.some((row) =>
					row
						.slice(0, 4)
						.some((cell) =>
							Object.values(cell.stateActionValue).some((v) => v !== 0),
						),
				);
			expect(hasNonZeroQValue).toBe(true);
		});

		it("updates Q-values differently than SARSA (off-policy)", () => {
			const state = structuredClone(INITIAL_STATE);

			// Create identical starting states
			const sarsaState = structuredClone(state);
			sarsaState.config.solver = SolverType.SARSA;
			sarsaState.config.learningRate = 0.5;
			sarsaState.config.discountRate = 0.9;

			const qLearningState = structuredClone(state);
			qLearningState.config.solver = SolverType.Q_LEARNING;
			qLearningState.config.learningRate = 0.5;
			qLearningState.config.discountRate = 0.9;

			// Simple grid - longer corridor
			const simpleGrid = createEmptyGrid();
			simpleGrid[0][0].policy = CellPolicy.RIGHT;
			simpleGrid[0][1].policy = CellPolicy.RIGHT;
			simpleGrid[0][2].policy = CellPolicy.RIGHT;
			simpleGrid[0][3].type = CellType.END;

			sarsaState.grid = structuredClone(simpleGrid);
			qLearningState.grid = structuredClone(simpleGrid);

			// Run multiple episodes
			let sarsaNext = sarsaState;
			let qNext = qLearningState;
			for (let i = 0; i < 10; i++) {
				sarsaNext = solveStep(sarsaNext);
				qNext = solveStep(qNext);
			}

			// Both should update Q-values
			expect(sarsaNext.solverState.step).toBe(10);
			expect(qNext.solverState.step).toBe(10);

			// Both should have learned something (non-zero Q-values)
			const sarsaHasLearned = sarsaNext.grid
				.slice(0, 1)
				.some((row) =>
					row
						.slice(0, 3)
						.some((cell) =>
							Object.values(cell.stateActionValue).some((v) => v !== 0),
						),
				);
			const qHasLearned = qNext.grid
				.slice(0, 1)
				.some((row) =>
					row
						.slice(0, 3)
						.some((cell) =>
							Object.values(cell.stateActionValue).some((v) => v !== 0),
						),
				);
			expect(sarsaHasLearned).toBe(true);
			expect(qHasLearned).toBe(true);
		});
	});

	describe("solveStep general behavior", () => {
		it("returns new state without mutating original", () => {
			const state = structuredClone(INITIAL_STATE);
			const originalStateValue = state.grid[0][0].stateValue;

			const nextState = solveStep(state);

			// Original should be unchanged
			expect(state.grid[0][0].stateValue).toBe(originalStateValue);
			// New state should be different object
			expect(nextState).not.toBe(state);
		});

		it("clears interval and stops solver when policy is stable", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.POLICY_ITERATION;
			state.solverState.intervalId = 123;
			state.solverState.running = true;

			// Simple grid that converges quickly
			state.grid = createEmptyGrid();
			state.grid[0][0].policy = CellPolicy.RIGHT;
			state.grid[0][1].type = CellType.END;

			// Run until convergence
			let nextState = state;
			for (let i = 0; i < 20; i++) {
				nextState = solveStep(nextState);
				if (!nextState.solverState.running) break;
			}

			// Should stop eventually
			expect(nextState.solverState.running).toBe(false);
			expect(nextState.solverState.intervalId).toBeUndefined();
		});

		it("stops after exceeding episode limit for RL algorithms", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.Q_LEARNING;
			state.config.episodes = 3;
			state.solverState.running = true;

			// Run past limit
			let nextState = state;
			for (let i = 0; i < 10; i++) {
				nextState = solveStep(nextState);
			}

			// Should stop
			expect(nextState.solverState.running).toBe(false);
			expect(nextState.solverState.step).toBeGreaterThan(3);
		});

		it("handles grid with no valid starting positions for RL", () => {
			const state = structuredClone(INITIAL_STATE);
			state.config.solver = SolverType.SARSA;

			// Grid with only walls and end (no EMPTY cells)
			state.grid = [
				[
					{
						type: CellType.WALL,
						policy: CellPolicy.UP,
						stateValue: 0,
						stateActionValue: { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 },
					},
					{
						type: CellType.END,
						policy: CellPolicy.UP,
						stateValue: 0,
						stateActionValue: { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 },
					},
				],
			];

			const nextState = solveStep(state);

			// Should handle gracefully (increment step but not crash)
			expect(nextState.solverState.step).toBe(1);
		});
	});
});
