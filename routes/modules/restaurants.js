const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  // const userId = req.user._id
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description
  const restaurant = req.body
  const userId = req.user._id

  return Restaurant.create(
    // name, name_en, category, image, location, phone, google_map, rating, description
    { restaurant, userId }
  )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurants_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurants_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/:restaurants_id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.restaurants_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.error(error))
})

router.put('/:restaurants_id', (req, res) => {
  const userId = req.user._id
  const id = req.params.restaurants_id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description
  return Restaurant.findOne({ _id, userId })
    .then(list => {
      // list.name = name
      // list.name_en = name_en
      // list.category = category
      // list.image = image
      // list.location = location
      // list.phone = phone
      // list.google_map = google_map
      // list.rating = rating
      // list.description = description
      list = Object.assign(list, req.body)
      return list.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurants_id', (req, res) => {
  const userId = req.user._id
  const id = req.params.restaurants_id
  return Restaurant.findOne({ _id, userId })
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router