import { createContext, useReducer } from "react";
import type { GridworldAction } from "./actions";
import { INITIAL_STATE } from "./config";
import { reducer } from "./reducer";

export const GridworldStateContext = createContext(INITIAL_STATE);
export const GridworldDispatchContext = createContext(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	(_action: GridworldAction) => {},
);

const GridworldContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	return (
		<GridworldStateContext value={state}>
			<GridworldDispatchContext value={dispatch}>
				{children}
			</GridworldDispatchContext>
		</GridworldStateContext>
	);
};

export default GridworldContextProvider;
