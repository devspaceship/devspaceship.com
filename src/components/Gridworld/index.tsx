"use client";

import GridworldControl from "./gridworld-control";
import GridworldRenderer from "./gridworld-svg";

const Gridworld = () => {
  return (
    <>
      <GridworldRenderer />
      <GridworldControl />
    </>
  );
};
export default Gridworld;
