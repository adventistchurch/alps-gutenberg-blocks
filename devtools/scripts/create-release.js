const { Octokit } = require("@octokit/rest");
const getChangelog = require('../lib/get-changelog');

const createRelease = async (opts) => {
    const { logger, env } = opts;

    const githubToken = env.GITHUB_TOKEN || null;
    const [githubOwner, githubRepo] = env.GITHUB_REPOSITORY.split('/');
    const githubRef = env.GITHUB_REF || null;

    // Extract git tag
    const match = githubRef.match(/^refs\/tags\/(?<tag>v\d+\.\d+\.\d+)$/);
    if (!match) {
        throw new Error(`Invalid tag name for release: "${githubRef.replace('refs/tags/', '')}"`);
    }
    const tag = match.groups.tag;

    // Compose release description
    const changelog = await getChangelog();
    const currentVersion = changelog[0];
    const releaseDesc = [currentVersion.desc];
    for (const changeType of currentVersion.types) {
        releaseDesc.push(`## ${changeType.title}`);
        for (const changeTypeEntry of changeType.entries) {
            releaseDesc.push(`- ${changeTypeEntry}`);
        }
    }

    // Create Release on GitHub
    logger.info(`Publishing a Release ${tag}`);
    const octokit = new Octokit({
        auth: githubToken,
    });

    await octokit.repos.createRelease({
        owner: githubOwner,
        repo: githubRepo,
        tag_name: tag,
        name: tag,
        body: releaseDesc.join("\n"),
        draft: true,
    });
};

module.exports = createRelease;
