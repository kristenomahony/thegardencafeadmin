const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('restaurants', {
  type: ObjectId,
  // ref: "admin" log in with google
  required: true
})
