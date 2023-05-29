import { GridworldAction, GridworldActionType, GridworldState } from "./types";

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
    default:
      throw new Error("Invalid Gridworld reducer action type");
  }
};
