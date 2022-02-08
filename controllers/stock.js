const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Stock = require('../models/stock')

router.get('/stock', async (req, res, next) => {
  try {
    let items = await Stock.findAll({})
    res.render('stock', { items })
  } catch (err) {
    next(err)
  }
})

router.get('/stock/:id/update', async (req, res, next) => {
  try {
    let item = await Stock.findById(req.params.id)

    res.render('stock/update', { item })
  } catch (err) {
    next(err)
  }
})

router.delete('/stock/:id', async (req, res, next) => {
  try {
    let deletedItem = await Stock.findByIdAndDelete(req.params.id)
    res.redirect('stock')
  } catch (err) {
    next(err)
  }
})

router.get('/stock/create', (req, res, next) => {
  try {
    res.render('stock/create')
  } catch (err) {
    next(err)
  }
})

router.post('/stock/create', async (req, res, next) => {
  try {
    let item = await Stock.create(req.body)
    res.redirect(`stock/${item._id}`)
  } catch (err) {
    next(err)
  }
})

router.patch('/stock/:id', async (req, res, next) => {
  try {
    let updatedItem = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.redirect(`stock/${updatedItem._id}`)
  } catch (err) {
    next(err)
  }
})
