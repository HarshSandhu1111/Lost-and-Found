const express = require('express');
const { signup, login, createpost, feed, edit } = require('../Controllers/user');
const Router = express.Router();
const auth = require('../middleware/auth');

Router.get('/',(req,res)=>{
    res.send("Backend Running");
});
Router.post('/signup',signup);
Router.post('/login',login);
Router.post('/createpost',auth,createpost);
Router.get('/feed',auth,feed);
Router.put('/edit/:id',auth,edit);

module.exports = Router;