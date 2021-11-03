const express = require('express');
const bodyParser = require('body-parser');

const { handleGreeting } = require('./controllers/greeting');
const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');

const { getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('./controllers/users');
const { getAllPosts, addTagToPost, getPostById, createPost, updatePost, deletePost, getUser} = require('./controllers/posts');

const app = express();
app.use(bodyParser.json());

app.post("/login", loginHandler);

app.get('/hello', authorizationMiddleware, handleGreeting);

app.get('/hello/:name?',authorizationMiddleware, handleGreeting);


app.get("/users", getAllUsers);
app.get("/users/:id", getUserById)
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.post("/users/:id/posts", createPost);

app.get("/post", getAllPosts);
app.get("/post/:id", getPostById)
app.put("/post/:id", updatePost);
app.delete("/post/:id", deletePost);

app.post("/posts/:postId/tags/:tagId", addTagToPost)


app.listen(port, () => {
    console.log("localhost:3000");
});