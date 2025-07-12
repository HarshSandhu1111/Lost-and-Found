const express = require('express');
const User = require('../models/user');
const generatetoken = require('../config/generatetoken');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bcrypt = require('bcryptjs');

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

const login = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Step 2: Check if user exists
    const user = await User.findOne({ email });

    // Step 3: Compare password (plain vs hashed)
    if (user && await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generatetoken(user._id)
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};





module.exports = {signup,login}