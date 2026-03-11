import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import ecTwoSlash from 'expressive-code-twoslash';
import ts from 'typescript';

export default defineEcConfig({
	themes: ['dark-plus', 'light-plus'],
	plugins: [
		ecTwoSlash({
			twoslashOptions: {
				handbookOptions: {
					errors: [2353, 2339, 2307, 2379, 2305, 2345, 7031, 2554, 2375, 2322],
				},
				compilerOptions: {
					moduleResolution: ts.ModuleResolutionKind.Bundler,
					target: ts.ScriptTarget.ESNext,
					module: ts.ModuleKind.ESNext,
					lib: [], // Don't include any libs, that way we can build within memory limit errors
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
