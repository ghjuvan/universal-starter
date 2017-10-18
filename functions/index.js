'use strict';

const functions = require('firebase-functions');
const app = require('./dist/server.js').angularApp;

exports.trigger = functions.https.onRequest(function (req, res) {
    return app(req, res)
});

