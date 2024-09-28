import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
	return [
		{ title: "Feed Meister" },
		{ name: "description", content: "RSSリーダー" },
	];
};

export default function Index() {
	return (
		<main>
			<div>feed meister</div>
		</main>
	);
}
