// Import Packages
const express = require('express')
const router = express.Router()

// Create POST controller
router.get('/', (req, res) => {
  res.redirect('/Menu')
})

// Export module
module.exports = router
