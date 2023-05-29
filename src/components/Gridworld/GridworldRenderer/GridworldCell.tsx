import { useContext } from "react";
import { GridworldStateContext } from "../GridworldContextProvider";
import { CELL_PADDING, CELL_TYPE_CLASSES, CORNER_ROUNDING } from "../config";

const GridworldCell = ({ row, column }: { row: number; column: number }) => {
  const state = useContext(GridworldStateContext);
  return (
    <>
      <rect
        x={CELL_PADDING}
        y={CELL_PADDING}
        width={1 - 2 * CELL_PADDING}
        height={1 - 2 * CELL_PADDING}
        rx={CORNER_ROUNDING}
        className={CELL_TYPE_CLASSES[state.grid[row][column].type]}
      />
    </>
  );
};

export default GridworldCell;
