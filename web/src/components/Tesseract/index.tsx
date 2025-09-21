"use client";

import ConfigSlider from "ui/custom/ConfigSlider";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import { getRot4, getTesseract, applyMatrix4, project } from "./utils";
import { LineCurve3, Vector3 } from "three";

const D = 3.3;
const COLOR = "#b3d0ff";
const RADIUS = 0.09;

const TesseractDisplay = ({ alpha, beta }: { alpha: number; beta: number }) => {
	const { vertices: staticVertices, edges } = useMemo(getTesseract, []);
	const [tesseract, setTesseract] = useState(project(staticVertices, D));
	const rotationParams = useRef({ a: 0, b: 0, t: 0 });

	useFrame((state) => {
		const t = state.clock.elapsedTime;
		const { a, b, t: oldT } = rotationParams.current;
		const delta = t - oldT;
		rotationParams.current = { a: a + delta * alpha, b: b + delta * beta, t };
		const rotation = getRot4(a, b);
		const rotatedTesseract = staticVertices.map((point) =>
			applyMatrix4(rotation, point),
		);
		setTesseract(project(rotatedTesseract, D));
	});

	return (
		<>
			<ambientLight intensity={0.4} color={COLOR} />
			<pointLight position={[5, 5, 5]} color={COLOR} />
			{tesseract.map((point, index) => {
				return (
					<mesh position={point} key={index}>
						<sphereGeometry args={[RADIUS]} />
						<meshStandardMaterial />
					</mesh>
				);
			})}
			{edges.map((edge, index) => {
				const [a, b] = edge;
				return (
					<mesh position={[0, 0, 0]} key={index}>
						<tubeGeometry
							args={[
								new LineCurve3(
									new Vector3(...tesseract[a]),
									new Vector3(...tesseract[b]),
								),
								1,
								RADIUS,
							]}
						/>
						<meshStandardMaterial />
					</mesh>
				);
			})}
		</>
	);
};

const Tesseract = () => {
	const [alpha, setAlpha] = useState(0.3);
	const [beta, setBeta] = useState(0.7);

	const config = [
		{
			name: "alpha",
			label: "α",
			value: alpha,
			setValue: setAlpha,
		},
		{
			name: "beta",
			label: "β",
			value: beta,
			setValue: setBeta,
		},
	];

	return (
		<>
			<Canvas style={{ height: "400px" }} camera={{ position: [4, 2, 1] }}>
				<TesseractDisplay alpha={alpha} beta={beta} />
			</Canvas>
			<div className="flex justify-evenly text-center">
				{config.map(({ name, label, value, setValue }) => (
					<ConfigSlider
						key={name}
						id={name}
						label={label ? label : name}
						min={0}
						max={1}
						step={0.05}
						value={value}
						onValueChange={(value) => setValue(value)}
					/>
				))}
			</div>
		</>
	);
};

export default Tesseract;
