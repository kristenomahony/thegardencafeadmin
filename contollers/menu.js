// Import Packages
const express = require('express')
const router = express.Router()
//const Menu_item = require('../models/menu_item')
//const User = require('../models/users')

// Create POST controller

router.get('/menu', async (req, res, next) => {
  try {
    // if is breakfast, luch or dinner display the menu according to the time
    res.render('/menu', req.body)
  } catch (err) {
    next(err)
  }
})

// Export module
module.exports = router
