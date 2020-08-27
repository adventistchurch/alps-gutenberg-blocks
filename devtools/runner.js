const fs = require('fs').promises;
const yaml = require('yaml');
const logger = require('./lib/logger');

const scripts = {
    'set-version': require('./scripts/set-version'),
    'build-plugin': require('./scripts/build-plugin'),
    'create-release': require('./scripts/create-release'),
};

(async () => {
    let env = { ...process.env };

    if (process.env.NODE_ENV === 'development') {
        try {
            const envYaml = await fs.readFile('.env.yml', { encoding: 'utf-8' });
            const localEnv = yaml.parse(envYaml);
            env = {
                ...env,
                ...localEnv,
            };
        } catch (err) {}
    }

    const scriptName = process.argv[2];
    if (typeof scripts[scriptName] !== 'function') {
        throw new Error(`DevTools script "${scriptName}" is not found.`);
    }

    await scripts[scriptName]({
        logger,
        env,
    });

})().then(() => {
    process.exit(0);
}).catch((err) => {
    logger.error(`\n❌ ${err}`);
    process.exit(1);
});
