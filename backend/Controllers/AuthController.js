const userModel = require("../Models/User");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

const signup = async (req,res) =>{
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(409).json({ message: "User already exists", success: false });
        }
        const hashedPassword = await argon2.hash(password);
        const newUserModel = new userModel({ name, email, password });
        newUserModel.password = hashedPassword;   
        await newUserModel.save();
        return res.status(201)
            .json({ message: "signup success", success: true });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error: ", success:"false"});
    }
}

const login = async (req,res) =>{
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMessage = "Email or password is incorrect";
        if(!user){
            return res.status(403).json({ message: errorMessage, success: false });
        }
        const passwordVerify = await argon2.verify(user.password, password);
        if (passwordVerify) {
            // password match
            return res.status(200).json({ message: "Logged in successfully", success: true });

        } else {
            // password did not match
            return res.status(403).json({ message: errorMessage, success: false });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error: ", success:"false"});
    }
}

module.exports = {
    signup,
    login
}