import { MouseEvent, useContext } from "react";
import { GridworldDispatchContext } from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";
import { HEIGHT, WIDTH } from "../config";
import GridworldCell from "./GridworldCell";

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
  const dispatch = useContext(GridworldDispatchContext);

  const handleMouseEvent = (event: MouseEvent<SVGElement>) => {
    const [row, column] = mouseEventToGridPosition(event);
    switch (event.type) {
      case "mousedown":
        dispatch({
          type: GridworldActionType.START_DRAWING,
          row,
          column,
        });
        break;
      case "mousemove":
        dispatch({
          type: GridworldActionType.DRAW,
          row,
          column,
        });
        break;
      case "mouseup":
        dispatch({
          type: GridworldActionType.STOP_DRAWING,
        });
        break;
    }
  };

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="mx-auto max-h-[80vh]"
      onMouseDown={handleMouseEvent}
      onMouseMove={handleMouseEvent}
      onMouseUp={handleMouseEvent}
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
