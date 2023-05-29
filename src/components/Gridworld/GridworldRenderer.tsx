import { HEIGHT, WIDTH } from "./config";
import GridworldCell from "./GridworldCell";

const positions: [number, number][] = [];
for (let row = 0; row < HEIGHT; row++) {
  for (let column = 0; column < WIDTH; column++) {
    positions.push([row, column]);
  }
}

const GridworldRenderer = () => {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto max-h-[80vh]">
      {positions.map(([row, column]) => (
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
export default GridworldRenderer;
