import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": './src',
			"@/index": "./src/index",
			"@/types": "./src/types",
			"@/sample-data": "./src/sample-data",
			"@/tests": "./src/tests",
		},
	},
});
