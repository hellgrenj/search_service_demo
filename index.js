'use strict';

const express = require('express');
const search = require('./modules/search');

const PORT = 8080;

search.init();
const app = express();
app.get('/', (req, res) => {
    res.sendfile(__dirname + '/client/index.htm');
});
app.get('/:searchQuery', search.queryElasticsearch);

search.ping(() => {
    app.listen(PORT);
    console.log('Running on http://localhost:' + PORT);
});
