import { describe, expect, it } from "vitest";
import {
	applyMatrix4,
	getRot4,
	getTesseract,
	project,
} from "@/components/Tesseract/utils";

type Vector4 = [number, number, number, number];
type Matrix4 = [Vector4, Vector4, Vector4, Vector4];

/**
 * Helper function to assert that a matrix is close to expected values.
 * Compares each element with toBeCloseTo(expectedValue, 10).
 */
function expectMatrixToBeCloseTo(actual: Matrix4, expected: Matrix4) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			expect(actual[i][j]).toBeCloseTo(expected[i][j], 10);
		}
	}
}

describe("Tesseract utils", () => {
	describe("applyMatrix4", () => {
		it("applies identity matrix correctly", () => {
			const identity: Matrix4 = [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1],
			];
			const vector: Vector4 = [1, 2, 3, 4];
			const result = applyMatrix4(identity, vector);

			expect(result).toEqual([1, 2, 3, 4]);
		});

		it("applies rotation matrix", () => {
			const angle = Math.PI / 2;
			const rot: Matrix4 = [
				[Math.cos(angle), -Math.sin(angle), 0, 0],
				[Math.sin(angle), Math.cos(angle), 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1],
			];
			const vector: Vector4 = [1, 0, 0, 0];
			const result = applyMatrix4(rot, vector);

			expect(result[0]).toBeCloseTo(0, 10);
			expect(result[1]).toBeCloseTo(1, 10);
			expect(result[2]).toBe(0);
			expect(result[3]).toBe(0);
		});

		it("applies scaling matrix", () => {
			const scale: Matrix4 = [
				[2, 0, 0, 0],
				[0, 3, 0, 0],
				[0, 0, 4, 0],
				[0, 0, 0, 5],
			];
			const vector: Vector4 = [1, 1, 1, 1];
			const result = applyMatrix4(scale, vector);

			expect(result).toEqual([2, 3, 4, 5]);
		});

		it("handles zero vector", () => {
			const matrix: Matrix4 = [
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
				[13, 14, 15, 16],
			];
			const zero: Vector4 = [0, 0, 0, 0];
			const result = applyMatrix4(matrix, zero);

			expect(result).toEqual([0, 0, 0, 0]);
		});
	});

	describe("getTesseract", () => {
		it("generates correct number of vertices", () => {
			const { vertices } = getTesseract();

			expect(vertices).toHaveLength(16);
		});

		it("generates vertices with correct coordinates", () => {
			const { vertices } = getTesseract();

			vertices.forEach((vertex) => {
				expect(vertex).toHaveLength(4);
				vertex.forEach((coord) => {
					expect([-1, 1]).toContain(coord);
				});
			});
		});

		it("generates unique vertices", () => {
			const { vertices } = getTesseract();

			const uniqueVertices = new Set(vertices.map((v) => v.join(",")));
			expect(uniqueVertices.size).toBe(16);
		});

		it("generates correct number of edges", () => {
			const { edges } = getTesseract();

			expect(edges).toHaveLength(32);
		});

		it("edges connect adjacent vertices only", () => {
			const { vertices, edges } = getTesseract();

			edges.forEach(([i, j]) => {
				const v1 = vertices[i];
				const v2 = vertices[j];
				const differences = v1.filter((coord, idx) => coord !== v2[idx]).length;
				expect(differences).toBe(1);
			});
		});

		it("generates valid edge indices", () => {
			const { vertices, edges } = getTesseract();

			edges.forEach(([i, j]) => {
				expect(i).toBeGreaterThanOrEqual(0);
				expect(i).toBeLessThan(vertices.length);
				expect(j).toBeGreaterThanOrEqual(0);
				expect(j).toBeLessThan(vertices.length);
				expect(i).toBeLessThan(j);
			});
		});
	});

	describe("getRot4", () => {
		it("generates identity matrix when angles are zero", () => {
			const rot = getRot4(0, 0);
			const identity: Matrix4 = [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1],
			];

			expectMatrixToBeCloseTo(rot, identity);
		});

		it("rotates in XY plane with first angle", () => {
			const rot = getRot4(Math.PI / 2, 0);
			const expected: Matrix4 = [
				[0, -1, 0, 0],
				[1, 0, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1],
			];

			expectMatrixToBeCloseTo(rot, expected);
		});

		it("rotates in ZW plane with second angle", () => {
			const rot = getRot4(0, Math.PI / 2);
			const expected: Matrix4 = [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 0, -1],
				[0, 0, 1, 0],
			];

			expectMatrixToBeCloseTo(rot, expected);
		});

		it("combines rotations in both planes", () => {
			const rot = getRot4(Math.PI / 4, Math.PI / 4);

			expect(Math.abs(rot[0][0])).toBeGreaterThan(0);
			expect(Math.abs(rot[0][1])).toBeGreaterThan(0);
			expect(Math.abs(rot[2][2])).toBeGreaterThan(0);
			expect(Math.abs(rot[2][3])).toBeGreaterThan(0);
		});

		it("produces orthogonal rotation matrix", () => {
			const rot = getRot4(Math.PI / 5, Math.PI / 7);

			const dotR0R1 = rot[0].reduce((sum, val, i) => sum + val * rot[1][i], 0);
			const dotR2R3 = rot[2].reduce((sum, val, i) => sum + val * rot[3][i], 0);

			expect(dotR0R1).toBeCloseTo(0, 10);
			expect(dotR2R3).toBeCloseTo(0, 10);
		});
	});

	describe("project", () => {
		it("projects 4D vertices to 3D", () => {
			const vertices: Vector4[] = [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1, 0],
			];
			const d = 2;
			const result = project(vertices, d);

			expect(result).toHaveLength(3);
			result.forEach((v) => {
				expect(v).toHaveLength(3);
			});
		});

		it("handles vertices at different w depths", () => {
			const vertices: Vector4[] = [
				[1, 1, 1, 0],
				[1, 1, 1, 0.5],
				[1, 1, 1, 1],
			];
			const d = 2;
			const result = project(vertices, d);

			expect(result[0][0]).toBeLessThan(result[1][0]);
			expect(result[1][0]).toBeLessThan(result[2][0]);
		});

		it("preserves XYZ ratios for w=0", () => {
			const vertices: Vector4[] = [[2, 3, 4, 0]];
			const d = 2;
			const result = project(vertices, d);

			expect(result[0][0]).toBeCloseTo(2, 10);
			expect(result[0][1]).toBeCloseTo(3, 10);
			expect(result[0][2]).toBeCloseTo(4, 10);
		});

		it("handles negative w values", () => {
			const vertices: Vector4[] = [[1, 1, 1, -1]];
			const d = 2;
			const result = project(vertices, d);

			expect(result[0][0]).toBeCloseTo(2 / 3, 10);
			expect(result[0][1]).toBeCloseTo(2 / 3, 10);
			expect(result[0][2]).toBeCloseTo(2 / 3, 10);
		});
	});

	describe("integration: tesseract rotation and projection", () => {
		it("can rotate and project a tesseract", () => {
			const { vertices } = getTesseract();
			const rotMatrix = getRot4(0.5, 0.3);
			const rotated = vertices.map((v) => applyMatrix4(rotMatrix, v));
			const projected = project(rotated, 2);

			expect(projected).toHaveLength(16);
			projected.forEach((v) => {
				expect(v).toHaveLength(3);
				expect(v.every((coord) => Number.isFinite(coord))).toBe(true);
			});
		});

		it("maintains tesseract structure through transformation", () => {
			const { vertices } = getTesseract();
			const rotMatrix = getRot4(1.2, 0.7);

			const rotated = vertices.map((v) => applyMatrix4(rotMatrix, v));
			const uniqueRotated = new Set(rotated.map((v) => v.join(",")));
			expect(uniqueRotated.size).toBe(16);
		});
	});
});
