import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { getAuthenticator } from "~/services/auth.server";
import { addFeed } from "~/services/feed.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);

	if (!user) return redirect("/sign-in");

	return json({ user });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);

	if (!user) return redirect("/sign-in");

	const formData = await request.formData();
	const submittedUrl = formData.get("url");

	if (!submittedUrl) return null;

	const normalizedUrl = submittedUrl.toString().endsWith("/")
		? submittedUrl.slice(0, -1)
		: submittedUrl;

	await addFeed(context, user.profileId, normalizedUrl.toString());

	return null;
};

const User = () => {
	const { user } = useLoaderData<typeof loader>();

	return (
		<>
			<div>
				<h1>{user.username}</h1>
			</div>
			<div>
				<p>{user.profileId}</p>
			</div>
			<Form method="post" action="/auth/logout">
				<button type="submit">Logout</button>
			</Form>

			<Form method="post" action={`/u/${user.id}`}>
				<input name="url" type="text" />
				<button type="submit">登録</button>
			</Form>
		</>
	);
};

export default User;
