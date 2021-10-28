const findUser = (username, password) =>{
    if(username ==='Mihai' && password === 'parola'){
        return {
            username,
        }
    } else {
        return null;
    }
}

module.exports = findUser;