"use client";

import GridworldContextProvider from "./GridworldContextProvider";
import GridworldControl from "./GridworldControl";
import GridworldRenderer from "./GridworldRenderer";

const Gridworld = () => {
  return (
    <GridworldContextProvider>
      <GridworldRenderer />
      <GridworldControl />
    </GridworldContextProvider>
  );
};
export default Gridworld;
