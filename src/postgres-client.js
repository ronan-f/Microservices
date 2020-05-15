const Bluebird = require('bluebird');
const pg = require('pg');

function createDatabase({ connectionString }) {
    const client = new pg.Client({ connectionString, Promise: Bluebird });

    let connectedClient = null;

    async function connect() {
        if (!connectedClient) {
            connectedClient = client
                .connect()
                .then(() =>
                    client.query('SET search_path = message_store, public')
                )
                .then(() => client);
        }
        return connectedClient;
    }
}

module.exports = createDatabase;
