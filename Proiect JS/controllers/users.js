const db = require("../models");

module.exports.getAllUsers = async (req, res)=> {
    try {
        const allUsers = await db.User.findAll();
        res.send(allUsers);
    }catch(error){
        console.error('Something went wrong');
        res.send({
            error: "Something went wrong",
        });
    }
}

module.exports.getUserById = async ({ params }, res)=> {
    const { id } = params;
    try {
        const user = await db.User.findAll({
            where:{
                id: id,
            }
        })
        res.status(302).send(user);
    } catch (error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
}

module.exports.createUser = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
    } = req.body

    try{
        const newUser = await db.User.create({
            email,
            firstName,
            lastName,
        });

        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    };
}

module.exports.updateUser = async ({ params, body }, res) => {
    const {id} = params;
    const {email, firstName, lastName, createdAt} = body;
    let updatedAt = new Date();
    try {
        const newUser = {
            id,
            email,
            firstName,
            lastName,
            createdAt,
            updatedAt
        }
        await db.User.update(newUser,{
                where: {
                    id,
                }
            })
        res.status(202).send(newUser);
    } catch (error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
    
}

module.exports.deleteUser = async ({ params }, res) => {
    const { id } = params;
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        });
        res.status(202).send({
            status: 'Deleted user with id: ' + id,
        });
    } catch (error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
}