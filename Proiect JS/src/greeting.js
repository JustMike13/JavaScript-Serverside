const otherValue = '1234';

const handleGreeting = ({ params }, response) => {
    if (!params.name){
        return "Hello World!";
    }
    else{
        message = "Hello " + params.name;
        return message;
    }
};

module.exports.handleGreeting = handleGreeting;
module.exports.otherValue = otherValue