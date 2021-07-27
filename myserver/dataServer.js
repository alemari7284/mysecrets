const express = require("express");
const app = express();
const cors = require("cors")
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

const secretSchema = mongoose.Schema({
    title: String,
    author: String
})

const Secret = mongoose.model("Secret", secretSchema);

mongoose.connect("mongodb://localhost:27017/secrets", {useNewUrlParser: true, useUnifiedTopology: true });

app.get("/posts", authenticateToken, (req, res) => {
    Secret.find({}, (err, foundData) => {
        if (err) {
            res.sendStatus(400)
        } else {
            res.send(foundData)
        }
    })
})


function authenticateToken (req, res, next) {
    const token = req.headers["authorization"];
    if (token === null) res.sendStatus(401);

    jwt.verify(token, "jwtSecret", (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        console.log(req.user);
        next()
    })
}

app.listen(4001, (req, res) => {
    console.log("Server running on port 4001");
})