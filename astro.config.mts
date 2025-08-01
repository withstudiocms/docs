import starlight from '@astrojs/starlight';
import ui from '@studiocms/ui';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import getCoolifyURL from './hostUtils.ts';
import rehypePlugins from './src/plugins/rehypePluginKit.ts';
import { typeDocPlugins } from './typedoc.config.ts';
import { getTranslations } from './src/starlight-sidebar/translate.ts';
import { devServerFileWatcher } from './src/integrations/dev-file-watcher.ts';
import { remarkFallbackLang } from './src/plugins/remark-fallback-pages.ts';

// Define the Site URL
const site = getCoolifyURL(true) || 'https://docs.studiocms.dev/';

const linkValidator = process.env.CHECK_LINKS
	? [
			starlightLinksValidator({
				errorOnFallbackPages: false,
				errorOnInconsistentLocale: true,
				// Exclude TypeDoc paths as they contain auto-generated content with many internal links
				// Exclude the dynamically generated latest guide redirect page
				exclude: ['/*/typedoc/**/*', '/*/guides/upgrade/latest/'],
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
	trailingSlash: 'always',
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
			description: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			favicon: '/logo-light.svg',
			lastUpdated: true,
			credits: true,
			tagline: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			disable404Route: true,
			pagefind: false,
			components: {
				SiteTitle: './src/starlightOverrides/SiteTitle.astro',
				PageTitle: './src/starlightOverrides/PageTitle.astro',
				Sidebar: './src/starlightOverrides/Sidebar.astro',
				Head: './src/starlightOverrides/Head.astro',
				Search: './src/starlightOverrides/Search.astro',
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
				{
					tag: 'script',
					attrs: {
						src: 'https://analytics.studiocms.dev/script.js',
						'data-website-id': 'e924da68-f547-4dd2-bd2f-bcdd78cbcdab',
						defer: true,
					},
				},
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
				...typeDocPlugins,
				...linkValidator,
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
							{
								label: getTranslations('utils').en,
								translations: getTranslations('utils'),
								autogenerate: { directory: 'utils' },
							},
							{
								label: getTranslations('plugins').en,
								translations: getTranslations('plugins'),
								autogenerate: { directory: 'plugins' },
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
							{
								label: getTranslations('typedoc').en,
								translations: getTranslations('typedoc'),
								badge: {
									text: getTranslations('auto-gen'),
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
										label: '@studiocms/cloudinary-image-service',
										autogenerate: { directory: 'typedoc/studiocms-cloudinary-image-service' },
										collapsed: true,
									},
									{
										label: '@studiocms/devapps',
										autogenerate: { directory: 'typedoc/studiocms-devapps' },
										collapsed: true,
									},
									{
										label: '@studiocms/markdoc',
										autogenerate: { directory: 'typedoc/studiocms-markdoc' },
										collapsed: true,
									},
									{
										label: '@studiocms/md',
										autogenerate: { directory: 'typedoc/studiocms-md' },
										collapsed: true,
									},
									{
										label: '@studiocms/html',
										autogenerate: { directory: 'typedoc/studiocms-html' },
										collapsed: true,
									},
									{
										label: '@studiocms/mdx',
										autogenerate: { directory: 'typedoc/studiocms-mdx' },
										collapsed: true,
									},
									{
										label: '@studiocms/auth0',
										autogenerate: { directory: 'typedoc/studiocms-auth0' },
										collapsed: true,
									},
									{
										label: '@studiocms/discord',
										autogenerate: { directory: 'typedoc/studiocms-discord' },
										collapsed: true,
									},
									{
										label: '@studiocms/github',
										autogenerate: { directory: 'typedoc/studiocms-github' },
										collapsed: true,
									},
									{
										label: '@studiocms/google',
										autogenerate: { directory: 'typedoc/studiocms-google' },
										collapsed: true,
									},
									{
										label: '@withstudiocms/config-utils',
										autogenerate: { directory: 'typedoc/withstudiocms-config-utils' },
										collapsed: true,
									}
								],
							},
						],
					},
				]),
			],
		}),
	],
});
