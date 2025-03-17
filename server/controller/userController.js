const { response } = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async(req,res,next) => {
    try{
        const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({msg: "Username already exists", status: false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({msg: "Email already exists", status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashedPassword});

    delete user.password;
    return res.json({status:true, user});
    } catch(err){
        next(err);
    }
};

module.exports.login = async(req,res,next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({msg: "Account with username and password not found", status: false});
        }
        const isPaswordValid = await bcrypt.compare(password, user.password);
        if(!isPaswordValid){
            return res.json({msg: "Account with username and password not found", status: false});
        }
        console.log(user.password);
        console.log(password);
        delete user.password;

        return res.json({status:true, user});
    } catch(err){
        next(err);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image; // Fix: use the correct variable name

        if (!avatarImage) {
            return res.status(400).json({ error: "Image is required" });
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage: avatarImage // Ensure this matches the field name in your schema
            },
            { new: true } // Returns updated user
        );

        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
    } catch (err) {
        next(err);
    }
};