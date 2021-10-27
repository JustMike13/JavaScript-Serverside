const fetch = require('node-fetch');

const animeFacts = async (req, res) => {
    const response = await fetch('https://ghibliapi.herokuapp.com/films/')
    const body = await response.json();
    const facts = body.map(({ title, movie_banner, description}) => ({
        title,
        movie_banner,
        description,
    }));
    
    res.send(facts);
}

module.exports= animeFacts;