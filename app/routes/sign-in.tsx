import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { getAuthenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const authenticator = getAuthenticator(context);
	return await authenticator.isAuthenticated(request, {
		successRedirect: "/u",
	});
};

const Login = () => {
	return (
		<>
			<section className="flex flex-row items-center justify-center mt-4">
				<h1 className="text-2xl font-bold">SignIn</h1>
			</section>
			<section className="flex flex-row items-center justify-center mt-4">
				<Form method="post" action="/auth/google">
					<button type="submit">Sign In with Google</button>
				</Form>
			</section>
		</>
	);
};

export default Login;
