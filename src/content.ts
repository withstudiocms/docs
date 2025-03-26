import { getCollection } from 'astro:content';
import { isEnglishEntry } from './content.config';

export const allPages = await getCollection('docs');
export const englishPages = allPages.filter(isEnglishEntry);
