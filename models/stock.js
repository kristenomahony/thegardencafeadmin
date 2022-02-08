const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('stock', {
  item: {
    type: ObjectId,
    ref: 'items',
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
