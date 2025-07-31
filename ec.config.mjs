import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import ecTwoSlash from 'expressive-code-twoslash';
import ts from 'typescript';

export default defineEcConfig({
	shiki: {
		transformers: [transformerColorizedBrackets()],
	},
	themes: ['dark-plus', 'light-plus'],
	plugins: [
		ecTwoSlash({
			twoslashOptions: {
				handbookOptions: {
					errors: [2353, 2339, 2307, 2379],
				},
				compilerOptions: {
					strict: true,
					moduleResolution: ts.ModuleResolutionKind.Bundler,
					target: ts.ScriptTarget.ESNext,
					exactOptionalPropertyTypes: true,
					downlevelIteration: true,
					skipLibCheck: true,
					lib: ['ES2022', 'DOM', 'DOM.Iterable', 'dom'],
					noEmit: true,
				},
			},
		}),
	],
	styleOverrides: {
		frames: {
			editorActiveTabIndicatorBottomColor: 'var(--sl-color-accent)',
		},
		twoSlash: {
			cursorColor: '#f8f8f2',
		},
	},
});
