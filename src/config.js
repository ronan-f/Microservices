const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewingsApp = require('./app/record-viewings');
const createPostgresClient = require('./postgres-client');

function createConfig({ env }) {
    const db = createKnexClient({ connectionString: env.databaseUrl });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const homeApp = createHomeApp({ db });
    const recordViewingsApp = createRecordViewingsApp({ db });
    return {
        db,
        homeApp,
        recordViewingsApp
    };
}

module.exports = createConfig;
