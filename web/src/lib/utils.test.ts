import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("handles conditional classes", () => {
		expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
	});

	it("merges Tailwind classes without conflicts", () => {
		expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
	});

	it("handles arrays of classes", () => {
		expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
	});

	it("handles objects with boolean values", () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
	});

	it("handles undefined and null values", () => {
		expect(cn("foo", undefined, "bar", null, "baz")).toBe("foo bar baz");
	});

	it("handles empty input", () => {
		expect(cn()).toBe("");
	});

	it("resolves Tailwind conflicts with last value winning", () => {
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("handles complex scenario with mixed inputs", () => {
		expect(
			cn(
				"base-class",
				{ "conditional-class": true, "hidden-class": false },
				["array-class-1", "array-class-2"],
				undefined,
				"final-class",
			),
		).toBe(
			"base-class conditional-class array-class-1 array-class-2 final-class",
		);
	});
});
