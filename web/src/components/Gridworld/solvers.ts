import { LOG_THRESHOLD, MAX_NUM_STEPS } from "./config";
import { transition } from "./mdp";
import {
	CellPolicy,
	CellType,
	GridworldState,
	SolverType,
	cellPolicies,
} from "./types";

const policyEvaluation = (state: GridworldState, early_stop = false): void => {
	let delta = 1;
	let iteration = 0;
	while (delta > Math.pow(10, LOG_THRESHOLD)) {
		delta = 0;
		state.grid.forEach((row, i) => {
			row.forEach((cell, j) => {
				const [newRow, newColumn, reward] = transition(state, i, j);
				const nextStateValue =
					reward +
					state.config.discountRate * state.grid[newRow][newColumn].stateValue;
				delta = Math.max(delta, Math.abs(nextStateValue - cell.stateValue));
				state.grid[i][j].stateValue = nextStateValue;
			});
		});
		iteration++;
		if (early_stop && iteration > state.config.evaluationsBeforeImprovement) {
			break;
		}
	}
};

const policyImprovement = (state: GridworldState): boolean => {
	let isPolicyStable = true;
	state.grid.forEach((row, i) => {
		row.forEach((cell, j) => {
			let bestPolicy = CellPolicy.UP;
			let bestValue = -Infinity;
			for (const policy of cellPolicies) {
				const [newRow, newColumn, reward] = transition(state, i, j, policy);
				const nextStateValue =
					reward +
					state.config.discountRate * state.grid[newRow][newColumn].stateValue;
				if (nextStateValue > bestValue) {
					bestValue = nextStateValue;
					bestPolicy = policy;
				}
			}
			if (bestPolicy !== cell.policy) {
				isPolicyStable = false;
				cell.policy = bestPolicy;
			}
		});
	});
	return isPolicyStable;
};

const policyIteration = (state: GridworldState): boolean => {
	policyEvaluation(state);
	return policyImprovement(state);
};

const valueIteration = (state: GridworldState): boolean => {
	policyEvaluation(state, true);
	return policyImprovement(state);
};

const chooseEpisodeStart = (state: GridworldState): [number, number] => {
	const validStarts: [number, number][] = [];
	state.grid.forEach((row, i) => {
		row.forEach((cell, j) => {
			if (cell.type === CellType.EMPTY) {
				validStarts.push([i, j]);
			}
		});
	});
	return validStarts.length === 0
		? [-1, -1]
		: validStarts[Math.floor(Math.random() * validStarts.length)];
};

const epsilonGreedy = (state: GridworldState): number => {
	return (
		state.config.initialExplorationCoefficient /
		(1 + state.solverState.step / state.config.explorationPeriod)
	);
};

const chooseAction = (
	state: GridworldState,
	row: number,
	column: number,
): CellPolicy => {
	const epsilon = epsilonGreedy(state);
	return Math.random() < epsilon
		? cellPolicies[Math.floor(Math.random() * cellPolicies.length)]
		: state.grid[row][column].policy;
};

const SarsaQLearning = (state: GridworldState, q_learning = false): void => {
	state.solverState.step++;
	let [i, j] = chooseEpisodeStart(state);
	if (i === -1 && j === -1) {
		return;
	}
	let episode_step = 0;
	let action = chooseAction(state, i, j);
	while (
		state.grid[i][j].type !== CellType.END &&
		episode_step < MAX_NUM_STEPS
	) {
		const [i_, j_, reward] = transition(state, i, j, action);
		const newAction = chooseAction(state, i_, j_);
		const QSA = state.grid[i][j].stateActionValue[action];
		const QSPAP = state.grid[i_][j_].stateActionValue[newAction];
		let QValue = QSPAP;
		if (q_learning) {
			cellPolicies.forEach((policy) => {
				const QSPAP = state.grid[i_][j_].stateActionValue[policy];
				QValue = QSPAP > QValue ? QSPAP : QValue;
			});
		}
		state.grid[i][j].stateActionValue[action] =
			QSA +
			state.config.learningRate *
				(reward + state.config.discountRate * QValue - QSA);

		state.grid[i][j].policy = cellPolicies.reduce(
			(bestPolicy, policy) =>
				state.grid[i][j].stateActionValue[policy] >
				state.grid[i][j].stateActionValue[bestPolicy]
					? policy
					: bestPolicy,
			CellPolicy.UP,
		);
		i = i_;
		j = j_;
		action = newAction;
		episode_step++;
	}
};

const solveStep = (state: GridworldState): GridworldState => {
	const nextState = structuredClone(state);
	let isPolicyStable = false;
	switch (state.config.solver) {
		case SolverType.POLICY_ITERATION:
			isPolicyStable = policyIteration(nextState);
			break;
		case SolverType.VALUE_ITERATION:
			isPolicyStable = valueIteration(nextState);
			break;
		case SolverType.SARSA:
			SarsaQLearning(nextState);
			break;
		case SolverType.Q_LEARNING:
			SarsaQLearning(nextState, true);
			break;
	}
	if (isPolicyStable || nextState.solverState.step > state.config.episodes) {
		clearInterval(nextState.solverState.intervalId);
		nextState.solverState.intervalId = undefined;
		nextState.solverState.running = false;
	}

	return nextState;
};
export default solveStep;
