const express = require ("express");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const mongoose = require ("mongoose");
const jwt = require("jsonwebtoken");
const config = require("./config");
const signUpModel = require ("./models/Signup");
const adminModel = require("./models/Admin");

const app = express();


app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log("server connected on port " + config.port);
})
 
mongoose.connect(config.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},
() => {
    console.log("DB connected");
});


app.post("/signup", async (req, res) => {
    try{
        const emailAddress = await signUpModel.findOne({
            email: req.body.email
        });
        if(emailAddress) {
            res.status(400).send(`Email ${req.body.email} already exists`);
            return;
        }

        if(req.body.password.length < 8) {
            res.status(400).send("Password too short");
            return;
        }

        if(bcryptjs.compareSync(req.body.password, bcryptjs.hashSync(req.body.confirmPassword))){
            res.send("Sign-up created");
        }else {
            res.status(401).send("Password and confirm password have to be sames");
            return;
        }

//      await signUpModel.create(req.body);
        await signUpModel.create({
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password),
            firstName: req.body.firstName,
            surname: req.body.surname,
            dateOfBirth: req.body.dateOfBirth
        });
    }catch (err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

app.post("/login", async (req,res) => {
    try{
        const emailAddress = await signUpModel.findOne({
        email: req.body.email
        }).exec();

        if(!emailAddress){
            res.status(401).send("Please enter your registred email")
            return;
        };

        if(!bcryptjs.compareSync(req.body.password, emailAddress.password)) {

        res.status(401).send("Invalid password");
        console.log("Invalid password");
        return;
//    console.log(emailAddress.password, bcryptjs.hashSync(req.body.password));
//    console.log(bcryptjs.compareSync(req.body.password, emailAddress.password));
        }else{
            const token = jwt.sign({
                id: emailAddress._id
                },
                config.secret,
                {
                expiresIn: 3600
                }
            );
            res.status(200).json({
                message: "Connexion OK",
                token: token
            });
            console.log("Connexion OK");
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

app.get("/", (req,res) => {
    res.send("Everybody can see this");
})

app.get("/topsecret", async (req,res) => {
    try{
    const token = req.headers.authorization;
//    console.log(token);
    const result = jwt.verify(token.split(" ")[1], config.secret);
    const user = await signUpModel.findOne({
        _id: result.id
    }).exec()
    console.log(result);
    res.send(`Bienvenue, ${user.firstName}`);
    }catch(err){
        res.status(401).send("Unauthorized !");
    }

})