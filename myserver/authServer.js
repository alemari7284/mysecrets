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
app.use(cookieParser())


app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60
    }
}))

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = new mongoose.model("User", userSchema);


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });

// const verifyJWT = (req, res, next) => {
//     const token = req.headers["x-access-token"]

//     if (!token) {
//         res.send("I need a token, provide one")
//     } else {
//         jwt.verify(token, "jwtSecret", (err, decoded) => {
//             if (err) {
//                 res.json({auth: false, message: "U failed to authenticate"})
//             } else {
//                 req.user = decoded.username;
//                 next();
//             }
//         })
//     }
// }
// app.use(verifyJWT)


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
                    res.json({auth: true, token})
                } else {
                    res.status(403).send("Wrong username/password combination");
                }
            })
        }
    });
});

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
                res.json({registered: true, message: "successfully registered", token})
            }
        })
    })
})




app.listen(4000, () => {
    console.log("Server running on port 4000");
})