import { type LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	console.log("user");
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);
	if (!user) return redirect("/sign-in");

	return redirect(`/u/${user.profileId}`);
};
