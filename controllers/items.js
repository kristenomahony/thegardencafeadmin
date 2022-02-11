const express = require('express')
const router = express.Router()
const passport = require('passport')
const Admins = require('../models/admins')
const Items = require('../models/items')

router.get('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.redirect('/login')
    } else {
      let items = await Items.find({
        name: { $regex: req.query.search || '', $options: 'i' }
      })
      let breakfast_items = items.filter(e => e.time == 'breakfast')
      let lunch_items = items.filter(e => e.time == 'lunch')
      let allday_items = items.filter(e => e.time == 'allday')
      let dinner_items = items.filter(e => e.time == 'dinner')
      res.render('menu/items', {
        breakfast_items,
        lunch_items,
        allday_items,
        dinner_items,
        user: req.user
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/update', async (req, res, next) => {
  try {
    // if (!req.isAuthenticated()) {
    //   res.redirect('/auth/login')
    // } else {
    let item = await Items.findById(req.params.id)
    res.render('menu/update', { item })
    // }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let deletedItem = await Items.findByIdAndDelete(req.params.id)
    res.redirect(`/items`)
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

router.post('/', async (req, res, next) => {
  try {
    let item = await Items.create(req.body)

    res.redirect(`/items`)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    let updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.redirect(`/items`)
  } catch (err) {
    next(err)
  }
})
module.exports = router
