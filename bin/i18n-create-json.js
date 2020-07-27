const gettext = require('gettext-parser');
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const chalk = require('chalk');
const path = require('path');
const fs = require('fs').promises;

const pluginName = 'alps-gutenberg-blocks';
const wpScriptHandler = 'alps-gb';
const langRoot = path.resolve(__dirname, '../languages');
const poFilePattern = new RegExp(`^${pluginName}-(?<lang>[a-z]{2}_[A-Z]{2})\.po$`, 'u');

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
    logger.info(`📖 Reading the ${chalk.green('*.po')} language files from ${chalk.green(langRoot)}`);
    const langFiles = await fs.readdir(langRoot);

    for (const poFileName of langFiles) {
        const match = poFileName.match(poFilePattern);
        if (!match) {
            continue;
        }

        logger.info(`🌵 ${chalk.yellow(match.groups.lang)} lang found in ${chalk.green(poFileName)}`);
        const poContentRaw = await fs.readFile(`${langRoot}/${poFileName}`);
        const poContent = gettext.po.parse(poContentRaw);

        const jsonMessages = {
            '': {
                domain: 'messages',
                lang: poContent.headers.Language,
                'plural-forms': poContent.headers['Plural-Forms'],
            },
        };
        for (const msg of Object.values(poContent.translations[''])) {
            if (msg.msgid === '') {
                continue;
            }
            jsonMessages[msg.msgid] = msg.msgstr;
        }

        const jsonFileName = `${pluginName}-${match.groups.lang}-${wpScriptHandler}.json`;
        const jsonContent = {
            locale_data: {
                messages: jsonMessages,
            },
        };

        await fs.writeFile(`${langRoot}/${jsonFileName}`, JSON.stringify(jsonContent));
        logger.info(`✏️ ${chalk.yellow(match.groups.lang)} converted to JSON format and saved to ${chalk.green(jsonFileName)}`);
    }
})().then(() => {
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
