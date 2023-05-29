import { CELL_PADDING, CORNER_ROUNDING } from "./config";

const GridworldCell = ({ row, column }: { row: number; column: number }) => {
  return (
    <>
      <rect
        x={CELL_PADDING}
        y={CELL_PADDING}
        width={1 - 2 * CELL_PADDING}
        height={1 - 2 * CELL_PADDING}
        rx={CORNER_ROUNDING}
        className="fill-background-950"
      />
    </>
  );
};
export default GridworldCell;
