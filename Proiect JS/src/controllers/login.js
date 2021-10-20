const jwt = require('jsonwebtoken');
const findUser = require('../helpers/findUser');
const { MY_SECRET_KEY } = require('../config/jwt');

const loginHandler = (req, res) => {
    const body = req.body;
    console.log(body);
    const username = body.username;
    const password = body.password;
    if(findUser(username, password)){
        const token = jwt.sign({}, MY_SECRET_KEY);
        res.send({
            token: token,
        });
    }else {
        res.status(401).send({
            token: null,
        });
    }
}

module.exports = loginHandler;