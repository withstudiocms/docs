import type { AstroGlobal } from 'astro';

type RepoListItem = {
	repo: string;
	type: 'all' | 'byPath';
	paths?: string[];
};

type ContributorConfig = {
	name: string;
	list: RepoListItem[];
};

export const StudioCMSServiceAccounts: string[] = ['studiocms-no-reply'];

export const contributorConfig = (Astro: AstroGlobal): ContributorConfig[] => [
	{
		name: Astro.locals.t('contributors.core-packages'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: [
					// OLD Paths
					'packages/studioCMS/',
					'playgrounds/node/',
					// NEW Paths
					'README.md',
					'playground/',
					'packages/studiocms/',
					'packages/studiocms_assets/',
					'packages/studiocms_auth/',
					'packages/studiocms_betaresources/',
					'packages/studiocms_core/',
					'packages/studiocms_dashboard/',
					'packages/studiocms_frontend/',
					'packages/studiocms_imagehandler/',
					'packages/studiocms_renderers/',
					'packages/studiocms_robotstxt/',
				],
			},
		],
	},
	{
		name: Astro.locals.t('contributors.ui-library'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: ['packages/studiocms_ui/', 'playgrounds/ui/'],
			},
			{
				repo: 'withstudiocms/ui',
				type: 'all',
			},
		],
	},
	{
		name: Astro.locals.t('contributors.devapps'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: ['packages/studiocms_devapps/'],
			},
		],
	},
	{
		name: Astro.locals.t('contributors.plugins'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: [
					// OLD Paths
					'packages/studioCMSBlog/',
					// NEW Paths
					'packages/studiocms_blog/',
					'packages/studiocms_mdx/',
					'packages/studiocms_markdoc/',
				],
			},
		],
	},
	{
		name: Astro.locals.t('contributors.documentation'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: ['www/docs/', 'docs/'],
			},
			{
				repo: 'withstudiocms/docs',
				type: 'all',
			},
		],
	},
	{
		name: Astro.locals.t('contributors.website'),
		list: [
			{
				repo: 'withstudiocms/studiocms',
				type: 'byPath',
				paths: ['www/web/'],
			},
			{
				repo: 'withstudiocms/studiocms.dev',
				type: 'all',
			},
		],
	},
	{
		name: Astro.locals.t('contributors.bots'),
		list: [
			{
				repo: 'withstudiocms/apollo',
				type: 'all',
			},
		],
	},
];
