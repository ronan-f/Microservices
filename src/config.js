const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewingsApp = require('./app/record-viewings');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');

function createConfig({ env }) {
    const db = createKnexClient({ connectionString: env.databaseUrl });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const messageStore = createMessageStore({ db: postgresClient });
    const homeApp = createHomeApp({ db });
    const recordViewingsApp = createRecordViewingsApp({ messageStore });
    return {
        db,
        homeApp,
        recordViewingsApp,
        messageStore
    };
}

module.exports = createConfig;
