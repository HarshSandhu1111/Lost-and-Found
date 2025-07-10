const express = require("express");
const app = express();
require('dotenv').config();

port=process.env.port;

app.listen(port,()=>{
    console.log("server running on port",port);
    
})