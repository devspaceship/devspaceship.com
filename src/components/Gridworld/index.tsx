"use client";

import GridWorldContextProvider from "./context";
import GridworldControl from "./gridworld-control";
import GridworldRenderer from "./gridworld-svg";

const Gridworld = () => {
  return (
    <GridWorldContextProvider>
      <GridworldRenderer />
      <GridworldControl />
    </GridWorldContextProvider>
  );
};
export default Gridworld;
