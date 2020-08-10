const logger = require('./lib/logger');

const scripts = {
    'set-version': require('./scripts/set-version'),
};

(async () => {
    const scriptName = process.argv[2];
    if (typeof scripts[scriptName] !== 'function') {
        throw new Error(`DevTools script "${scriptName}" is not found.`);
    }

    await scripts[scriptName]({
        logger,
    });

})().then(() => {
    process.exit(0);
}).catch((err) => {
    logger.error(`\n❌ ${err}`);
    process.exit(1);
});
