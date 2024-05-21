"use client";

import ConfigSlider from "@/components/ui/custom/ConfigSlider";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import { getRot4, getTesseract, applyMatrix4, project } from "./utils";
import { LineCurve3, Vector3 } from "three";

const D = 3.3;

const TesseractDisplay = ({ alpha, beta }: { alpha: number; beta: number }) => {
  const { vertices: staticVertices, edges } = useMemo(getTesseract, []);
  const [tesseract, setTesseract] = useState(project(staticVertices, D));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const rotation = getRot4((t * alpha) / 25, (t * beta) / 25);
    const rotatedTesseract = staticVertices.map((point) =>
      applyMatrix4(rotation, point)
    );
    setTesseract(project(rotatedTesseract, D));
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      {tesseract.map((point, index) => {
        return (
          <mesh position={point} key={index}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color={"#0c8bb9"} />
          </mesh>
        );
      })}
      {edges.map((edge, index) => {
        const [a, b] = edge;
        const vec_a = new Vector3(...tesseract[a]);
        const vec_b = new Vector3(...tesseract[b]);
        const connection_line = new LineCurve3(vec_a, vec_b);

        return (
          <mesh position={[0, 0, 0]} key={index}>
            <tubeGeometry args={[connection_line, 1, 0.1]} />
            {/* TODO change color to use Theme */}
            <meshStandardMaterial color={"#1eaedb"} />
          </mesh>
        );
      })}
    </>
  );
};

const Tesseract = () => {
  const [alpha, setAlpha] = useState(10);
  const [beta, setBeta] = useState(12);

  const config = [
    {
      name: "alpha",
      label: "α",
      min: 1,
      max: 15,
      value: alpha,
      setValue: setAlpha,
    },
    {
      name: "beta",
      label: "β",
      min: 1,
      max: 15,
      value: beta,
      setValue: setBeta,
    },
  ];

  return (
    <>
      <Canvas style={{ height: "400px" }} camera={{ position: [5, 0, 0] }}>
        <TesseractDisplay alpha={alpha} beta={beta} />
      </Canvas>
      <div className="flex justify-evenly">
        {config.map(({ name, label, min, max, value, setValue }) => (
          <ConfigSlider
            key={name}
            id={name}
            label={label ? label : name}
            min={min}
            max={max}
            value={value}
            onValueChange={(value) => setValue(value)}
          />
        ))}
      </div>
    </>
  );
};

export default Tesseract;
