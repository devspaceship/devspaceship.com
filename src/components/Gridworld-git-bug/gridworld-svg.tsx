import { HEIGHT, WIDTH } from "./config";
import GridworldCell from "./gridworld-cell";

const getPositions = () => {
  const positions = [];
  for (let row = 0; row < HEIGHT; row++) {
    for (let column = 0; column < WIDTH; column++) {
      positions.push([row, column]);
    }
  }
  return positions;
};

const GridworldSVG = () => {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto max-h-[80vh]">
      {getPositions().map(([row, column]) => (
        <svg
          key={`${row}:${column}`}
          viewBox="0 0 1 1"
          x={column}
          y={row}
          width="1"
          height="1"
        >
          <GridworldCell row={row} column={column} />
        </svg>
      ))}
    </svg>
  );
};
export default GridworldSVG;
