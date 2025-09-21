import { useContext } from "react";
import { Label } from "ui/label";
import { RadioGroupItem } from "ui/radio-group";
import type { SolverType } from "../types";
import { GridworldStateContext } from "../GridworldContextProvider";

const SolverRadio = ({
	id,
	label,
	solverType,
}: {
	id: string;
	label: string;
	solverType: SolverType;
}) => {
	const state = useContext(GridworldStateContext);
	const checked = solverType === state.config.solver;
	return (
		<div>
			<div className="ml-3 flex items-center space-x-2">
				<RadioGroupItem
					value={`${solverType}`}
					id={id}
					checked={checked}
					aria-checked={checked}
				/>
				<Label htmlFor={id} className="text-lg">
					{label}
				</Label>
			</div>
		</div>
	);
};

export default SolverRadio;
