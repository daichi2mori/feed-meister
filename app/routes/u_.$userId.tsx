import { type LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { getAuthenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);

	if (!user) return redirect("/sign-in");

	return json({ user });
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
		</>
	);
};

export default User;
