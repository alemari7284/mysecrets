const express = require("express")
const mongoose = require("mongoose");
const passportjwt = require("passport-jwt");
const cors = require("cors");
const app = express();

app.use(express.json()); //replaces body-parser
app.use(cors())


const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = new mongoose.model("User", userSchema);

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });

app.get("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.send({username, password})
})


app.listen(4000, () => {
    console.log("Server running on port 4000");
})