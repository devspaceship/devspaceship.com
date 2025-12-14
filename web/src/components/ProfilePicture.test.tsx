import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ProfilePicture from "@/components/ProfilePicture";

test("ProfilePicture", () => {
	render(<ProfilePicture />);
	expect(screen.getByAltText("The author")).toBeDefined();
});
