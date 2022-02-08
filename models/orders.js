const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('orders', {
  order_number: {
    type: Number,
    required: true
  },
  customer: {
    type: ObjectId,
    ref: 'users',
    required: true
  },
  content: [
    {
      item: {
        type: ObjectId,
        ref: 'items',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
      }
    }
  ],
  total_price: {
    type: Number,
    required: true
  },
  date: {
    type: Date.now,
    required: true
  }
})
