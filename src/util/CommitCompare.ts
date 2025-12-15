/**
 * Git author/committer information
 */
interface GitUser {
    name?: string;
    email?: string;
    date?: string;
}

/**
 * A GitHub user
 */
interface SimpleUser {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
}

/**
 * An object without any properties
 */

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface EmptyObject { }

/**
 * Verification information
 */
interface Verification {
    verified: boolean;
    reason: string;
    payload: string | null;
    signature: string | null;
    verified_at: string | null;
}

/**
 * Commit tree reference
 */
interface CommitTree {
    sha: string;
    url: string;
}

/**
 * Commit parent reference
 */
interface CommitParent {
    sha: string;
    url: string;
    html_url?: string;
}

/**
 * Commit statistics
 */
interface CommitStats {
    additions?: number;
    deletions?: number;
    total?: number;
}

/**
 * Diff Entry
 */
interface DiffEntry {
    sha: string | null;
    filename: string;
    status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch?: string;
    previous_filename?: string;
}

/**
 * Git commit details
 */
interface CommitDetail {
    url: string;
    author: GitUser | null;
    committer: GitUser | null;
    message: string;
    comment_count: number;
    tree: CommitTree;
    verification?: Verification;
}

/**
 * Commit object
 */
interface Commit {
    url: string;
    sha: string;
    node_id: string;
    html_url: string;
    comments_url: string;
    commit: CommitDetail;
    author: SimpleUser | EmptyObject | null;
    committer: SimpleUser | EmptyObject | null;
    parents: CommitParent[];
    stats?: CommitStats;
    files?: DiffEntry[];
}

export type {
    GitUser,
    SimpleUser,
    EmptyObject,
    Verification,
    CommitTree,
    CommitParent,
    CommitStats,
    DiffEntry,
    CommitDetail,
    Commit,
};