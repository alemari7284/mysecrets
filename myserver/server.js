const express = require("express")
const mongoose = require("mongoose");
const passport = require("passport");

const passportjwt = require("passport-jwt");
const cors = require("cors");
const app = express();

app.use(express.json()); //replaces body-parser
app.use(cors())
app.use(passport.initialize())

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = new mongoose.model("User", userSchema);

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    // if (User.findOne({username}, (err, foundUser) => {
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         console.log(foundUser);
    //         if (foundUser.password === password) {
    //             res.send({username, password})
    //         }
    //     }
    // }))

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.sendStatus(200).send({response: "user logged"})
            })
        }
    })

    res.sendStatus(403).send({response: "user not found"});

})


app.listen(4000, () => {
    console.log("Server running on port 4000");
})