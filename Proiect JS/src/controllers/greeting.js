const handleGreeting = ({ params, country }, response) => {
    let message = '';
    if (!params.name){
        response.send("Hello World!");
    } else {
        message = "Hello " + params.name;
        if(country === "Romania"){
            message = "Salut, " +params.name;
        }
    }
    response.send(message);
};

module.exports.handleGreeting = handleGreeting;