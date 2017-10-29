const express = require('express');
const path = require('path');

// Import renderModuleFactory from @angular/platform-server.
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const AppServerModuleNgFactory = require('./../dist/server/main.bundle').AppServerModuleNgFactory;
const LAZY_MODULE_MAP = require('./../dist/server/main.bundle').LAZY_MODULE_MAP;

// Load the index.html file.
const index = require('fs').readFileSync(path.resolve(__dirname, './../index.html'), 'utf8');

let app = express();
require('@angular/core').enableProdMode();

app.get('/', function(req, res) {
    renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: '/',
        extraProviders: provideModuleMap(LAZY_MODULE_MAP)
    })
        .then(function(html) {
            res.send(html);
        }).catch( function(e) {
        console.log(e)
    });
});


module.exports = app;
