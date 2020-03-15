const express = require('express');

function createActions({}) {}

function createHandlers({ actions }) {
    function handleRecordViewing(req, res) {
        await actions.recordViewing(req.context.traceId, req.params.videoId)
        return res.redirect("/")
    }

    return {
        handleRecordViewing
    }
}

function createRecordViewings({}) {
    const actions = createActions({});
    const handlers = createHandlers({ actions });
    const router = express.Router();

    router.route('/:videoId').post(handlers.handleRecordViewing);

    return { actions, handlers, router };
}

module.exports = createRecordViewings;