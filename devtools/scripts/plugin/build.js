const fs = require('fs-extra');
const archiver = require('archiver');
const chalk = require('chalk');
const { DateTime } = require('luxon');
const webpack = require('webpack');
const exec = require('../../lib/exec');
const dirTree = require('../../lib/dir-tree');
const getPackageInfo = require('../../lib/get-package-info');
const getPluginMeta = require('../../lib/get-plugin-meta');
const devWebpackConfig = require('cgb-scripts/config/webpack.config.dev');

const createArchive = (src, name, logger) => {
    return new Promise((resolve, reject) => {
        const archiveOutput = fs.createWriteStream(`${src}${name}.zip`);
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
        archive.directory(`${src}${name}`, name);
        archive.finalize();
    });
};

const pluginBuild = async (opts) => {
    const { logger, args } = opts;

    const pkg = await getPackageInfo();

    const buildDir = `build/`;
    const pluginDir = `${buildDir}${pkg.name}/`;
    await fs.emptyDir(buildDir);
    await fs.emptyDir(pluginDir);

    if (args.dev) {
        logger.info('🎯 Build plugin in dev mode');
    } else {
        logger.info('🎯 Build plugin');
    }

    if (args.dev) {
        devWebpackConfig.devtool = false;
        devWebpackConfig.plugins.push(new webpack.EvalSourceMapDevToolPlugin({}));
        const compiler = await webpack(devWebpackConfig);

        await new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) {
                    return reject(err);
                }

                logger.info('💼 Compile JS files');
                resolve();
            });
        });
    } else  {
        await exec('composer install', logger);
        await exec('npm run project:build-blocks', logger);
    }

    logger.info(`💼 Copy plugin files to ${chalk.yellow(pluginDir)}`);

    const whiteList = [
        /^\/src\/.+\.php$/u,
        /^\/src\/front\.js$/u,
        /^\/[^\/]+\.php$/u,
        /^\/dist/u,
        /^\/vendor/u,
        /^\/languages/u,
    ];
    const pluginFiles = await dirTree('.', {
        whiteList,
    });

    for (const pf of pluginFiles) {
        await fs.copy(`./${pf}`, `${pluginDir}${pf}`);
    }

    // Package plugin
    if (!args.dev) {
        await createArchive(buildDir, pkg.name);
        logger.info(`💚 Plugin packaged to ${chalk.yellow(`${pkg.name}.zip`)}`);
    }

    // Gather metadata
    if (!args.dev) {
        const pluginMeta = {
            ...await getPluginMeta(),
            version: pkg.version,
            last_updated: DateTime.utc().toFormat('yyyy-LL-dd HH:mm:ss ZZZZ'),
        };

        pluginMeta.download_url = pluginMeta.download_url
            .replace('{name}', pkg.name)
            .replace('{file}', `${pkg.name}-v${pkg.version}.zip`);

        await fs.writeFile(`${buildDir}${pkg.name}.json`, JSON.stringify(pluginMeta, null, 2));

        logger.info(`💚 Plugin metadata saved to ${chalk.yellow(`${pkg.name}.json`)}`);
    }
}

module.exports = pluginBuild;
