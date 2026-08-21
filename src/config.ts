import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "AI 工具研究所",
	subtitle: "发现好用的 AI 工具与软件",
	lang: "zh_CN",
	themeColor: {
		hue: 190,
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png",
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{ src: "/favicon/favicon-light-32.png", theme: "light", sizes: "32x32" },
		{ src: "/favicon/favicon-dark-32.png", theme: "dark", sizes: "32x32" },
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		{ name: "AI 工具", url: "/tools/" },
		{ name: "文章", url: "/archive/" },
		{ name: "资源导航", url: "/resources/" },
		LinkPreset.About,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png",
	name: "AI 工具研究所",
	bio: "持续测评 AI 工具与高效软件，记录真实体验与使用方法。",
	links: [{ name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/" }],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
