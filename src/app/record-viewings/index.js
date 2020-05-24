const express = require('express');
const v4 = require('uuid/v4');

function createActions({ messageStore }) {
    function recordViewing(traceId, videoId, userId) {
        const viewedEvent = {
            id: v4(),
            type: 'VideoViewed',
            metadata: {
                traceId,
                userId
            },
            data: {
                userId,
                videoId
            }
        };
        const streamName = `viewing-${videoId}`;

        return messageStore.write(streamName, viewedEvent);
    }

    return { recordViewing };
}

function createHandlers({ actions }) {
    async function handleRecordViewing(req, res) {
        await actions.recordViewing(req.context.traceId, req.params.videoId);
        return res.redirect('/');
    }

    return {
        handleRecordViewing
    };
}

function createRecordViewings({}) {
    const actions = createActions({});
    const handlers = createHandlers({ actions });
    const router = express.Router();

    router.route('/:videoId').post(handlers.handleRecordViewing);

    return { actions, handlers, router };
}

module.exports = createRecordViewings;
