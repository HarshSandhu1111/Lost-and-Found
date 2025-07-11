const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret= process.env.SECRET ;
const generatetoken = (id)=>{
        return jwt.sign({id},secret,{expiresIn:"30d"});

}

module.exports = generatetoken;