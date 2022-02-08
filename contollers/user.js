// Import Packages
const express = require('express')
const router = express.Router()

//const Users = require('../models/users')
// Create POST controller

router.get('/login', (req, res) => {
  //if is login go to the payment else go to the login
  res.render('/payment')
})

router.get('/logout', (req, res) => {
  // req.logout()
  // req.session.destroy( => {
  //
  // })
})
// Export module
module.exports = router
