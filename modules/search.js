'use strict';
const elasticsearch = require('elasticsearch');

const search = {};
search.init = function() {
    search._client = new elasticsearch.Client({
        host: 'elasticsearch:9200',
        log: 'trace'
    });
};
search.ping = function(next) {
    search._client.ping({
        requestTimeout: 30000,
        hello: "elasticsearch"
    }, function(error) {
        if (error) {
            console.log('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
            next();
        }
    });
};
search.queryElasticsearch = function(req, res) {
    let searchParams = {
        index: 'search',
        body: {
            query: {
                filtered: {
                    query: {
                        match: {
                            _all: req.params.searchQuery
                        }
                    }
                }
            }
        }
    };
    search._client.search(searchParams, function(err, elasticsearchResponse) {
        if (err) {
            console.log(err);
        }
        let hits = [];
        if (elasticsearchResponse &&
            elasticsearchResponse.hits &&
            elasticsearchResponse.hits.hits) {
            hits = elasticsearchResponse.hits.hits.map(function(item) {
                return item._source;
            });
        }
        res.json({
            hits: hits
        });
    });

};
module.exports = search;
