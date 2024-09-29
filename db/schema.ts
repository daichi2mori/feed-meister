import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	profileId: text("profileId").notNull(),
	username: text("username").notNull(),
});
