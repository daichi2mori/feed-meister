import { drizzle } from "drizzle-orm/d1";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const createClientDB = (db: D1Database) => {
	return drizzle(db);
};
