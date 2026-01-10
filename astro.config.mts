import starlight from '@astrojs/starlight';
import ui from '@studiocms/ui';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import rehypePlugins from './src/plugins/rehypePluginKit.ts';
import { getTranslations } from './src/starlight-sidebar/translate.ts';
import { devServerFileWatcher } from './src/integrations/dev-file-watcher.ts';
import { remarkFallbackLang } from './src/plugins/remark-fallback-pages.ts';
import starlightLlmsTxt from 'starlight-llms-txt';

// Define the Site URL
const site = process.env.DOKPLOY_DEPLOY_URL
	? `https://${process.env.DOKPLOY_DEPLOY_URL}`
	: 'https://docs.studiocms.dev/';

const linkValidator = process.env.CHECK_LINKS
	? [
		starlightLinksValidator({
			errorOnFallbackPages: false,
			errorOnInconsistentLocale: true,
			// Exclude the dynamically generated latest guide redirect page
			exclude: ['/*/guides/upgrade/latest/'],
		}),
	]
	: [];

export const locales = {
	en: { label: 'English', lang: 'en' },
	es: { label: 'Español', lang: 'es' },
	de: { label: 'Deutsch', lang: 'de' },
	// ja: { label: '日本語', lang: 'ja' },
	fr: { label: 'Français', lang: 'fr' },
	// it: { label: 'Italiano', lang: 'it' },
	// id: { label: 'Bahasa Indonesia', lang: 'id' },
	'zh-cn': { label: '简体中文', lang: 'zh-CN' },
	// 'pt-br': { label: 'Português do Brasil', lang: 'pt-BR' },
	// 'pt-pt': { label: 'Português', lang: 'pt-PT' },
	ko: { label: '한국어', lang: 'ko' },
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
		remarkPlugins: [remarkFallbackLang()],
	},
	integrations: [
		devServerFileWatcher([
			'./hostUtils.ts',
			'./typedoc.config.ts',
			'./starlight-types.ts',
			'./src/starlight-sidebar/*',
			'./src/content.ts',
			'./src/share-link.ts',
			'./src/util/*.ts',
			'./src/plugins/*.{ts,js}',
			'./src/integrations/*.ts',
		]),
		ui(),
		starlight({
			title: 'StudioCMS',
			description:
				'Dedicated SSR Astro native Headless CMS, build from the ground up for the Astro community and by Astro community members.',
			favicon: '/logo-light.svg',
			lastUpdated: true,
			credits: true,
			tagline:
				'Dedicated SSR Astro native Headless CMS, build from the ground up for the Astro community and by Astro community members.',
			disable404Route: true,
			pagefind: false,
			components: {
				SiteTitle: './src/starlightOverrides/SiteTitle.astro',
				PageTitle: './src/starlightOverrides/PageTitle.astro',
				Sidebar: './src/starlightOverrides/Sidebar.astro',
				Head: './src/starlightOverrides/Head.astro',
				Search: './src/starlightOverrides/Search.astro',
				PageSidebar: './src/starlightOverrides/PageSidebar.astro',
			},
			logo: {
				dark: './assets/logo-light.svg',
				light: './assets/logo-dark.svg',
			},
			defaultLocale: 'en',
			locales,
			social: [
				{ label: 'GitHub', icon: 'github', href: 'https://github.com/withstudiocms/studiocms' },
				{ label: 'Discord', icon: 'discord', href: 'https://chat.studiocms.dev' },
				{ label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@StudioCMS' },
				{ label: 'Twitter / X', icon: 'x.com', href: 'https://x.com/withstudiocms' },
				{ label: 'BlueSky', icon: 'blueSky', href: 'https://bsky.app/profile/studiocms.dev' },
				{
					label: 'Open Collective',
					icon: 'openCollective',
					href: 'https://opencollective.com/StudioCMS',
				},
				{
					label: 'Thanks.dev',
					icon: 'seti:json',
					href: 'https://thanks.dev/u/gh/withstudiocms',
				},
			],
			customCss: [
				'@studiocms/ui/css/global.css',
				'./src/styles/sponsorcolors.css',
				'./src/styles/starlight.css',
			],
			editLink: {
				baseUrl: 'https://github.com/withstudiocms/docs/tree/main',
			},
			head: [
				...(process.env.NODE_ENV === 'production'
					? [
						{
							tag: 'script' as const,
							attrs: {
								src: 'https://analytics.studiocms.cloud/script.js',
								'data-website-id': '2670ef85-9da5-4bc1-bac8-143b6c554c2c',
								defer: true,
							},
						},
					]
					: []),
				{
					tag: 'meta',
					attrs: {
						name: 'og:image',
						content: `${site}og.png`,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: `${site}og.png`,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:site',
						content: 'withstudiocms',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:creator',
						content: 'withstudiocms',
					},
				},
			],
			plugins: [
				...linkValidator,
				starlightLlmsTxt({
					description: 'StudioCMS is a Server-Side Rendered (SSR) Headless CMS built specifically for Astro. It is designed to seamlessly integrate with Astro projects, providing a robust and efficient content management solution that leverages Astro\'s strengths in performance and developer experience.',
					customSets: [
						{
							label: 'Getting Started',
							description: 'Essential resources to help you get up and running with StudioCMS quickly and effectively.',
							paths: ['en/start-here/**']
						}
					],
					exclude: [
						'**/guides/contributing/**',
					],
					rawContent: true,
				}),
				starlightImageZoom(),
				starlightSidebarTopics([
					{
						label: getTranslations('topic-learn'),
						link: '/start-here/getting-started/',
						icon: 'open-book',
						id: 'learn',
						items: [
							{
								label: getTranslations('start-here').en,
								translations: getTranslations('start-here'),
								autogenerate: { directory: 'start-here' },
							},
							{
								label: getTranslations('how-it-works').en,
								translations: getTranslations('how-it-works'),
								autogenerate: { directory: 'how-it-works' },
							},
							// TODO - Add Core Features section and 
							// document all built-in features and how they work
							{
								label: getTranslations('plugins').en,
								translations: getTranslations('plugins'),
								autogenerate: { directory: 'plugins' },
							},
							{
								label: getTranslations('storage-api').en,
								translations: getTranslations('storage-api'),
								autogenerate: { directory: 'storage-api' },
							},
							{
								label: getTranslations('utils').en,
								translations: getTranslations('utils'),
								autogenerate: { directory: 'utils' },
							},
						],
					},
					{
						label: getTranslations('topic-guides'),
						link: '/guides/',
						icon: 'rocket',
						id: 'guides',
						items: [
							{
								label: getTranslations('contributing').en,
								translations: getTranslations('contributing'),
								autogenerate: { directory: 'guides/contributing' },
							},
							{
								label: getTranslations('upgrade').en,
								translations: getTranslations('upgrade'),
								items: [
									{
										slug: 'guides/upgrade/release-notes',
									},
									{
										label: getTranslations('latest').en,
										translations: getTranslations('latest'),
										link: 'guides/upgrade/latest',
										badge: {
											text: 'Link',
											variant: 'note',
										},
									},
									{
										label: getTranslations('version').en,
										translations: getTranslations('version'),
										collapsed: true,
										autogenerate: { directory: 'guides/upgrade/version-guides' },
									},
								],
							},
							{
								label: getTranslations('custom-frontend').en,
								translations: getTranslations('custom-frontend'),
								autogenerate: { directory: 'guides/custom-frontend' },
							},
							{
								label: getTranslations('database').en,
								translations: getTranslations('database'),
								autogenerate: { directory: 'guides/database' },
							},
						],
					},
					{
						label: getTranslations('topic-package-catalog'),
						link: '/package-catalog/',
						icon: 'download',
						id: 'package-catalog',
						items: [
							{
								label: getTranslations('catalog').en,
								translations: getTranslations('catalog'),
								link: '/package-catalog',
							},
							{
								label: getTranslations('storage-managers').en,
								translations: getTranslations('storage-managers'),
								autogenerate: { directory: 'package-catalog/storage-managers' },
							},
							{
								label: getTranslations('studiocms-plugins').en,
								translations: getTranslations('studiocms-plugins'),
								autogenerate: { directory: 'package-catalog/studiocms-plugins' },
							},
							{
								label: getTranslations('community-plugins').en,
								translations: getTranslations('community-plugins'),
								autogenerate: { directory: 'package-catalog/community-plugins' },
							},
						],
					},
					{
						label: getTranslations('topic-references'),
						link: '/config-reference/',
						icon: 'information',
						id: 'references',
						items: [
							{
								label: getTranslations('config-reference').en,
								translations: getTranslations('config-reference'),
								autogenerate: { directory: 'config-reference' },
							},
						],
					},
				]),
			],
		}),
	],
});
