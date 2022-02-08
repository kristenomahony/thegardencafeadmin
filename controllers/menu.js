const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Items = require('../models/items')

router.get('/', async (req, res, next) => {
  try {
    let items = await Items.findAll({})
    res.render('menu', { items })
  } catch (err) {
    next(err)
  }
})

router.get('/menu/:id/update', async (req, res, next) => {
  try {
    let item = await Items.findById(req.params.id)

    res.render('menu/update', { item })
  } catch (err) {
    next(err)
  }
})

router.delete('/menu/:id', async (req, res, next) => {
  try {
    let deletedItem = await Items.findByIdAndDelete(req.params.id)
    res.redirect('menu')
  } catch (err) {
    next(err)
  }
})

router.get('/create', (req, res, next) => {
  try {
    res.render('menu/create')
  } catch (err) {
    next(err)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    let item = await Items.create(req.body)
    res.redirect(`menu/${item._id}`)
  } catch (err) {
    next(err)
  }
})

router.patch('/menu/:id', async (req, res, next) => {
  try {
    let updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.redirect(`/menu/${updatedItem._id}`)
  } catch (err) {
    next(err)
  }
})
