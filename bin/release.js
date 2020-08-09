const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const chalk = require('chalk');
const { Octokit } = require("@octokit/rest");

const githubToken = '8ece61ca2a62b86227c87e7e5359ab868a2ba1d2';
const githubOwner = 'deeepvision';
const githubRepo = 'gc-alps-gutenberg-blocks';

const octokit = new Octokit({
    auth: githubToken,
});

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        printf(({ message }) => {
            return message;
        })
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

(async () => {
    const pluginInfo = {

    };





    await octokit.repos.createRelease({

    });

    const releases = await octokit.repos.listReleases({
        owner: githubOwner,
        repo: githubRepo,
    });

    // Upload zip to CDN
    // Update info.json on CDN
    // Create a release on Github with part of Changelog

    console.log(releases.data);
})().then(() => {
    process.exit(0);
}).catch((err) => {
    logger.error(err);
    process.exit(1);
});
