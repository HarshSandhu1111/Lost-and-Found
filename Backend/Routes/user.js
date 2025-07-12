const express = require('express');
const { signup, login } = require('../Controllers/user');
const Router = express.Router();

Router.get('/',(req,res)=>{
    res.send("Backend Running");
});
Router.post('/signup',signup);
Router.post('/login',login);


module.exports = Router;