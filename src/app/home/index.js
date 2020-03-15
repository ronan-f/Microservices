const express = require('express');

function createHandlers({ queries }) {
    async function home(req, res, next) {
        try {
            const viewData = await queries.loadHomePage();

            return res.render('home/templates/home', viewData);
        } catch (e) {
            next();
        }
    }
    return { home };
}

function createQueries({ db }) {
    async function loadHomePage() {
        const client = await db;
        const result = client('videos').sum('view_count as videosWatched');
        return result[0];
    }
    return { loadHomePage };
}

function createHome({ db }) {
    const queries = createQueries({ db });
    const handlers = createHandlers(queries);

    const router = express.Router();

    router.route('/').get(handlers.home);

    return { handlers, queries, router };
}

module.exports = createHome;
