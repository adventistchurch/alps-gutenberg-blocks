const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

/**
 * Creates Changelog Object from CHANGELOG.md
 */
const parseChangelog = async () => {
    const POS = {
        OUT: 'OUT',
        VER: 'VER',
        TYPE: 'TYPE',
        ENTRY: 'ENTRY',
    };
    const changelog = [];

    const changelogFile = 'CHANGELOG.md';

    const exprVersion = /^## \[(?<version>[\d.]+)\]/u;
    const exprTypeStart = /^### (?<type>[a-zA-Z]+)/u;
    const exprTypeEntry = /^- (?<entry>.+)/u;

    let cursor = {
        pos: POS.OUT,
        version: null,
        type: null,
    };
    const changelogContent = await fs.readFile(changelogFile, { encoding: 'utf-8' });
    for (const entry of changelogContent.split("\n")) {
        /**
         * Version
         */
        const match = entry.match(exprVersion);
        if (match) {
            if (cursor.version) {
                cursor.version.types.push({
                    ...cursor.type,
                });

                changelog.push({
                    ...cursor.version,
                    desc: cursor.version.desc.join("\n").trim(),
                });
            }

            cursor.version = {
                version: match.groups.version,
                desc: [],
                types: [],
            };
            cursor.pos = POS.VER;

            continue;
        }

        /**
         * Version Description
         */
        if (cursor.pos === POS.VER) {
            const match = entry.match(exprTypeStart);

            if (!match) {
                cursor.version.desc.push(entry)
            }
        }

        /**
         * Change Type Title
         */
        if (cursor.pos !== POS.OUT) {
            const match = entry.match(exprTypeStart);

            if (match) {
                if (cursor.pos === POS.ENTRY) {
                    cursor.version.types.push({
                        ...cursor.type,
                    });
                }

                cursor.type = {
                    title: match.groups.type,
                    entries: [],
                };
                cursor.pos = POS.TYPE;

                continue;
            }
        }

        /**
         * Change Type Entry
         */
        if (cursor.pos === POS.TYPE || cursor.pos === POS.ENTRY) {
            const match = entry.match(exprTypeEntry);

            if (match) {
                cursor.type.entries.push(match.groups.entry);
                cursor.pos = POS.ENTRY;
            }
        }
    }

    return changelog;
}

/**
 * Update the version in package.json and package-lock.json
 *
 * @param {string} version Semver version value
 */
const setVersionInPackageJson = async (version) => {
    const packageContent = await fs.readFile('package.json', { encoding: 'utf-8' });
    const pkg = JSON.parse(packageContent);
    pkg.version = version;

    await fs.writeFile('package.json', JSON.stringify(pkg, null, 2));

    const packageLockContent = await fs.readFile('package-lock.json', { encoding: 'utf-8' });
    const pkgLock = JSON.parse(packageLockContent);
    pkgLock.version = version;

    await fs.writeFile('package-lock.json', JSON.stringify(pkgLock, null, 2));
};

/**
 * Update the version in composer.json
 *
 * @param {string} version Semver version value
 */
const setVersionInComposerJson = async (version) => {
    const composerContent = await fs.readFile('composer.json', { encoding: 'utf-8' });
    const composer = JSON.parse(composerContent);
    composer.version = version;

    await fs.writeFile('composer.json', JSON.stringify(composer, null, 2));
};

/**
 * Update the version in plugin.php
 *
 * @param {string} version Semver version value
 */
const setVersionInPlugin = async (version) => {
    const pluginContent = await fs.readFile('plugin.php', { encoding: 'utf-8' });

    const exprPluginVersion = /Version: ([\d.]+)/u;
    const exprVersionConst = /'ALPS_GUTENBERG_VERSION', '([\d.]+)'/;
    const plugin = pluginContent
        .replace(exprPluginVersion, `Version: ${version}`)
        .replace(exprVersionConst, `'ALPS_GUTENBERG_VERSION', '${version}'`)
    ;

    await fs.writeFile('plugin.php', plugin);
};

const isWorkdirClean = async () => {
    const { stdout, stderr } = await exec('git status --porcelain');
    if (stderr !== '') {
        throw new Error(`Git Status not working: ${stderr}`);
    }

    return stdout === '';
};

const createReleaseCommit = async (version) => {
    try {
        await exec(`git add .`);
        await exec(`git commit --porcelain -m "release: v${version.version}"`);
        await exec(`git tag v${version.version}`);
    } catch (error) {
        if (error.stderr.match(/tag .* already exists/um)) {
            throw new Error('Version tag is already exists. Please delete it or increase the version number.');
        }
        console.log(error);
    }
};

const setVersion = async (opts) => {
    const { logger } = opts;

    if (!await isWorkdirClean()) {
        logger.error(chalk.bold('❗ Commit all changes before release'));

        return;
    }

    // Get current version
    const changelog = await parseChangelog();
    if (changelog.length === 0) {
        throw new Error(`Changelog has no entries`);
    }
    const currentVersion = changelog[0];
    logger.info(`🟡 Current version: ${chalk.bold(chalk.green(currentVersion.version))}\n`);

    // Update package.json
    await setVersionInPackageJson(currentVersion.version);
    logger.info(`💚 ${chalk.yellow('package.json')} updated`);

    // Update composer.json
    await setVersionInComposerJson(currentVersion.version);
    logger.info(`💚 ${chalk.yellow('composer.json')} updated`);

    // Update plugin info
    await setVersionInPlugin(currentVersion.version);
    logger.info(`💚 ${chalk.yellow('plugin.php')} updated`);

    // Create commit and tag
    await createReleaseCommit(currentVersion);

    logger.info(chalk.bold('\n❗ Now push changes to GitHub and new Release will be created'));
}

module.exports = setVersion;
