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
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  charge_id: {
    type: ObjectId,
    required: true
  }
})
