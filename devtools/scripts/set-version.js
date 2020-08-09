const fs = require('fs').promises;
const chalk = require('chalk');

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

const setVersionInPackageJson = async (version) => {
    const packageContent = await fs.readFile('package.json', { encoding: 'utf-8' });
    const pkg = JSON.parse(packageContent);
    pkg.version = version.version;

    await fs.writeFile('package.json', JSON.stringify(pkg, null, 2));
};

const setVersionInComposerJson = async (version) => {
    const composerContent = await fs.readFile('composer.json', { encoding: 'utf-8' });
    const composer = JSON.parse(composerContent);
    composer.version = version.version;

    await fs.writeFile('composer.json', JSON.stringify(composer, null, 2));
};


const setVersion = async (opts) => {
    const { logger } = opts;

    logger.info(chalk.bold('❗ You should commit and push changes to create a new release.'));

    // Get current version
    const changelog = await parseChangelog();
    if (changelog.length === 0) {
        throw new Error(`Changelog has no entries`);
    }
    const currentVersion = changelog[0];
    logger.info(`🟡 Current version: ${chalk.bold(chalk.green(currentVersion.version))}\n`);

    // Update package.json
    await setVersionInPackageJson(currentVersion);
    logger.info(`💚 ${chalk.yellow('package.json')} updated`);

    // Update composer.json
    await setVersionInComposerJson(currentVersion);
    logger.info(`💚 ${chalk.yellow('composer.json')} updated`);
}

module.exports = setVersion;
