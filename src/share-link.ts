export { default as SponsorLink } from './util/SponsorLink.astro';

// This file is used to define the sponsors and their respective urls.
export const sponsors = {
	// TODO: Turso is no longer a sponsor, remove this link once all the references to it are removed from the docs.
	turso: {
		docs: {
			installCLILink: 'https://docs.turso.tech/cli/installation',
			loginsignupLink: 'https://docs.turso.tech/cli/authentication',
		},
	},
	skip2: {
		docs: {
			sidebarSponsorLink: 'https://www.skip2.net/?utm_source=studiocms',
		},
	},
};
