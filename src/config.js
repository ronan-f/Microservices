const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewingsApp = require('./app/record-viewings');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');
const createHomePageAggregator = require('./aggregators/home-page');

function createConfig({ env }) {
    const db = createKnexClient({ connectionString: env.databaseUrl });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const messageStore = createMessageStore({ db: postgresClient });
    const homeApp = createHomeApp({ db });
    const recordViewingsApp = createRecordViewingsApp({ messageStore });
    const homePageAggregator = createHomePageAggregator({ db, messageStore });

    const aggregators = [homePageAggregator];
    const components = [];

    return {
        db,
        homeApp,
        recordViewingsApp,
        messageStore,
        aggregators,
        components
    };
}

module.exports = createConfig;
