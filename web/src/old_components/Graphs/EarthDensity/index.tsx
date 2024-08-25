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

type EarthDensityProps = {
  dataKey: string;
};

const EarthDensityChart = (props: EarthDensityProps) => {
  const { isPending, error, data } = useDensityData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred while loading the data";

  const CustomTooltip = ({
    payload,
    active,
  }: {
    payload?: {
      payload: {
        radius: number;
        density: number;
        mass: number;
        gravity: number;
      };
    }[];
    active?: unknown;
  }) => {
    if (!active || !payload) {
      return null;
    }

    const earth_layers: [number, string][] = [
      [6350, "Mantle"],
      [3500, "Outer Core"],
      [1200, "Inner Core"],
    ];

    const data = payload[0].payload;
    const radius = Math.round(data.radius / 50) * 50;
    const density = Math.round(data.density * 100) / 100;
    const mass = Math.round(data.mass / 1e22) * 1e22;
    const gravity = Math.round(data.gravity * 100) / 100;

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
        {props.dataKey == "density" ? <p>{`density: ${density}`}</p> : null}
        {props.dataKey == "mass" ? <p>{`mass: ${mass}kg`}</p> : null}
        {props.dataKey == "gravity" ? (
          <p>{`gravity: ${gravity}m/(s^2)`}</p>
        ) : null}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey={props.dataKey} stroke="#26c5de" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="radius" type="number" />
        <YAxis type="number" />
        <Tooltip
          content={<CustomTooltip />}
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
