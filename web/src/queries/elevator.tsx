import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";

export type DataRow = {
	radius: number;
	density: number;
	mass: number;
	gravity: number;
};

export const useDensityData = () => {
	return useQuery({
		queryKey: ["densityData"],
		queryFn: async () => {
			const rows = await fetchParse("/static/posts/elevator/density.csv");
			for (const row of rows) {
				row.mass = Number(row.mass);
			}
			return rows;
		},
	});
};

export const useMotionData = () => {
	return useQuery({
		queryKey: ["motionData"],
		queryFn: async () => {
			return await fetchParse("/static/posts/elevator/motion.csv");
		},
	});
};

const fetchParse = async (url: string) => {
	const response = await fetch(url);
	const text = await response.text();
	const data = Papa.parse(text, { header: true, dynamicTyping: true });
	return data.data.slice(0, -1) as DataRow[];
};
