import rehypeSlug from 'rehype-slug';
import type { RehypePlugins } from './rehype.types.ts';
import rehypeExternalLinks from './rehypeExternalLinks.ts';

export const rehypePluginKit: RehypePlugins = [
	rehypeSlug,
	rehypeExternalLinks,
];

export default rehypePluginKit;
