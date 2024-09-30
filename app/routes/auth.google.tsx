import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	redirect,
} from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);
	if (!user) return redirect("/sign-in");

	return redirect(`/u/${user.profileId}`);
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
	console.log("auth google");
	const authenticator = getAuthenticator(context);
	return await authenticator.authenticate("google", request, {
		successRedirect: "/u",
		failureRedirect: "/sign-in",
	});
};
