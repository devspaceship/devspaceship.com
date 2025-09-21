import { Label } from "ui/label";
import { Slider } from "ui/slider";

const ConfigSlider = ({
	id,
	label,
	min,
	max,
	step,
	value,
	onValueChange,
}: {
	id: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	value: number;
	onValueChange: (value: number) => void;
}) => {
	return (
		<div>
			<Slider
				id={id}
				name={id}
				min={min}
				max={max}
				step={step}
				value={[value]}
				onValueChange={(values: number[]) => onValueChange(values[0])}
				className="mx-auto my-3 w-32"
			/>
			<Label htmlFor={id} className="text-lg">
				{label}: {value}
			</Label>
		</div>
	);
};

export default ConfigSlider;
