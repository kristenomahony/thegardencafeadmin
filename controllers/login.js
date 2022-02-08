const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')

router.get('/', (req, res) => {
  res.redirect('login')
})

router.post('/login', async (req, res, next) => {
  try {
    let loggedAdmin = await Admins.findOne({
      name: req.body.name,
      password: req.body.password
    })
    if (loggedAdmin) {
      req.login(loggedAdmin, err => {
        res.redirect('/home')
      })
    } else {
      throw new Error('Name or password is wrong!')
    }
  } catch (err) {
    next(err)
  }
})
