const v4 = require('uuid/v4');

function primeRequestContext(req, res, next) {
    req.context = {
        traceId: v4()
    };
}

module.exports = primeRequestContext;
