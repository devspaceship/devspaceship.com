type MotionPayload = {
	radius: number;
	time: number;
	speed: number;
	acceleration: number;
};

type EarthDensityPayload = {
	radius: number;
	density: number;
	mass: number;
	gravity: number;
};

const roundAtPrecision = (value: number, precision: number) => {
	return Math.round(value / precision) * precision;
};

const roundAtInversePrecision = (value: number, precision: number) => {
	return Math.round(value * precision) / precision;
};

const parseMotionPayload = (data: MotionPayload) => {
	const time = roundAtPrecision(data.time, 10);
	const radius = roundAtPrecision(data.radius, 50);
	const speed = roundAtInversePrecision(data.speed, 10);
	const acceleration = roundAtInversePrecision(data.acceleration, 10);

	return { time, radius, speed, acceleration };
};

const parseEarthDensityPayload = (data: EarthDensityPayload) => {
	const radius = roundAtPrecision(data.radius, 50);
	const density = roundAtInversePrecision(data.density, 100);
	const mass = roundAtPrecision(data.mass, 1e22);
	const gravity = roundAtInversePrecision(data.gravity, 100);

	return { radius, density, mass, gravity };
};

export const MotionTooltip = ({
	payload,
	active,
	speed = false,
}: {
	payload?: { payload: MotionPayload }[];
	active?: boolean;
	speed?: boolean;
}) => {
	if (!active || !payload) {
		return null;
	}

	const data = payload[0].payload;
	const {
		time,
		radius,
		speed: speedVal,
		acceleration,
	} = parseMotionPayload(data);

	return (
		<div>
			<p>{`time: ${time}s`}</p>
			{speed ? (
				<>
					<p>{`speed: ${speedVal}km/s`}</p>
					<p>{`acceleration: ${acceleration}m/(s^2)`}</p>
				</>
			) : (
				<p>{`radius: ${radius}km`}</p>
			)}
		</div>
	);
};

export const EarthDensityTooltip = ({
	payload,
	active,
	dataKey,
}: {
	payload?: { payload: EarthDensityPayload }[];
	active?: boolean;
	dataKey?: string;
}) => {
	if (!active || !payload) {
		return null;
	}

	const data = payload[0].payload;
	const earth_layers: [number, string][] = [
		[6350, "Mantle"],
		[3500, "Outer Core"],
		[1200, "Inner Core"],
	];
	const { radius, density, mass, gravity } = parseEarthDensityPayload(data);

	let earth_layer = "Crust";
	for (const [r, part] of earth_layers) {
		if (radius < r) {
			earth_layer = part;
		}
	}

	return (
		<div>
			<p>{earth_layer}</p>
			<p>{`radius: ${radius}km`}</p>
			{dataKey === "density" && <p>{`density: ${density}`}</p>}
			{dataKey === "mass" && <p>{`mass: ${mass}kg`}</p>}
			{dataKey === "gravity" && <p>{`gravity: ${gravity}m/(s^2)`}</p>}
		</div>
	);
};
