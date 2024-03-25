import type { Config } from "drizzle-kit"

export default {
	schema: "./src/data/turso/schemas.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		authToken: "",
		url: "",
	},
} satisfies Config
