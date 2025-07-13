const express = require('express');
const User = require('../models/user');
const generatetoken = require('../config/generatetoken');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bcrypt = require('bcryptjs');
const Item = require('../models/Item');

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

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });

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


//create post function 
const createpost = async (req,res) => {
  const {title,description,type,location,dateLostOrFound,imageUrl,contactPhone,status} = req.body;
  if(!title || !description || !type ||!location ||!dateLostOrFound ||!contactPhone){
    return res.json("All fields are required");
  }
  try{
  const item = await Item.create({
    title,description,type,location,dateLostOrFound,imageUrl,contactPhone,status,postedBy:req.user.id
  });
  return res.status(200).json(item);
  }
  catch(error){
        console.log(error);
    return res.json(error);
  }

}

//feed 
const feed = async (req,res) => {
  try {
    const item = await Item.find({ status: 'active' });
    res.status(200).json(item);

  } catch (error) {
    return res.json(error);
  }
}

//update or edit the data
const edit = async (req, res) => {
  const { id } = req.params;

  try {

    const updates = {};
    
    // Step 2: List of allowed fields that can be updated
    const allowedFields = [
      'title', 'description', 'type',
      'location', 'dateLostOrFound',
      'imageUrl', 'contactPhone', 'status'
    ];

    // Step 3: Check which fields are present in req.body
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Step 4: Update the document in MongoDB using its ID
    const updatedItem = await Item.findByIdAndUpdate(id, updates, {
      new: true,            
      runValidators: true    
    });

    // Step 5: If item not found, return 404
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Step 6: Send updated item as response
    res.status(200).json(updatedItem);

  } catch (error) {
    // Step 7: Catch any errors and return a 500 response
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
};


module.exports = {signup,login,createpost,feed,edit}