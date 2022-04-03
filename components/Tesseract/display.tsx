import { Canvas, useFrame } from "@react-three/fiber";
import React, { FC, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { matrix } from "../Gridworld/gridworld-solvers";
import { get_tesseract, get_rot4, matmul, project_tesseract } from "./matrix";
import type { Params } from "./types";

const Tesseract = (props: DisplayProps) => {
  const { params } = props;
  const tesseract = useMemo(() => get_tesseract(), []);
  const [projected_tesseract, set_projected_tesseract] = useState(
    project_tesseract(tesseract.points, params.d / 50)
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const rotation = get_rot4((t * params.alpha) / 25, (t * params.beta) / 25);
    const rotated_tesseract = tesseract.points.map((point) =>
      matmul(rotation, point)
    );
    set_projected_tesseract(
      project_tesseract(rotated_tesseract, params.d / 75)
    );
  });

  return (
    <>
      {projected_tesseract.map((point, index) => {
        const [x, y, z] = point;
        return (
          <mesh position={[z, y, x]} key={index}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color={"#0c8bb9"} />
          </mesh>
        );
      })}
      {tesseract.connections.map((connection, index) => {
        const [x_a, y_a, z_a] = projected_tesseract[connection[0]];
        const [x_b, y_b, z_b] = projected_tesseract[connection[1]];
        const vec_a = new THREE.Vector3(z_a, y_a, x_a);
        const vec_b = new THREE.Vector3(z_b, y_b, x_b);
        const connection_line = new THREE.LineCurve3(vec_a, vec_b);

        return (
          <mesh position={[0, 0, 0]} key={index}>
            <tubeGeometry args={[connection_line, 1, 0.1]} />
            <meshStandardMaterial color={"#1eaedb"} />
          </mesh>
        );
      })}
    </>
  );
};

interface DisplayProps {
  params: Params;
}

const Display: FC<DisplayProps> = (props) => {
  const { params } = props;

  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Tesseract params={params} />
    </Canvas>
  );
};

export default Display;

// TODO Refactor this mess + matrix.ts
