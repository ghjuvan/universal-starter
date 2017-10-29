'use strict';

const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const nestorApp = require('./src/nestor');
const triggerApp = require('./dist/server.js').angularApp;


admin.initializeApp(functions.config().firebase);

exports.trigger = functions.https.onRequest(function (req, res) {
    return triggerApp(req, res);
});

exports.nestor = functions.https.onRequest(function (req, res) {
    cors(req, res, () => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        return nestorApp(req, res);
    });
});
