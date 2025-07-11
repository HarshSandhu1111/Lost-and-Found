const express = require('express');
const User = require('../models/user');
const generatetoken = require('../config/generatetoken');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signup = async(req,res)=>{
const {name,email,password,phone} = req.body;
if(!email || !name ||!password){
    res.status(400).json("please enter all fields");
}
try {
       if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "❌ Invalid email format" });
  }
    const alreadyexist = await User.findOne({email});
    if(alreadyexist){
      return res.status(400).json("user already exist");

    }
    const user = await User.create({
        name,
        email,
        password,
        phone
    });
   return res.json(
   { _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phone:user.phone,
            token:generatetoken(user._id)
});

} catch (error) {
res.json(error);    
}

}




module.exports = {signup}