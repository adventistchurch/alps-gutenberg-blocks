/**
 * Creates Changelog Object from CHANGELOG.md
 */
module.exports = async (changelogContent) => {
    const POS = {
        OUT: 'OUT',
        VER: 'VER',
        TYPE: 'TYPE',
        ENTRY: 'ENTRY',
    };
    const changelog = [];

    const exprVersion = /^## \[(?<version>[\d.]+)\]/u;
    const exprTypeStart = /^### (?<type>[a-zA-Z]+)/u;
    const exprTypeEntry = /^- (?<entry>.+)/u;

    let cursor = {
        pos: POS.OUT,
        version: null,
        type: null,
    };
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
