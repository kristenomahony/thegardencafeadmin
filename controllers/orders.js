const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Orders = require('../models/orders')

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
    let order = await Orders.findById(req.params.id)

    res.render('order/update', { order })
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
    let updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.redirect(`orders/list/${updatedItem._id}`)
  } catch (err) {
    next(err)
  }
})
module.exports = router
