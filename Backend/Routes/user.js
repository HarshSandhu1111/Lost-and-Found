const express = require('express');
const { signup } = require('../Controllers/user');
const Router = express.Router();

Router.get('/',(req,res)=>{
    res.send("Backend Running");
});
Router.post('/signup',signup);


module.exports = Router;