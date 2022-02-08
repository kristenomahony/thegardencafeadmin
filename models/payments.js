const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the results moodel
module.exports = mongoose.model('payments', {
  users: {
    type: ObjectId,
    ref: 'user in google' //preguntar como se hace eso
  },
  payment: {
    type: ObjectId,
    ref: 'user in google' //preguntar como se hace eso
  },
  name: {
    type: String,
    required: true
  }
})
