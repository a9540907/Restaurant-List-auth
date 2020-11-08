const express = require('express')
// 引入路由模組
const router = express.Router()

const home = require('./modules/home')
const Restaurant = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth')
const sort = require('./modules/sort')
const users = require('./modules/users')



router.use('/restaurants', authenticator, Restaurant)
router.use('/users', users)
router.use('/sort', sort)
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router