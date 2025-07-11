const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require('dotenv').config();
port=process.env.port;
const Routes = require('./Routes/user');

app.use(express.json());
app.use('/',Routes);




mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" ✅Connected to MongoDB Atlas"));


app.listen(port,()=>{
    console.log(" ✅server running on port",port);
    
});