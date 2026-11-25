import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
	resolve: {
		alias: {
			"@/sample-data": resolve(__dirname, "src/utils/sample-data.ts"),
			"@": resolve(__dirname, "src"),
		},
	},
});
