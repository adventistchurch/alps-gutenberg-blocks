const logger = require('./lib/logger');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const scripts = {
    'set-version': require('./scripts/set-version'),
    'build-plugin': require('./scripts/build-plugin'),
    'create-release': require('./scripts/create-release'),
};

(async () => {
    const scriptName = process.argv[2];
    if (typeof scripts[scriptName] !== 'function') {
        throw new Error(`DevTools script "${scriptName}" is not found.`);
    }

    await scripts[scriptName]({
        logger,
        env: process.env,
    });

})().then(() => {
    process.exit(0);
}).catch((err) => {
    logger.error(`\n❌ ${err}`);
    process.exit(1);
});
