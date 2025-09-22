import { useContext } from "react";
import ConfigSlider from "ui/custom/ConfigSlider";
import { GridworldActionType } from "../actions";
import {
	GridworldDispatchContext,
	GridworldStateContext,
} from "../GridworldContextProvider";
import type { GridworldConfig } from "../types";

const GridworldConfigSlider = ({
	id,
	label,
	min,
	max,
	step,
}: {
	id: string;
	label: string;
	min: number;
	max: number;
	step?: number;
}) => {
	const state = useContext(GridworldStateContext);
	const dispatch = useContext(GridworldDispatchContext);
	const configKey = id.replace(/-(\w)/g, (_, letter: string) =>
		letter.toUpperCase(),
	);

	const handleChange = (value: number) => {
		dispatch({
			type: GridworldActionType.SET_CONFIG,
			config: {
				...state.config,
				[configKey]: value,
			},
		});
	};

	const value = state.config[configKey as keyof GridworldConfig];
	return (
		<div className="m-3 text-center">
			<ConfigSlider
				id={id}
				label={label}
				min={min}
				max={max}
				step={step}
				value={value}
				onValueChange={handleChange}
			/>
		</div>
	);
};

export default GridworldConfigSlider;
