const fs = require('fs-extra');
const archiver = require('archiver');
const chalk = require('chalk');
const exec = require('../lib/exec');
const dirTree = require('../lib/dir-tree');
const getPackageInfo = require('../lib/get-package-info');

const createArchive = (src, name, logger) => {
    return new Promise((resolve, reject) => {
        const archiveOutput = fs.createWriteStream(`${name}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 },
        });

        archiveOutput.on('close', () => {
            resolve({
                size: archive.pointer(),
            });
        });

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                logger.warn(err.message);
            } else {
                reject(err);
            }
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(archiveOutput);
        archive.directory(`${src}/`, name);
        archive.finalize();
    });
};

const buildPlugin = async (opts) => {
    const { logger, env } = opts;

    const pkg = await getPackageInfo();

    const buildDir = 'build/';
    await fs.emptyDir(buildDir);

    logger.info('🎯 Build plugin');

    await exec('npm install', logger);
    await exec('composer install', logger);
    await exec('npm run blocks:build', logger);

    logger.info(`💼 Copy plugin files to ${chalk.yellow(buildDir)}`);

    const whiteList = [
        /^\/src\/.+\.php$/u,
        /^\/[^\/]+\.php$/u,
        /^\/dist/u,
        /^\/vendor/u,
        /^\/languages/u,
    ];
    const pluginFiles = await dirTree('.', {
        whiteList,
    });

    for (const pf of pluginFiles) {
        await fs.copy(`./${pf}`, `${buildDir}${pf}`);
    }

    // Package plugin
    await createArchive(buildDir, pkg.name);
    logger.info(`💚 Plugin packaged to ${chalk.yellow(`${pkg.name}.zip`)}`);
}

module.exports = buildPlugin;
