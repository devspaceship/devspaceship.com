import { SetStateAction, useEffect, useState } from "react";
import Papa from "papaparse";
// import * as d3 from "d3";
// import {select} from "d3-selection";

// import LineChart from '../LineChart';

import { LineChart, Line } from "recharts";
const data = [
  { value: 0 },
  { value: 1 },
  { value: 4 },
  { value: 9 },
  { value: 16 },
  { value: 25 },
];

const EarthDensity = () => {
  const [data, setData] = useState([
    { density: 0 },
    { density: 1 },
    { density: 4 },
    { density: 9 },
    { density: 16 },
    { density: 25 },
  ]);

  const dataEffect = async () => {
    const raw_res = await fetch("/static/posts/elevator/density.csv");
    const res = await raw_res.text();
    const data_object = Papa.parse(res, { header: true, dynamicTyping: true });
    const data = data_object.data.slice(0, -1);
    setData(
      data as SetStateAction<
        {
          density: number;
        }[]
      >
    );
  };

  useEffect(() => {
    dataEffect();
  }, []);

  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="density" stroke="#8884d8" />
    </LineChart>
  );
};

export default EarthDensity;
