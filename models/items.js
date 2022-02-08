const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('items', {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
