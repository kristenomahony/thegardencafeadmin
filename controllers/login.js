const express = require('express')
const router = express.Router()
// const passport = require('passport')
// const Admins = require('../models/admins')

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res, next) => {
  try {
    req.logout()
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.clearCookie('connect.sid')
      res.redirect('login')
    })
  } catch (err) {
    throw err
  }
})

router.post('/', async (req, res, next) => {
  res.redirect('/home')
  // try {
  //   let loggedAdmin = await Admins.findOne({
  //     name: req.body.name,
  //     password: req.body.password
  //   })
  //   if (loggedAdmin) {
  //     req.login(loggedAdmin, err => {
  //       res.redirect('/home')
  //     })
  //   } else {
  //     throw new Error('Name or password is wrong!')
  //   }
  // } catch (err) {
  //   next(err)
  // }
})
module.exports = router
