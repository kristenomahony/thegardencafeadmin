const passport = require('passport')
const Admins = require('../models/admins')
const Orders = require('../models/orders')

router.get('/orders', async (req, res, next) => {
  try {
    let orders = await Orders.find({
      date: req.query.date
    })
    res.render('orders', { orders })
  } catch (err) {
    next(err)
  }
})

router.get('orders/:id/update', async (req, res, next) => {
  try {
    let order = await Orders.findById(req.params.id)

    res.render('order/update', { order })
  } catch (err) {
    next(err)
  }
})

router.delete('/orders/:id', async (req, res, next) => {
  try {
    let deletedOrder = await Orders.findByIdAndDelete(req.params.id)
    res.redirect('orders')
  } catch (err) {
    next(err)
  }
})

router.patch('/orders/:id', async (req, res, next) => {
  try {
    let updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.redirect(`orders/${updatedItem._id}`)
  } catch (err) {
    next(err)
  }
})
