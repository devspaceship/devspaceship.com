import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./__tests__/setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "clover"],
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				".next/**",
				".swc/**",
				"__tests__/**",
				"coverage/**",
				"node_modules/**",
				"**/*.config.*",
				"**/*.d.ts",
			],
		},
	},
});
