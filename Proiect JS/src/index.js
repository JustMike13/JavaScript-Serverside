const express = require('express');
const { handleGreeting, otherValue } = require('./greeting');
const handleCatFactsRequest = require('./catFacts');

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

app.listen(port, () => {
    console.log("Server started on", port);
});