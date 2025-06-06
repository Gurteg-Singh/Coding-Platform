const registervalidation = require("../utils/authvalidation");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function register(req,res){
    try{
        registervalidation(req.body);
        const {firstName,lastName="",email,password} = req.body;
        const hashed = await bcrypt.hash(password, 10);

        const newuser = await User.create({firstName,lastName,email,password : hashed});

        const token = jwt.sign({_id:newuser._id,email : email},process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });
        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(201).send("User Registered Successfully");
    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
}

async function login(req,res){
    try{
        const{email,password} = req.body;
        if(!email || !password){
            throw new Enumeratorrror("ERROR : Invalid credentials");
        }

        const user = await User.findOne({email : email});
        if(!user){
            throw new Error("ERROR : Invalid credentials");
        }

        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            throw new Error("ERROR : Invalid credentials");
        }

        const token = jwt.sign({_id:user._id,email : email},process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });
        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(201).send("Login Successful");

    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
}