import { html } from '@lunariajs/core';
import { defineConfig } from '@lunariajs/core/config';
import { lunariaLocales } from './i18n';

export default defineConfig({
	repository: {
		name: 'withstudiocms/docs',
		hosting: 'github',
		branch: 'main',
	},
	sourceLocale: {
		label: 'English',
		lang: 'en',
		parameters: {
			tag: 'en',
		},
	},
	locales: lunariaLocales,
	files: [
		{
			include: ['src/content/i18n/*.json'],
			pattern: 'src/content/i18n/@lang.json',
			type: 'dictionary',
		},
		{
			include: ['src/starlight-sidebar/*.json'],
			pattern: 'src/starlight-sidebar/@lang.json',
			type: 'dictionary',
		},
		{
			include: ['src/content/docs/**/*.(md|mdx)'],
			exclude: ['src/content/docs/en/api-doc/**/*.(md|mdx)'],
			pattern: 'src/content/docs/@lang/@path',
			type: 'universal',
		},
	],
	tracking: {
		localizableProperty: 'i18nReady',
		ignoredKeywords: [
			'lunaria-ignore',
			'typo',
			'en-only',
			'broken link',
			'i18nReady',
			'i18nIgnore',
		],
	},
	dashboard: {
		title: 'StudioCMS Docs Translation Status',
		description:
			'Translation progress tracker for the StudioCMS Docs site. See how much has been translated in your language and get involved!',
		site: 'https://i18n.docs.studiocms.dev/',
		basesToHide: ['src/content/docs/', 'src/content/i18n/'],
		customCss: ['./lunaria/styles.css'],
		favicon: {
			external: [{ link: 'https://studiocms.dev/favicon.svg', type: 'image/svg+xml' }],
		},
	},
	renderer: {
		slots: {
			head: () => html`
				<meta property="last-build" content="${new Date().toString()}" />
				<meta property="og:image" content="https://i18n.docs.studiocms.dev/summary.png" />
			`,
			afterTitle: () => html`
				<p>
					If you're interested in helping us translate
					<a href="https://docs.studiocms.dev/">docs.studiocms.dev</a> into one of the languages
					listed below, you've come to the right place! This auto-updating page always lists all
					the content that could use your help right now.
				</p>
			`,
		},
	},
});
