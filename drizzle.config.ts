import type { Config } from "drizzle-kit";

export default {
	schema: "./db/schema.ts",
	out: "./db/migrate",
	dialect: "sqlite",
} satisfies Config;
