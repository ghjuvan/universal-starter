const express = require('express');
const admin = require('firebase-admin');

const app = express();

function getData(req, res) {
    let url = req.params.url;
    if (url) {
        url = url.split('/').map(encodeURIComponent).join('/');
    }
    console.log('GET ' + url || '/');

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

app.get('/', function (req, res) {
    getData(req, res);
});

app.get('/:url', function (req, res) {
    getData(req, res);
});

module.exports = app;