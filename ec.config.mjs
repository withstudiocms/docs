import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import ecTwoSlash from 'expressive-code-twoslash';

export default defineEcConfig({
	shiki: {
		transformers: [transformerColorizedBrackets()],
	},
	themes: ['dark-plus', 'light-plus'],
	plugins: [
		ecTwoSlash({
			twoslashOptions: {
				handbookOptions: {
					errors: [2353, 2339],
				},
				compilerOptions: {
					strict: true,
					moduleResolution: 100,
					target: 99,
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
