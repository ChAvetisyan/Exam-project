require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("./multer/multer");
const { PORT, HOST, DB } = require("./constants");
const { logIn, user, addUser, getUsers} = require("./controllers/AuthController");
const {createTask, getTasks} = require("./controllers/TaskController");
const verifyToken = require("./middleware/auth");

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin:"*"
}))

mongoose
.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected to DB"))
.catch((error) => console.log(error));

app.post("/log-in", logIn);
app.put("/add-user", verifyToken, multer.single("image"), addUser);
app.get("/tasks", getTasks);
app.post("/create-task", verifyToken, createTask);
app.get("/user", verifyToken, user);
app.get("/users", getUsers);

app.listen(PORT, () => {
    console.log(`App listening on port ${HOST}:${PORT}`)
})


