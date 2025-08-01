import type { StarlightPlugin } from '@astrojs/starlight/types';
import { createStarlightTypeDocPlugin } from 'starlight-typedoc';
import type { StarlightTypeDocOptions } from 'starlight-typedoc';

// Utility function to create TypeDoc related paths
export function getFilePathToPackage(name: string, path: string) {
	return `./studiocms/packages/${name}/${path}`;
}

// Utility function to create TypeDoc options for the StudioCMS packages so that each package documentation is the same when generated
export function makeTypedocOpts(o: {
	name: string;
	dir: string;
	output: string;
	entryPoints: StarlightTypeDocOptions['entryPoints'];
}): StarlightTypeDocOptions {
	return {
		tsconfig: getFilePathToPackage(o.dir, 'tsconfig.json'),
		entryPoints: o.entryPoints,
		output: `en/typedoc/${o.output}`,
		typeDoc: {
			plugin: [
				'typedoc-plugin-zod',
				'typedoc-plugin-frontmatter',
				'./src/plugins/frontmatter.js',
				'./src/plugins/readmes.js',
			],
			skipErrorChecking: true,
			gitRemote: 'https://github.com/withstudiocms/studiocms/blob',
			gitRevision: 'main',
			sourceLinkTemplate:
				'https://github.com/withstudiocms/studiocms/blob/{gitRevision}/{path}#L{line}',
			includeVersion: true,
			expandObjects: true,
			expandParameters: true,
			useCodeBlocks: true,
			useHTMLAnchors: true,
			sourceLinkExternal: true,
			outputFileStrategy: 'modules',
			pretty: true,
		},
	};
}
// Create Starlight TypeDoc Plugins for different parts of the Astro StudioCMS Project

// studiocms
const tdStudioCMS = createStarlightTypeDocPlugin()[0];

// @studiocms/devapps
const tdDevApps = createStarlightTypeDocPlugin()[0];
// @studiocms/blog
const tdBlog = createStarlightTypeDocPlugin()[0];
// @studiocms/markdoc
const tdMarkDoc = createStarlightTypeDocPlugin()[0];
// @studiocms/mdx
const tdMDX = createStarlightTypeDocPlugin()[0];
// @studiocms/cloudinary-image-service
const tdCloudinaryPlugin = createStarlightTypeDocPlugin()[0];
// @studiocms/md
const tdMD = createStarlightTypeDocPlugin()[0];
// @studiocms/html
const tdHTML = createStarlightTypeDocPlugin()[0];
// @studiocms/auth0
const tdAuth0 = createStarlightTypeDocPlugin()[0];
// @studiocms/discord
const tdDiscord = createStarlightTypeDocPlugin()[0];
// @studiocms/github
const tdGitHub = createStarlightTypeDocPlugin()[0];
// @studiocms/google
const tdGoogle = createStarlightTypeDocPlugin()[0];

// @withstudiocms/config-utils
const tdConfigUtils = createStarlightTypeDocPlugin()[0];

// Set to true to enable testing mode for TypeDoc
const testTypeDoc = false;

// When CHECK_LINKS is set, we disable TypeDoc plugins (isProd becomes false)
// to improve performance and prevent link validation errors in generated docs
const isLinkCheck = !!process.env.CHECK_LINKS;

const isProd = !isLinkCheck && process.env.NODE_ENV === 'production';

const TypeDocPlugins = (isProd: boolean, testingMode: boolean): StarlightPlugin[] => {
	if (isProd || testingMode) {
		return [
			tdStudioCMS(
				makeTypedocOpts({
					name: 'studiocms',
					output: 'studiocms',
					dir: 'studiocms',
					entryPoints: [
						getFilePathToPackage('studiocms', 'src/config.ts'),
						getFilePathToPackage('studiocms', 'src/consts.ts'),
						getFilePathToPackage('studiocms', 'src/effect.ts'),
						getFilePathToPackage('studiocms', 'src/errors.ts'),
						getFilePathToPackage('studiocms', 'src/index.ts'),
						getFilePathToPackage('studiocms', 'src/pluginHandler.ts'),
						getFilePathToPackage('studiocms', 'src/plugins.ts'),
						getFilePathToPackage('studiocms', 'src/routeHandler.ts'),
						getFilePathToPackage('studiocms', 'src/scriptHandler.ts'),
						getFilePathToPackage('studiocms', 'src/types.ts'),
						getFilePathToPackage('studiocms', 'src/cli/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/add/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/add/npm-utils.ts'),
						getFilePathToPackage('studiocms', 'src/cli/add/tryToInstallPlugins.ts'),
						getFilePathToPackage('studiocms', 'src/cli/add/updateStudioCMSConfig.ts'),
						getFilePathToPackage('studiocms', 'src/cli/add/validatePlugins.ts'),
						getFilePathToPackage('studiocms', 'src/cli/crypto/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/crypto/genJWT/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/getTurso/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/init/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/init/steps/env.ts'),
						getFilePathToPackage('studiocms', 'src/cli/init/steps/next.ts'),
						getFilePathToPackage('studiocms', 'src/cli/users/index.ts'),
						getFilePathToPackage('studiocms', 'src/cli/users/steps/libsqlCreateUsers.ts'),
						getFilePathToPackage('studiocms', 'src/cli/users/steps/libsqlModifyUsers.ts'),
						getFilePathToPackage('studiocms', 'src/cli/users/steps/next.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/checkRequiredEnvVars.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/context.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/createUserAvatar.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/dateAdd.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/effectBoxen.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/intro.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/logger.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/seasonal.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/studiocmsEnv.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/types.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/useLibSQLDb.ts'),
						getFilePathToPackage('studiocms', 'src/cli/utils/user-utils.ts'),
						getFilePathToPackage('studiocms', 'src/db/config.ts'),
						getFilePathToPackage('studiocms', 'src/db/tables.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/encryption.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/password.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/session.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/types.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/user.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/verify-email.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/utils/scrypt.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/utils/unsafeCheck.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/utils/lists/passwords.ts'),
						getFilePathToPackage('studiocms', 'src/lib/auth/utils/lists/usernames.ts'),
						getFilePathToPackage('studiocms', 'src/lib/dynamic-sitemap/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/dynamic-sitemap/sitemap-index.xml.ts'),
						getFilePathToPackage('studiocms', 'src/lib/effects/convertToVanilla.ts'),
						getFilePathToPackage('studiocms', 'src/lib/effects/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/effects/logger.ts'),
						getFilePathToPackage('studiocms', 'src/lib/effects/smtp.config.ts'),
						getFilePathToPackage('studiocms', 'src/lib/effects/smtp.ts'),
						getFilePathToPackage('studiocms', 'src/lib/i18n/client.ts'),
						getFilePathToPackage('studiocms', 'src/lib/i18n/config.ts'),
						getFilePathToPackage('studiocms', 'src/lib/i18n/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/template.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/templates/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/templates/notification.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/templates/password-reset.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/templates/user-invite.ts'),
						getFilePathToPackage('studiocms', 'src/lib/mailer/templates/verify-email.ts'),
						getFilePathToPackage('studiocms', 'src/lib/notifier/client.ts'),
						getFilePathToPackage('studiocms', 'src/lib/notifier/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/renderer/errors.ts'),
						getFilePathToPackage('studiocms', 'src/lib/robots/index.ts'),
						getFilePathToPackage('studiocms', 'src/lib/robots/core.ts'),
						getFilePathToPackage('studiocms', 'src/lib/robots/types.ts'),
						getFilePathToPackage('studiocms', 'src/lib/robots/utils.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/checkForWebVitalsPlugin.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/consts.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/schemas.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/types.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/webVital.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/webVitalsRouteSummary.ts'),
						getFilePathToPackage('studiocms', 'src/lib/webVitals/webVitalsSummary.ts'),
						getFilePathToPackage('studiocms', 'src/lib/dashboardGrid.ts'),
						getFilePathToPackage('studiocms', 'src/lib/endpointResponses.ts'),
						getFilePathToPackage('studiocms', 'src/lib/head.ts'),
						getFilePathToPackage('studiocms', 'src/lib/headDefaults.ts'),
						getFilePathToPackage('studiocms', 'src/lib/makeAPIRoute.ts'),
						getFilePathToPackage('studiocms', 'src/lib/makePublicRoute.ts'),
						getFilePathToPackage('studiocms', 'src/lib/pathGenerators.ts'),
						getFilePathToPackage('studiocms', 'src/lib/removeLeadingTrailingSlashes.ts'),
						getFilePathToPackage('studiocms', 'src/lib/routeMap.ts'),
						getFilePathToPackage('studiocms', 'src/lib/urlGen.ts'),
						getFilePathToPackage('studiocms', 'src/middleware/index.ts'),
						getFilePathToPackage('studiocms', 'src/middleware/utils.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/AstroComponentProxy.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/index.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/decoder/index.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/decoder/decode-codepoint.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/decoder/decode-data-html.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/decoder/decode-data-xml.ts'),
						getFilePathToPackage('studiocms', 'src/runtime/decoder/utils.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/index.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/plugins/index.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/plugins/shared.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/config/auth.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/config/dashboard.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/config/index.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/config/pageTypeOptions.ts'),
						getFilePathToPackage('studiocms', 'src/schemas/config/sdk.ts'),
						getFilePathToPackage('studiocms', 'src/scripts/formListener.ts'),
						getFilePathToPackage('studiocms', 'src/scripts/three.ts'),
						getFilePathToPackage('studiocms', 'src/scripts/utils/fitModelToViewport.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/cache-core.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/cache.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/core.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/errors.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/index.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/sdkCore.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/tables.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/collectors.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/convertToVanilla.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/db.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/foldertree.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/generators.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/getVersionFromNPM.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/index.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/parsers.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/users.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/effect/lib/jwt-generator.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/types/index.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/types/tableDefs.ts'),
						getFilePathToPackage('studiocms', 'src/sdk/types/tsAlias.ts'),
						getFilePathToPackage('studiocms', 'src/utils/addIntegrationArray.ts'),
						getFilePathToPackage('studiocms', 'src/utils/addIntegrationArrayWithChecks.ts'),
						getFilePathToPackage('studiocms', 'src/utils/astroConfigCheck.ts'),
						getFilePathToPackage('studiocms', 'src/utils/astroEnvConfig.ts'),
						getFilePathToPackage('studiocms', 'src/utils/authEnvCheck.ts'),
						getFilePathToPackage('studiocms', 'src/utils/changelog.ts'),
						getFilePathToPackage('studiocms', 'src/utils/changelogLoader.ts'),
						getFilePathToPackage('studiocms', 'src/utils/checkENV.ts'),
						getFilePathToPackage('studiocms', 'src/utils/dynamicResult.ts'),
						getFilePathToPackage('studiocms', 'src/utils/getLabelForPermissionLevel.ts'),
						getFilePathToPackage('studiocms', 'src/utils/getLatestVersion.ts'),
						getFilePathToPackage('studiocms', 'src/utils/integrationLogger.ts'),
						getFilePathToPackage('studiocms', 'src/utils/integrations.ts'),
						getFilePathToPackage('studiocms', 'src/utils/isDashboardRoute.ts'),
						getFilePathToPackage('studiocms', 'src/utils/jsonParse.ts'),
						getFilePathToPackage('studiocms', 'src/utils/makePageTitle.ts'),
						getFilePathToPackage('studiocms', 'src/utils/pageListPackageLabel.ts'),
						getFilePathToPackage('studiocms', 'src/utils/pageTypeFilter.ts'),
						getFilePathToPackage('studiocms', 'src/utils/pluginLogger.ts'),
						getFilePathToPackage('studiocms', 'src/utils/readJson.ts'),
						getFilePathToPackage('studiocms', 'src/utils/safeString.ts'),
						getFilePathToPackage('studiocms', 'src/utils/tryCatch.ts'),
						getFilePathToPackage('studiocms', 'src/utils/validImages.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/convert-hyphens.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/errors.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/handler.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/index.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/PropsParser.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/Registry.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/runtime.ts'),
						getFilePathToPackage('studiocms', 'src/componentRegistry/types.ts')
					],
				})
			),
			tdDevApps(
				makeTypedocOpts({
					name: '@studiocms/devapps',
					output: 'studiocms-devapps',
					dir: '@studiocms/devapps',
					entryPoints: [
						getFilePathToPackage('@studiocms/devapps', 'src/index.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/apps/libsql-viewer.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/apps/wp-importer.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/routes/wp-importer.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/schema/index.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/utils/app-utils.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/utils/pathGenerator.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/wpImporter.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/WordPressAPI/configs.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/WordPressAPI/converters.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/WordPressAPI/importers.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/WordPressAPI/schema.ts'),
						getFilePathToPackage('@studiocms/devapps', 'src/effects/WordPressAPI/utils.ts'),
					],
				})
			),
			tdBlog(
				makeTypedocOpts({
					name: '@studiocms/blog',
					output: 'studiocms-blog',
					dir: '@studiocms/blog',
					entryPoints: [
						getFilePathToPackage('@studiocms/blog', 'src/index.ts'),
						getFilePathToPackage('@studiocms/blog', 'src/types.ts'),
					],
				})
			),
			tdMarkDoc(
				makeTypedocOpts({
					name: '@studiocms/markdoc',
					output: 'studiocms-markdoc',
					dir: '@studiocms/markdoc',
					entryPoints: [
						getFilePathToPackage('@studiocms/markdoc', 'src/index.ts'),
						getFilePathToPackage('@studiocms/markdoc', 'src/types.ts'),
						getFilePathToPackage('@studiocms/markdoc', 'src/lib/render.ts'),
						getFilePathToPackage('@studiocms/markdoc', 'src/lib/shared.ts'),
						getFilePathToPackage('@studiocms/markdoc', 'src/react-renderer/renderReact.ts'),
					],
				})
			),
			tdMDX(
				makeTypedocOpts({
					name: '@studiocms/mdx',
					output: 'studiocms-mdx',
					dir: '@studiocms/mdx',
					entryPoints: [
						getFilePathToPackage('@studiocms/mdx', 'src/index.ts'),
						getFilePathToPackage('@studiocms/mdx', 'src/types.ts'),
						getFilePathToPackage('@studiocms/mdx', 'src/lib/render.ts'),
						getFilePathToPackage('@studiocms/mdx', 'src/lib/shared.ts'),
					],
				})
			),
			tdMD(
				makeTypedocOpts({
					name: '@studiocms/md',
					output: 'studiocms-md',
					dir: '@studiocms/md',
					entryPoints: [
						getFilePathToPackage('@studiocms/md', 'src/index.ts'),
						getFilePathToPackage('@studiocms/md', 'src/types.ts'),
						getFilePathToPackage('@studiocms/md', 'src/lib/markdown-prerender.ts'),
						getFilePathToPackage('@studiocms/md', 'src/lib/shared.ts'),
					],
				})
			),
			tdHTML(
				makeTypedocOpts({
					name: '@studiocms/html',
					output: 'studiocms-html',
					dir: '@studiocms/html',
					entryPoints: [
						getFilePathToPackage('@studiocms/html', 'src/index.ts'),
						getFilePathToPackage('@studiocms/html', 'src/types.ts'),
						getFilePathToPackage('@studiocms/html', 'src/lib/shared.ts'),
					],
				})
			),
			tdCloudinaryPlugin(
				makeTypedocOpts({
					name: '@studiocms/cloudinary-image-service',
					output: 'studiocms-cloudinary-image-service',
					dir: '@studiocms/cloudinary-image-service',
					entryPoints: [
						getFilePathToPackage('@studiocms/cloudinary-image-service', 'src/index.ts'),
						getFilePathToPackage('@studiocms/cloudinary-image-service', 'src/cloudinary-js-service.ts'),
						getFilePathToPackage('@studiocms/cloudinary-image-service', 'src/utils/readJson.ts')
					]
				})
			),
			tdConfigUtils(
				makeTypedocOpts({
					name: '@withstudiocms/config-utils',
					output: 'withstudiocms-config-utils',
					dir: '@withstudiocms/config-utils',
					entryPoints: [
						getFilePathToPackage('@withstudiocms/config-utils', 'src/astro-integration-utils.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/index.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/loader.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/types.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/watcher.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/zod-utils.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/utils/dynamicResult.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/utils/index.ts'),
						getFilePathToPackage('@withstudiocms/config-utils', 'src/utils/tryCatch.ts'),
					],
				})
			),
			tdAuth0(
				makeTypedocOpts({
					name: '@studiocms/auth0',
					output: 'studiocms-auth0',
					dir: '@studiocms/auth0',
					entryPoints: [
						getFilePathToPackage('@studiocms/auth0', 'src/index.ts'),
						getFilePathToPackage('@studiocms/auth0', 'src/endpoint.ts'),
						getFilePathToPackage('@studiocms/auth0', 'src/effect/auth0.ts'),
					],
				})
			),
			tdDiscord(
				makeTypedocOpts({
					name: '@studiocms/discord',
					output: 'studiocms-discord',
					dir: '@studiocms/discord',
					entryPoints: [
						getFilePathToPackage('@studiocms/discord', 'src/index.ts'),
						getFilePathToPackage('@studiocms/discord', 'src/endpoint.ts'),
						getFilePathToPackage('@studiocms/discord', 'src/effect/discord.ts'),
					],
				})
			),
			tdGitHub(
				makeTypedocOpts({
					name: '@studiocms/github',
					output: 'studiocms-github',
					dir: '@studiocms/github',
					entryPoints: [
						getFilePathToPackage('@studiocms/github', 'src/index.ts'),
						getFilePathToPackage('@studiocms/github', 'src/endpoint.ts'),
						getFilePathToPackage('@studiocms/github', 'src/effect/github.ts'),
					],
				})
			),
			tdGoogle(
				makeTypedocOpts({
					name: '@studiocms/google',
					output: 'studiocms-google',
					dir: '@studiocms/google',
					entryPoints: [
						getFilePathToPackage('@studiocms/google', 'src/index.ts'),
						getFilePathToPackage('@studiocms/google', 'src/endpoint.ts'),
						getFilePathToPackage('@studiocms/google', 'src/effect/google.ts'),
					],
				})
			),
		];
	}
	return [] as StarlightPlugin[];
};

export const typeDocPlugins = TypeDocPlugins(isProd, testTypeDoc);
