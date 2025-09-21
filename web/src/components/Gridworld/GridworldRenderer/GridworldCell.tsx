import { useContext } from "react";
import { GridworldStateContext } from "../GridworldContextProvider";
import { CELL_PADDING, CELL_TYPE_CLASSES, CORNER_ROUNDING } from "../config";
import { CellType } from "../types";
import PolicyArrow from "./PolicyArrow";

const GridworldCell = ({ row, column }: { row: number; column: number }) => {
	const state = useContext(GridworldStateContext);
	const cell = state.grid[row][column];
	const isCellPolicyVisible =
		state.policyVisible && cell.type === CellType.EMPTY;
	return (
		<>
			<rect
				x={CELL_PADDING}
				y={CELL_PADDING}
				width={1 - 2 * CELL_PADDING}
				height={1 - 2 * CELL_PADDING}
				rx={CORNER_ROUNDING}
				className={CELL_TYPE_CLASSES[cell.type]}
			/>
			{isCellPolicyVisible && <PolicyArrow policy={cell.policy} />}
		</>
	);
};

export default GridworldCell;
