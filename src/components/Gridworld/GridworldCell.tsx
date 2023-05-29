import { useContext } from "react";
import { GridworldStateContext } from "./GridworldContextProvider";
import { CELL_PADDING, CORNER_ROUNDING } from "./config";
import { CellType } from "./types";

const GridworldCell = ({ row, column }: { row: number; column: number }) => {
  const state = useContext(GridworldStateContext);

  // TODO: Remove this debug code
  if (row == 0 && column == 0) {
    console.log(state);
  }

  const cellTypeClasses = {
    [CellType.EMPTY]: "fill-background-950",
    [CellType.WALL]: "fill-primary-300",
    [CellType.START]: "fill-secondary-500",
    [CellType.END]: "fill-tertiary-300",
  };

  return (
    <>
      <rect
        x={CELL_PADDING}
        y={CELL_PADDING}
        width={1 - 2 * CELL_PADDING}
        height={1 - 2 * CELL_PADDING}
        rx={CORNER_ROUNDING}
        className={cellTypeClasses[state.grid[row][column].type]}
      />
    </>
  );
};
export default GridworldCell;
