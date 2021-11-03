const db = require("../models");


module.exports.getAllPosts = async (req, res)=> {
    try {
        const allPosts = await db.Post.findAll();
        res.send(allPosts);
    }catch(error){
        console.error('Something went wrong');
        res.send({
            error: "Something went wrong",
        });
    }
}

// module.exports.getUser = async (req,res) => {

// }

module.exports.getPostById = async (req, res)=> {
    const postId = parseInt(req.params.id);
    try {
        const post = await db.Post.findByPk(postId);
        const author = await db.User.findByPk(post.UserId);

        const response = {
            ...post.dataValues,
            author
        };
        res.send(response);
    } catch (error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
}

module.exports.createPost = async (req, res) => {
    const userId = req.params.id;
    const {
        title,
        body,
    } = req.body
    try{
        const user = await db.User.findByPk(userId);
        if(!user){
            throw new Error('User not found');
        }
        const newPost = {
            
            title,
            body,
        };

        const createdPost = await user.createPost(newPost);
        console.log('createdPost,', createdPost);
        res.status(201).send(newPost);
    } catch(error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
}

module.exports.updatePost = async ({ params, body }, res) => {
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

module.exports.deletePost = async ({ params }, res) => {
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

module.exports.addTagToPost = async (req, res) => {
    const postId = req.params.postId;
    const tagId = req.params.tagId;
    console.log(typeof(tagId))

    try{
        const post = await db.Post.findByPk(postId);
        const tag = await db.Tag.findByPk(tagId);

        if(!post) {
            throw new Error('Post not found');
        }
        if(!tag) {
            throw new Error('Tag not found');
        }

        await post.setTags(tag);

        const updatedPosts = await db.Post.findByPk(postId);
        const updatedPostsTags = await updatedPosts.getTags();

        const response = {
            ...updatedPosts.toJSON(),
            tags: updatedPostsTags,
        }
        res.status(201).send(response);
    } catch(error) {
        console.error(error);
        res.send({
            error: 'Something went wrong',
        });
    }
}