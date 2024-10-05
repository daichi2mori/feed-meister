import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id", { mode: "number" })
		.primaryKey({ autoIncrement: true })
		.notNull(),
	profileId: text("profileId").notNull(),
	username: text("username").notNull(),
});

export const feeds = sqliteTable("feeds", {
	id: integer("id", { mode: "number" })
		.primaryKey({ autoIncrement: true })
		.notNull(),
	url: text("url").unique().notNull(),
	last_modified: text("last_modified")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	last_checked: text("last_modified")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
});

export const subscriptions = sqliteTable(
	"subscription",
	{
		id: integer("id", { mode: "number" })
			.primaryKey({ autoIncrement: true })
			.notNull(),
		user_id: integer("user_id")
			.notNull()
			.references(() => users.id),
		feed_id: integer("feed_id")
			.notNull()
			.references(() => feeds.id),
	},
	(table) => {
		return {
			userIdx: index("user_idx").on(table.user_id),
			feedIdx: index("feed_idx").on(table.feed_id),
		};
	},
);
