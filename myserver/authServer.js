const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const cookieParser = require("cookie-parser")
const session = require("express-session");

const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json()); //replaces body-parser
app.use(cors())

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = new mongoose.model("User", userSchema);


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username}, (err, foundUser) => {
        if (err) {
            res.status(400);
        } else {
            console.log(foundUser);
            // res.status(200).send(foundUser);
            bcrypt.compare(password, foundUser.password, (error, response) => {
                if (response) {
                    const token = jwt.sign({username: foundUser.username}, "jwtSecret", { expiresIn: "35s"})
                    const refreshToken = jwt.sign({username: req.body.username}, "jwtSecret")
                    res.json({auth: true, message: "successfully logged", token, refreshToken})
                } else {
                    res.status(403).send("Wrong username/password combination");
                }
            })
        }
    });
});

app.post("/token", (req, res) => {
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, "jwtSecret", (err, result) => {
        if (err) return res.sendStatus(401)
        const token = jwt.sign({username: req.body.username}, "jwtSecret", {expiresIn: "35s"});
        res.json(token);
    })
})

app.post("/register", (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        const user = new User({
            username: req.body.username,
            password: hash
        })

        user.save((err) => {
            if (err) {
                res.json({registered: false, message: err})
            } else {
                const token = jwt.sign({username: req.body.username}, "jwtSecret", { expiresIn: "35s"})
                const refreshToken = jwt.sign({username: req.body.username}, "jwtSecret")
                res.json({registered: true, message: "successfully registered", token, refreshToken})
            }
        })
    })
})


app.listen(4000, () => {
    console.log("Server running on port 4000");
})