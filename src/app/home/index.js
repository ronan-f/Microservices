const express = require('express');
const camelCaseKeys = require('camelcase-keys');

function createHandlers({ queries }) {
    async function home(req, res, next) {
        try {
            const viewData = await queries.loadHomePage();
            return res.render('home/templates/home', viewData);
        } catch (e) {
            console.error(e);
            next();
        }
    }
    return { home };
}

function createQueries({ db }) {
    async function loadHomePage() {
        const client = await db;

        let result = client('pages').where({ page_name: 'home' }).limit(1);
        result = camelCaseKeys(result);

        return result[0];
    }
    return { loadHomePage };
}

function createHome({ db }) {
    const queries = createQueries({ db });
    const handlers = createHandlers({ queries });

    const router = express.Router();

    router.route('/').get(handlers.home);

    return { handlers, queries, router };
}

module.exports = createHome;
