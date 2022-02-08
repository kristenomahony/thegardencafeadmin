const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('admins', {
  email: {
    type: String,
    rewuired: true
  },
  google_id: {
    type: String,
    requird: true
  }
})
