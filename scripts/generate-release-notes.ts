import type { List, Root } from 'mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { loadChangelog, semverCategories } from './lib/changelogs';
import { writeFileLines } from './lib/utils';

const mainBranch: string =
	'https://raw.githubusercontent.com/withstudiocms/studiocms/main/packages/studiocms/CHANGELOG.md';
const preBranch: string =
	'https://raw.githubusercontent.com/withstudiocms/studiocms/changeset-release/main/packages/studiocms/CHANGELOG.md';

// Allow Switching into a pre-release mode for development of pre-release docs
const pre = false;

const changelogUrl = pre ? preBranch : mainBranch;

const changelog = await loadChangelog(changelogUrl);

const studiocmsOutput: string[] = [];

studiocmsOutput.push(
	// Add release notes frontmatter to output
	'---',
	'# Warning: This file is generated automatically. Do not edit!',
	'i18nReady: false',
	'title: Release Notes',
	'type: integration',
	'catalogEntry: studiocms',
	'replaceTitle: false',
	'description: Release notes for the studiocms package.',
	'editUrl: false',
	'sidebar:',
	'  badge:',
	'    text: Auto Generated',
	'    variant: tip',
	'---',
	'',
	'The following is automated release notes for the `studiocms` package.',
	'For more information, see the [Changelog file](https://github.com/withstudiocms/studiocms/blob/main/packages/studiocms/CHANGELOG.md)',
	''
);

const ast: Root = {
	type: 'root',
	children: [],
};

for (const version of changelog.versions) {
	const versionChanges: List = { type: 'list', children: [] };

	for (const semverCategory of semverCategories) {
		for (const listItem of version.changes[semverCategory].children) {
			versionChanges.children.push(listItem);
		}
	}

	if (version.includes.size) {
		versionChanges.children.push({
			type: 'listItem',
			children: [
				{
					type: 'paragraph',
					children: [{ type: 'text', value: `Includes: ${[...version.includes].join(', ')} ` }],
				},
			],
		});
	}

	if (!versionChanges.children.length) continue;

	ast.children.push({
		type: 'heading',
		depth: 2,
		children: [{ type: 'text', value: version.version }],
	});

	ast.children.push(versionChanges);
}

studiocmsOutput.push(toMarkdown(ast, { bullet: '-' }));

writeFileLines('./src/content/docs/en/guides/upgrade/release-notes.md', studiocmsOutput);
