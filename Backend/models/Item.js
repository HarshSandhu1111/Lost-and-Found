const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },

  location: {
    type: String,
    required: true
  },
  dateLostOrFound: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: '' ,
  },

  contactPhone: {
    type: String,
    required: false
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  status: {
    type: String,
    enum: ['active', 'claimed', 'closed'],
    default: 'active'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);
