import starlight from '@astrojs/starlight';
// import starWarp from '@inox-tools/star-warp';
import ui from '@studiocms/ui';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import getCoolifyURL from './hostUtils.ts';
import rehypePlugins from './src/plugins/rehypePluginKit.ts';
import { typeDocPlugins } from './typedoc.config.ts';
import starlightDocSearch from '@astrojs/starlight-docsearch';
import sidebarEN from './starlight-sidebar/en.json';

// Define the Site URL
const site = getCoolifyURL(true) || 'https://docs.studiocms.dev/';

export const locales = {
	root: { label: 'English', lang: 'en' },
	es: { label: 'Español', lang: 'es' },
	// de: { label: 'Deutsch', lang: 'de' },
	// ja: { label: '日本語', lang: 'ja' },
	// fr: { label: 'Français', lang: 'fr' },
	// it: { label: 'Italiano', lang: 'it' },
	// id: { label: 'Bahasa Indonesia', lang: 'id' },
	// 'zh-cn': { label: '简体中文', lang: 'zh-CN' },
	// 'pt-br': { label: 'Português do Brasil', lang: 'pt-BR' },
	// 'pt-pt': { label: 'Português', lang: 'pt-PT' },
	// ko: { label: '한국어', lang: 'ko' },
	// tr: { label: 'Türkçe', lang: 'tr' },
	// ru: { label: 'Русский', lang: 'ru' },
	// hi: { label: 'हिंदी', lang: 'hi' },
	// da: { label: 'Dansk', lang: 'da' },
	// uk: { label: 'Українська', lang: 'uk' },
};

export default defineConfig({
	site,
	image: {
		remotePatterns: [{ protocol: 'https' }],
	},
	markdown: {
		rehypePlugins,
	},
	integrations: [
		ui(),
		starlight({
			title: 'StudioCMS',
			description: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			favicon: '/logo-light.svg',
			lastUpdated: true,
			credits: true,
			tagline: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			disable404Route: true,
			components: {
				SiteTitle: './src/starlightOverrides/SiteTitle.astro',
				PageTitle: './src/starlightOverrides/PageTitle.astro',
				Sidebar: './src/starlightOverrides/Sidebar.astro',
				Head: './src/starlightOverrides/Head.astro',
			},
			logo: {
				dark: './assets/logo-light.svg',
				light: './assets/logo-dark.svg',
			},
			defaultLocale: 'root',
			locales,
			social: {
				github: 'https://github.com/withstudiocms/studiocms',
				discord: 'https://chat.studiocms.dev',
				youtube: 'https://www.youtube.com/@StudioCMS',
				'x.com': 'https://x.com/withstudiocms',
				blueSky: 'https://bsky.app/profile/studiocms.dev',
				openCollective: 'https://opencollective.com/StudioCMS',
			},
			customCss: [
				'@studiocms/ui/css/global.css',
				'./src/styles/sponsorcolors.css',
				'./src/styles/starlight.css',
			],
			editLink: {
				baseUrl: 'https://github.com/withstudiocms/docs/tree/main',
			},
			head: [
				// {
				// 	tag: 'script',
				// 	attrs: {
				// 		src: 'https://analytics.studiocms.xyz/script.js',
				// 		'data-website-id': '00717cde-0d92-42be-8f49-8de0b1d810b2',
				// 		defer: true,
				// 	},
				// },
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: `${site}og.png`,
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'twitter:image',
						content: `${site}og.png`,
					},
				},
			],
			plugins: [
				...typeDocPlugins,
				starlightImageZoom(),
				// starWarp({
				// 	openSearch: {
				// 		title: 'StudioCMS Docs',
				// 		description: 'Search StudioCMS documentation',
				// 		enabled: true,
				// 	},
				// }),
				starlightDocSearch({
					appId: 'UAGEFSNZ02',
					apiKey: '2db78946b26c84e691bbbd2e7db7e6a8',
					indexName: 'studiocms',
				}),
				starlightSidebarTopics([
					{
						label: {
							en: sidebarEN.learn,
						},
						link: '/start-here/getting-started',
						icon: 'open-book',
						id: 'learn',
						items: [
							{
								label: sidebarEN['start-here'],
								translations: {},
								autogenerate: { directory: 'start-here' },
							},
							{
								label: sidebarEN.contributing,
								translations: {},
								autogenerate: { directory: 'contributing' },
							},
							{
								label: sidebarEN['how-it-works'],
								translations: {},
								autogenerate: { directory: 'how-it-works' },
							},
							{
								label: sidebarEN.utils,
								translations: {},
								autogenerate: { directory: 'utils' },
							},
							{
								label: sidebarEN.plugins,
								translations: {},
								autogenerate: { directory: 'plugins' },
							},
						],
					},
					{
						label: {
							en: sidebarEN['package-catalog'],
						},
						link: '/package-catalog',
						icon: 'download',
						id: 'package-catalog',
						items: [
							{
								label: sidebarEN.catalog,
								translations: {},
								link: '/package-catalog',
							},
							{
								label: sidebarEN['studiocms-plugins'],
								translations: {},
								autogenerate: { directory: 'package-catalog/studiocms-plugins' },
							},
							{
								label: sidebarEN['community-plugins'],
								translations: {},
								autogenerate: { directory: 'package-catalog/community-plugins' },
							},
						],
					},
					{
						label: {
							en: sidebarEN.references,
						},
						link: '/config-reference',
						icon: 'information',
						id: 'references',
						items: [
							{
								label: sidebarEN['config-reference'],
								translations: {},
								autogenerate: { directory: 'config-reference' },
							},
							{
								label: sidebarEN.typedoc,
								translations: {},
								badge: {
									text: sidebarEN['auto-gen'],
									variant: 'tip',
								},
								items: [
									{
										label: 'studiocms',
										autogenerate: { directory: 'typedoc/studiocms' },
										collapsed: true,
									},
									{
										label: '@studiocms/blog',
										autogenerate: { directory: 'typedoc/studiocms-blog' },
										collapsed: true,
									},
									{
										label: '@studiocms/devapps',
										autogenerate: { directory: 'typedoc/studiocms-devapps' },
										collapsed: true,
									},
								],
							},
						],
					},
				]),
			],
		}),
	],
});
