import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	ignoreDependencies: [
		'@studiocms/blog',
		'@studiocms/devapps',
		'@studiocms/html',
		'@studiocms/md',
		'@studiocms/mdx',
		'@studiocms/markdoc',
		'@studiocms/wysiwyg',
		'@studiocms/cloudinary-image-service',
		'@studiocms/s3-storage',
		"@withstudiocms/template-lang",
		'@astrojs/node',
		'sharp',
		'@biomejs/biome',
		'ultrahtml',
		'@withstudiocms/component-registry',
		'@withstudiocms/kysely',
		"@withstudiocms/effect",
		'@studiocms/web-vitals',
		'astro-integration-kit'
	],
	entry: [
		'src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
		'scripts/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
		'lunaria/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
		'biome.json',
	],
	project: [
		'src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
		'scripts/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
		'lunaria/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
	],
	astro: {
		entry: [
			'studiocms.config.{js,cjs,mjs,ts,mts}',
			'astro.config.{js,cjs,mjs,ts,mts}',
			'ec.config.mjs',
			'hostUtils.ts',
			'lunaria.config.ts',
			'starlight-types.ts',
			'typedoc.config.ts',
			'src/content/config.ts',
			'src/content.config.ts',
			'src/pages/**/*.{astro,mdx,js,ts}',
			'src/content/**/*.mdx',
			'src/components/**/*.{astro,js,ts}',
			'src/starlightOverrides/**/*.{astro,js,ts}',
			'src/plugins/**/*.{js,ts}',
			'src/util/**/*.{astro,js,ts}',
			'src/middleware.{js,ts}',
			'src/actions/index.{js,ts}',
		],
	},
};

export default config;
