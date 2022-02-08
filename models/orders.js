const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('orders', {
  order_number: {
    type: Number,
    required: true
  },
  customer_name: {
    type: ObjectId,
    ref: 'users',
    required: true
  },
  menu_item: {
    type: ObjectId,
    ref: 'menu-items',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  }
})
