const express = require('express');
const { handleGreeting, otherValue } = require('./greeting');
const handleCatFactsRequest = require('./catFacts');
const handleAnimeFactsRequest = require('./animeFacts');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send("Hello World!");
});

app.get('/hello/:name?',(req, res) => {
    handleGreeting(req, res);
    console.log(otherValue);
});

app.get('/cat/facts', handleCatFactsRequest);
app.get('/anime/facts', handleAnimeFactsRequest);

app.listen(port, () => {
    console.log("Server started on", port);
});