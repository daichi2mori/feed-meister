import { AppLoadContext } from "@remix-run/cloudflare";
import { feeds, subscriptions, users } from "db/schema";
import { and, eq } from "drizzle-orm";
import { createClientDB } from "./db.server";

export const addFeed = async (
	context: AppLoadContext,
	userId: string,
	url: string,
) => {
	try {
		const db = createClientDB(context.cloudflare.env.DB);

		const user = await db
			.select()
			.from(users)
			.where(eq(users.profileId, userId))
			.get();

		if (!user) return;

		let feed = await db
			.select()
			.from(feeds)
			.where(eq(feeds.url, url))
			.limit(1)
			.get();

		if (!feed) {
			feed = await db.insert(feeds).values({ url: url }).returning().get();
		}

		const subscriptionExist = await db
			.select()
			.from(subscriptions)
			.where(
				and(
					eq(subscriptions.feed_id, feed.id),
					eq(subscriptions.user_id, user.id),
				),
			)
			.limit(1)
			.get();

		if (subscriptionExist) return;

		await db.insert(subscriptions).values({
			user_id: user.id,
			feed_id: feed.id,
		});
	} catch (e) {
		console.log(e);
	}
};
