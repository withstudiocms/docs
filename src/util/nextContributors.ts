import { cachedFetch } from '../util-server.ts';

/// CONFIG

const orgName = 'withstudiocms';

const KnownServiceBotAccounts: string[] = ['studiocms-no-reply', 'astrobot-houston'];

const repositoryBlacklist = [
    'withstudiocms/allure-branch-reporter-action',
    'withstudiocms/outerbase-studio',
];

/// END OF CONFIG

export interface Contributor {
    login: string;
    id: number;
    contributions: number;
    avatar_url?: string;
}

interface Repository {
    name: string;
    full_name: string;
}

const printError = (e: Error) =>
    console.warn(`[error]  /src/util/nextContributors.ts\n         ${e?.message ?? e}`);

/**
 * Fetches data from a GitHub API endpoint recursively, handling pagination.
 */
// biome-ignore lint/suspicious/noExplicitAny: GitHub API returns varied response types
async function recursiveFetch(endpoint: string, page?: number): Promise<any[]> {
    const pageNumber = page || 1;

    try {
        const queryParam = endpoint.includes('?') ? '&' : '?';
        const pageSize = 100;
        const url = `https://api.github.com/${endpoint}${queryParam}per_page=${pageSize}&page=${pageNumber}`;

        const token = import.meta.env.PUBLIC_GITHUB_TOKEN;

        const res = await cachedFetch(
            url,
            {
                method: 'GET',
                headers: {
                    Authorization: token && `Bearer ${token}`,
                    'User-Agent': 'studiocms-docs/1.0',
                },
            },
            { duration: '15m' }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                `Request to fetch endpoint failed. Reason: ${res.statusText}
         Message: ${data?.message}`
            );
        }

        // Fetch more data recursively if there are more than GitHub's per-page response limit.
        if (data.length === pageSize) {
            const rest = await recursiveFetch(endpoint, pageNumber + 1);
            data.push(...rest);
        }

        return data;
    } catch (e) {
        printError(e as Error);
        return [];
    }
}

/**
 * Filters out bot accounts and StudioCMS service accounts from contributors.
 */
function filterContributors(contributors: Contributor[]): Contributor[] {
    return contributors.filter(
        (contributor) =>
            !contributor.login.includes('[bot]') &&
            !KnownServiceBotAccounts.includes(contributor.login)
    );
}

/**
 * Merges a new contributor into the existing contributors list.
 * If the contributor exists, adds to their contribution count.
 * If not, adds them as a new contributor.
 */
function mergeContributor(
    existingContributors: Contributor[],
    newContributor: Contributor
): void {
    const existing = existingContributors.find((c) => c.id === newContributor.id);

    if (existing) {
        existing.contributions += newContributor.contributions;
    } else {
        existingContributors.push({ ...newContributor });
    }
}

/**
 * Fetches all repositories for a given organization.
 */
async function getOrgRepositories(org: string): Promise<Repository[]> {
    console.log(`Fetching repositories for org: ${org}`);
    const endpoint = `orgs/${org}/repos`;
    return await recursiveFetch(endpoint);
}

/**
 * Fetches contributors for a specific repository.
 */
async function getRepoContributors(repo: string): Promise<Contributor[]> {
    const endpoint = `repos/${repo}/contributors`;
    return await recursiveFetch(endpoint);
}

let cachedContributors: Contributor[] | null = null;
let lastFetchTime: number | null = null;
const cacheDuration = 300000; // 5 minutes

/**
 * Fetches and aggregates all contributors across an entire GitHub organization.
 * 
 * This function:
 * 1. Retrieves all repositories in the organization
 * 2. Fetches contributors from each repository
 * 3. Aggregates contributors (combining contribution counts for users who appear in multiple repos)
 * 4. Filters out bot accounts and service accounts
 * 5. Returns a sorted list by contribution count
 * 
 * @param org - The GitHub organization name (e.g., 'withstudiocms')
 * @returns A promise that resolves to an array of contributors sorted by contribution count (descending)
 * 
 * @example
 * ```typescript
 * const contributors = await getOrgWideContributors('withstudiocms');
 * console.log(`Total contributors: ${contributors.length}`);
 * ```
 */
export async function getOrgWideContributors(): Promise<Contributor[]> {
    const now = Date.now();
    // Check cache first
    if (cachedContributors && lastFetchTime && now - lastFetchTime < cacheDuration) {
        console.log('Returning cached contributors');
        return cachedContributors;
    }
    try {
        // Step 1: Get all repositories in the organization
        const repositories = await getOrgRepositories(orgName);

        if (repositories.length === 0) {
            console.warn(`No repositories found for org: ${orgName}`);
            return [];
        }

        console.log(`Found ${repositories.length} repositories in ${orgName}`);

        // Step 2: Aggregate contributors from all repos
        const allContributors: Contributor[] = [];

        for (const repo of repositories) {
            if (repositoryBlacklist.includes(repo.full_name)) {
                console.log(`Skipping blacklisted repository: ${repo.full_name}`);
                continue;
            }

            console.log(`Fetching contributors for: ${repo.full_name}`);
            const repoContributors = await getRepoContributors(repo.full_name);

            // Merge each contributor into the aggregate list
            for (const contributor of repoContributors) {
                mergeContributor(allContributors, contributor);
            }
        }

        // Step 3: Filter and sort
        const filteredContributors = filterContributors(allContributors);
        const sortedContributors = filteredContributors.sort(
            (a, b) => b.contributions - a.contributions
        );

        console.log(`Total unique contributors in ${orgName}: ${sortedContributors.length}`);

        // Cache results        
        cachedContributors = sortedContributors;
        lastFetchTime = Date.now();

        return sortedContributors;
    } catch (e) {
        printError(e as Error);
        return [];
    }
}
