const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require('dotenv').config();
port=process.env.port;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" Connected to MongoDB Atlas"));


app.listen(port,()=>{
    console.log("server running on port",port);
    
});