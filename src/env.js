const packageJson = require('../package.json');

function requireFromEnv(key) {
    if (!process.env[key]) {
        console.error(`[APP ERROR] Missing env variable: ${key}`);

        return process.exit(1);
    }

    return process.env[key];
}

module.exports = {
    appName: requireFromEnv('APP_NAME'),
    env: requireFromEnv('NODE_ENV'),
    port: parseInt(requireFromEnv('PORT'), 10),
    version: packageJson.version
};
