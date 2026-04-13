import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const DARK_MODE_SCRIPT = `(function(){var mq=window.matchMedia('(prefers-color-scheme: dark)');function apply(e){document.documentElement.classList.toggle('dark',e.matches)}apply(mq);mq.addEventListener('change',apply);})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ name: "theme-color", content: "#18181b" },
			{ title: "ESO Crafting Researcher" },
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Federo&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
			},
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/x-icon", href: `${import.meta.env.BASE_URL}favicon.ico` },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: `${import.meta.env.BASE_URL}favicon-32x32.png` },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: `${import.meta.env.BASE_URL}favicon-16x16.png` },
			{ rel: "apple-touch-icon", sizes: "180x180", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
			{ rel: "manifest", href: `${import.meta.env.BASE_URL}site.webmanifest` },
		],
	}),

	shellComponent: RootDocument,
	component: RootComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: intentional — inline script for flicker-free dark mode before first paint */}
				<script dangerouslySetInnerHTML={{ __html: DARK_MODE_SCRIPT }} />
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootComponent() {
	return <Outlet />;
}
