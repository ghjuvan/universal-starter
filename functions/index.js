'use strict';

const functions = require('firebase-functions');
//const app = require('./dist/server.js').angularApp;
const puppeteer = require('puppeteer');
const path = require('path');
const join = path.join;
const DIST_FOLDER = join(process.cwd(), 'dist');
const fs = require('fs');
const express = require('express');

const app = express();

console.log('DIST', DIST_FOLDER);

//const app = require('express');

function render(url) {
    let mainBrowser, mainPage;

    console.log(join(DIST_FOLDER, 'browser', 'index'));

    return puppeteer.launch()
        .then(browser => {
            mainBrowser = browser;
            return browser.newPage()
        })
        .then(page => {
            mainPage = page;
        })
        .then(() => fs.readFileSync(join(DIST_FOLDER, 'browser', 'index.html')))
        .then((file) => {
            console.log('file', file);
            console.log(file.toString('utf8'));
            return file.toString('utf8');
        })
        .then((template) => mainPage.setContent(template))
        .then(() => mainPage.evaluate(('1 + 1')))
        .then(() => mainPage.content())
        .then((content) => {
            mainBrowser.close().catch((error) => {
                console.error(error);
            });
            return content
        })
        .catch((error) => {
            console.error('ERRR', error);
        });
}

app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

app.get('*', (req, res) => {
    console.log('APP');
    render(req.url).then((template)=> {
        console.log(template);
        res.send(template)
    })
});

exports.trigger = functions.https.onRequest(function (req, res) {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    return app(req, res);

    /*render(req.url).then((template)=> {
        console.log(template);
        //res.send(template)
    })*/
});

