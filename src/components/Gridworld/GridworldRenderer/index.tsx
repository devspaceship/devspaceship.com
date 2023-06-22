import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { HEIGHT, WIDTH } from "../config";
import GridworldCell from "./GridworldCell";
import { MouseEvent, useContext } from "react";
import { CellType } from "../types";
import { GridworldActionType } from "../actions";

const positions: [number, number][] = [];
for (let row = 0; row < HEIGHT; row++) {
  for (let column = 0; column < WIDTH; column++) {
    positions.push([row, column]);
  }
}

const mouseEventToGridPosition = (event: MouseEvent<SVGElement>) => {
  const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
  const { clientX, clientY } = event;
  const row = Math.floor(((clientY - y) / height) * HEIGHT);
  const column = Math.floor(((clientX - x) / width) * WIDTH);
  return [row, column];
};

const GridworldRenderer = () => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);

  const typeToDrawingType = {
    [CellType.WALL]: CellType.EMPTY,
    [CellType.EMPTY]: CellType.WALL,
    [CellType.START]: CellType.START,
    [CellType.END]: CellType.END,
  };

  const handleMouseDown = (event: MouseEvent<SVGElement>) => {
    const [row, column] = mouseEventToGridPosition(event);
    const cell_state = state.grid[row][column];
    const drawingType = typeToDrawingType[cell_state.type];
    dispatch({
      type: GridworldActionType.START_DRAWING,
      cellType: drawingType,
      row,
      column,
    });
  };

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="mx-auto max-h-[80vh]"
      onMouseDown={handleMouseDown}
    >
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
