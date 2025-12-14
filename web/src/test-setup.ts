import React from "react";
import { vi } from "vitest";

// Mock Next.js Image component
vi.mock("next/image", () => ({
	default: (props: {
		src: string | { src: string };
		alt: string;
		[key: string]: unknown;
	}) => {
		const imgSrc = typeof props.src === "string" ? props.src : props.src.src;
		return React.createElement("img", {
			src: imgSrc,
			alt: props.alt,
		});
	},
}));
