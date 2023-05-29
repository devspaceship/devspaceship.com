import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { GridworldAction } from "./types";
import { INITIAL_STATE } from "./config";

export const GridworldStateContext = createContext(INITIAL_STATE);
export const GridworldDispatchContext = createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  (action: GridworldAction) => {}
);

const GridworldContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <GridworldStateContext.Provider value={state}>
      <GridworldDispatchContext.Provider value={dispatch}>
        {children}
      </GridworldDispatchContext.Provider>
    </GridworldStateContext.Provider>
  );
};

export default GridworldContextProvider;
