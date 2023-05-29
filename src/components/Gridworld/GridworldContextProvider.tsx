import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { GridworldAction } from "./types";

export const GridworldStateContext = createContext(initialState);
export const GridworldDispatchContext = createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  (action: GridworldAction) => {}
);

const GridworldContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GridworldStateContext.Provider value={state}>
      <GridworldDispatchContext.Provider value={dispatch}>
        {children}
      </GridworldDispatchContext.Provider>
    </GridworldStateContext.Provider>
  );
};

export default GridworldContextProvider;
