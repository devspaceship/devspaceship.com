"use client";

import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { useDensityData } from "@/queries/elevator";
import { EarthDensityTooltip } from "./Tooltips";

type EarthDensityProps = {
	dataKey: string;
};

const EarthDensityChart = ({ dataKey }: EarthDensityProps) => {
	const { isPending, error, data } = useDensityData();

	if (isPending) return "Loading...";
	if (error) return "An error has occurred while loading the data";

	return (
		<ResponsiveContainer width="95%" height={400}>
			<LineChart width={400} height={400} data={data}>
				<Line type="monotone" dataKey={dataKey} stroke="#26c5de" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="radius" type="number" />
				<YAxis type="number" />
				<Tooltip
					content={<EarthDensityTooltip dataKey={dataKey} />}
					wrapperStyle={{ backgroundColor: "#222", padding: "8px" }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

function EarthDensity(props: EarthDensityProps) {
	return (
		<QueryClientProviderWrapper>
			<EarthDensityChart {...props} />
		</QueryClientProviderWrapper>
	);
}

export default EarthDensity;
