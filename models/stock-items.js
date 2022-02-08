const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('stock-items', {
  restaurant: {
    type: ObjectId,
    ref: 'admin',
    required: true
  },
  stock_item: {
    type: ObjectId,
    ref: 'menu-items',
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
