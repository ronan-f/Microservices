const VersionConflictError = require('./version-conflict-error');
const versionConflictErrorRegex = /^Wrong.*Stream Version: (\d+)\)/;
const writeFunctionSQL =
    'SELECT message_store.write_message($1, $2, $3, $4, $5, $6)';

function createWrite({ db }) {
    return (streamName, message, expectedVersion) => {
        if (!message.type) {
            throw new Error('Messages must have a type!');
        }

        const values = [
            message.id,
            streamName,
            message.type,
            message.data,
            message.metadata,
            expectedVersion
        ];

        return db.query(writeFunctionSQL, values).catch((e) => {
            const errorMatch = e.message.match(versionConflictErrorRegex);

            if (!errorMatch) throw e;

            const actualVersion = parseInt(errorMatch[1], 10);

            const versionConflictError = new VersionConflictError(
                streamName,
                actualVersion,
                expectedVersion
            );

            versionConflictError.stack = e.stack;

            throw versionConflictError;
        });
    };
}

module.exports = createWrite;
