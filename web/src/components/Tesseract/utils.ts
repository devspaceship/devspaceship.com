type Vector3 = [number, number, number];
type Vector4 = [number, number, number, number];
type Matrix4 = [Vector4, Vector4, Vector4, Vector4];

const cartesianProduct = <T>(...sets: T[][]): T[][] =>
	sets.reduce<T[][]>(
		(acc, set) => acc.flatMap((res) => set.map((element) => [...res, element])),
		[[]],
	);

const dotProduct = (a: number[], b: number[]) =>
	a.reduce((acc, _, i) => acc + a[i] * b[i], 0);

export const applyMatrix4 = (a: Matrix4, b: Vector4): Vector4 =>
	a.map((row) => dotProduct(row, b)) as Vector4;

export const getTesseract = () => {
	const vertices = cartesianProduct(
		[-1, 1],
		[-1, 1],
		[-1, 1],
		[-1, 1],
	) as Vector4[];
	const edges = [];
	for (let i = 0; i < vertices.length; i++) {
		for (let j = i + 1; j < vertices.length; j++) {
			if (dotProduct(vertices[i], vertices[j]) == 2) {
				edges.push([i, j]);
			}
		}
	}
	return { vertices, edges };
};

export const getRot4 = (a: number, b: number): Matrix4 => [
	[Math.cos(a), -Math.sin(a), 0, 0],
	[Math.sin(a), Math.cos(a), 0, 0],
	[0, 0, Math.cos(b), -Math.sin(b)],
	[0, 0, Math.sin(b), Math.cos(b)],
];

export const project = (vertices: Vector4[], d: number) =>
	vertices.map(
		(v) => v.slice(0, 3).map((x) => (x * d) / (d - v[3])) as Vector3,
	);
