const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Orders = require('../models/orders')
const Users = require('../models/users')
const Items = require('../models/items')
const stripe = require('stripe')(
  'sk_test_51KT1S3I0M9eDOSrmZbHI7UmKC46DxkPOrSPIRwr25MwizN1uDQRDhdPGHsq0oPE3ILrajniKfgRsh97MDIDSKVHd00eVDUks1L'
)

router.get('/', async (req, res, next) => {
  try {
    let orders = await Orders.find({})
      .populate({
        path: 'customer content.item'
      })
      .sort('date')
    // console.log(JSON.stringify(orders, null, 2))
    console.log(JSON.stringify(orders, null, 2))
    res.render('orders/list', { orders })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/update', async (req, res, next) => {
  try {
    let order = await Orders.findById(req.params.id).populate({
      path: 'customer content.item'
    })
    let items = await Items.find({})
    res.render('orders/update', { order, items })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let deletedOrder = await Orders.findByIdAndDelete(req.params.id)
    res.redirect('/orders')
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    let order = await Orders.updateOne(
      { _id: req.params.id },
      {
        $push: {
          content: {
            $each: [{ item: req.body.item_id, quantity: req.body.quantity }]
          }
        }
      }
    ).populate('content.item')

    //or// let order = await Orders.findById(req.params.id)
    // order.content.push({ item: req.body.item_id, quantity: req.body.quantity })
    // order.save()

    res.redirect('/orders')
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    let order = await Orders.findById(req.params.id)
      .populate({
        path: 'customer'
      })
      .populate({ path: ' content.item' })

    // console.log('newOrder', JSON.stringify(newOrder, null, 2))

    let newAmountToCharge = 0
    let newAmountToRefund = 0
    order.content.map((e, i) => {
      if (e.quantity < req.body.quantity[i]) {
        let diff = (req.body.quantity[i] - e.quantity) * e.item.price
        order.total_price += diff
        newAmountToCharge += diff
      } else if (e.quantity > req.body.quantity[i]) {
        let diff = (e.quantity - req.body.quantity[i]) * e.item.price
        order.total_price -= diff
        newAmountToRefund += diff
      } else {
        e.quantity = req.body.quantity[i]
        return e
      }
    })
    console.log(newAmountToRefund)
    // console.log(JSON.stringify(order, null, 2))
    await order.save()

    if (newAmountToCharge > newAmountToRefund) {
      const paymentIntent = await stripe.charges.create({
        customer: order.customer.stripe_id,
        amount: newAmountToCharge * 100,
        currency: 'eur'
      }) // Stripe charge newAmountToCharge
    } else {
      const refund = await stripe.refunds.create({
        charge: order.charge_id,
        amount: newAmountToRefund * 100
      })
    }
    res.redirect(`/orders`)
  } catch (err) {
    next(err)
  }
})
// app.listen(3002, () => console.log('Node server listening on port 3002!'))
module.exports = router
