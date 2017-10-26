'use strict';

const functions = require('firebase-functions');
const app = require('./dist/server.js').angularApp;
const admin = require('firebase-admin');

const express = require('express');

const app2 = express();

admin.initializeApp(functions.config().firebase);

function getData(req, res){
    let url = req.params.url;
    if (url) {
        url = url.split('/').map(encodeURIComponent).join('/');
    }

    admin.database().ref(url || '/').once('value')
        .then(snap => {
            return snap.val()
        })
        .then(val => res.send(val))
        .catch((error) => {
            console.error(error);
            res.status(404).send('not found')
        });
}

app2.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app2.get('/', function (req, res) {
    getData(req, res);
});

app2.get('/:url', function (req, res) {
    getData(req, res);
});

exports.trigger = functions.https.onRequest(function (req, res) {
    //res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    return app(req, res);
});

exports.nestor = functions.https.onRequest(function (req, res) {
    return app2(req, res);
});
