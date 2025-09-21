import { SolverType } from "../types";

export const solverRadioData = [
	{
		id: "policy-iteration",
		label: "Policy Iteration",
		solverType: SolverType.POLICY_ITERATION,
	},
	{
		id: "value-iteration",
		label: "Value Iteration",
		solverType: SolverType.VALUE_ITERATION,
	},
	{
		id: "sarsa",
		label: "SARSA",
		solverType: SolverType.SARSA,
	},
	{
		id: "q-learning",
		label: "Q-Learning",
		solverType: SolverType.Q_LEARNING,
	},
];

export const configSliderData = [
	{
		condition: [SolverType.POLICY_ITERATION, SolverType.VALUE_ITERATION],
		id: "discount-rate",
		label: "Discount Rate",
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		condition: [SolverType.VALUE_ITERATION],
		id: "evaluations-before-improvement",
		label: "Evaluations Before Improvement",
		min: 1,
		max: 10,
		step: 1,
	},
	{
		condition: [SolverType.SARSA, SolverType.Q_LEARNING],
		id: "episodes",
		label: "Episodes",
		min: 1,
		max: 500,
		step: 1,
	},
	{
		condition: [SolverType.SARSA, SolverType.Q_LEARNING],
		id: "learning-rate",
		label: "Learning Rate",
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		condition: [SolverType.SARSA, SolverType.Q_LEARNING],
		id: "initial-exploration-coefficient",
		label: "Initial Exploration Coefficient",
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		condition: [SolverType.SARSA, SolverType.Q_LEARNING],
		id: "exploration-period",
		label: "Exploration Period",
		min: 0,
		max: 500,
		step: 1,
	},
];
