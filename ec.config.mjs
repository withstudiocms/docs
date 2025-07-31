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
					moduleResolution: ts.ModuleResolutionKind.Bundler,
					target: ts.ScriptTarget.ESNext,
					module: ts.ModuleKind.ESNext,
					lib: ['esnext', 'dom'],
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
