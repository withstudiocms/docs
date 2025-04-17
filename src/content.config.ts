import { defineCollection, reference, z, type CollectionEntry } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { topicSchema } from 'starlight-sidebar-topics/schema';

const packageCatalogSchema = z.object({
	name: z.string(),
	description: z.string(),
	docsLink: z.string(),
	githubURL: z.string(),
	catalog: z
		.union([z.literal('studiocms'), z.literal('community'), z.literal('internal')])
		.optional()
		.default('studiocms'),
	isPlugin: z.boolean().optional().default(false),
	publiclyUsable: z.boolean().optional().default(false),
	released: z.boolean().optional().default(true),
});

const baseSchema = topicSchema.extend({
	type: z.literal('base').optional().default('base'),
	i18nReady: z.boolean().optional().default(false),
});

const integrationSchema = baseSchema.extend({
	type: z.literal('integration'),
	catalogEntry: reference('package-catalog'),
	replaceTitle: z.boolean().optional().default(true),
});

const redirectSchema = baseSchema.extend({
	type: z.literal('redirect'),
	redirect: z.string(),
});

const i18nCustomSchema = z.object({
	'site-title.labels.docs': z.string().optional(),
	'site-title.labels.main-site': z.string().optional(),
	'site-title.labels.live-demo': z.string().optional(),
	'sponsors.sponsoredby': z.string().optional(),
	'package-catalog.readmore.start': z.string().optional(),
	'package-catalog.readmore.end': z.string().optional(),
	'quick-update': z.string().optional(),
	'integration-labels.changelog': z.string().optional(),
	'contributors.core-packages': z.string().optional(),
	'contributors.ui-library': z.string().optional(),
	'contributors.devapps': z.string().optional(),
	'contributors.plugins': z.string().optional(),
	'contributors.documentation': z.string().optional(),
	'contributors.website': z.string().optional(),
	'contributors.bots': z.string().optional(),
	// SEARCH BOX
	'docsearch.button': z.string().optional(),
	'docsearch.shortcutLabel': z.string().optional(),
	'docsearch.placeholder': z.string().optional(),
	/** Default: `Clear the query` */
	'docsearch.searchBox.resetButtonTitle': z.string(),
	/** Default: `Clear the query` */
	'docsearch.searchBox.resetButtonAriaLabel': z.string(),
	/** Default: `Cancel` */
	'docsearch.searchBox.cancelButtonText': z.string(),
	/** Default: `Cancel` */
	'docsearch.searchBox.cancelButtonAriaLabel': z.string(),
	/** Default: `Search` */
	'docsearch.searchBox.searchInputLabel': z.string(),

	// START SCREEN
	/** Default: `Recent` */
	'docsearch.startScreen.recentSearchesTitle': z.string(),
	/** Default: `No recent searches` */
	'docsearch.startScreen.noRecentSearchesText': z.string(),
	/** Default: `Save this search` */
	'docsearch.startScreen.saveRecentSearchButtonTitle': z.string(),
	/** Default: `Remove this search from history` */
	'docsearch.startScreen.removeRecentSearchButtonTitle': z.string(),
	/** Default: `Favorite` */
	'docsearch.startScreen.favoriteSearchesTitle': z.string(),
	/** Default: `Remove this search from favorites` */
	'docsearch.startScreen.removeFavoriteSearchButtonTitle': z.string(),

	// ERROR SCREEN
	/** Default: `Unable to fetch results` */
	'docsearch.errorScreen.titleText': z.string(),
	/** Default: `You might want to check your network connection.` */
	'docsearch.errorScreen.helpText': z.string(),

	// FOOTER
	/** Default: `to select` */
	'docsearch.footer.selectText': z.string(),
	/** Default: `Enter key` */
	'docsearch.footer.selectKeyAriaLabel': z.string(),
	/** Default: `to navigate` */
	'docsearch.footer.navigateText': z.string(),
	/** Default: `Arrow up` */
	'docsearch.footer.navigateUpKeyAriaLabel': z.string(),
	/** Default: `Arrow down` */
	'docsearch.footer.navigateDownKeyAriaLabel': z.string(),
	/** Default: `to close` */
	'docsearch.footer.closeText': z.string(),
	/** Default: `Escape key` */
	'docsearch.footer.closeKeyAriaLabel': z.string(),
	/** Default: `Search by` */
	'docsearch.footer.searchByText': z.string(),

	// NO RESULTS SCREEN
	/** Default: `No results for` */
	'docsearch.noResultsScreen.noResultsText': z.string(),
	/** Default: `Try searching for` */
	'docsearch.noResultsScreen.suggestedQueryText': z.string(),
	/** Default: `Believe this query should return results?` */
	'docsearch.noResultsScreen.reportMissingResultsText': z.string(),
	/** Default: `Let us know.` */
	'docsearch.noResultsScreen.reportMissingResultsLinkText': z.string(),
});

export const docsCollectionSchema = z.union([baseSchema, integrationSchema, redirectSchema]);

export type DocsEntryData = z.infer<typeof docsCollectionSchema>;

export type DocsEntryType = DocsEntryData['type'];

export type DocsEntry<T extends DocsEntryType> = CollectionEntry<'docs'> & {
	data: Extract<DocsEntryData, { type: T }>;
};

export function createIsLangEntry(lang: string) {
	return (entry: CollectionEntry<'docs'>): boolean => entry.id.startsWith(`${lang}/`);
}

export const isEnglishEntry = createIsLangEntry('en');

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: docsCollectionSchema }),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({ extend: i18nCustomSchema }),
	}),
	'package-catalog': defineCollection({
		loader: glob({ pattern: '*.json', base: 'src/content/package-catalog' }),
		schema: packageCatalogSchema,
	}),
};
