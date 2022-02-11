const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Orders = require('../models/orders')
const Users = require('../models/users')

router.get('/', async (req, res, next) => {
  try {
    let orders = await Orders.find({
      // date: req.query.date
    })
      .populate({
        path: 'customer content.item'
      })
      .sort('date')
    // console.log(JSON.stringify(orders, null, 2))
    res.render('orders/list', { orders })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/update', async (req, res, next) => {
  try {
    let order = await Orders.findById(req.params.id).populate({
      path: 'customer content.item '
    })

    res.render('orders/update', { order })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let deletedOrder = await Orders.findByIdAndDelete(req.params.id)
    res.redirect('orders/list')
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    console.log('FROM THE FORM', req.body)
    let order = await await Orders.findById(req.params.id)
    console.log('IN DB', JSON.stringify(order, null, 2))
    order.content = order.content.map((e, i) => {
      e.quantity = req.body.quantity[i]
      return e
    })
    await order.save()
    res.redirect(`/orders`)
  } catch (err) {
    next(err)
  }
})
module.exports = router
