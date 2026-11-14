import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			// your alias goes here
			"@": "./src",
			"@/index": "./src/index",
			"@/constants": "./src/constants",
			"@/types": "./src/types",
			"@/tests": "./src/tests",
		},
	},
});
