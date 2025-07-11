const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
     name: {
    type: String,
    required: true
  },
    email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
    phone:{
        type:String,

    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
        }
    ]


});
 
module.exports = mongoose.model('user',Userschema);
