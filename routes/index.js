const express = require('express')
// 引入路由模組
const router = express.Router()

const home = require('./modules/home')
const Restaurant = require('./modules/restaurants')
const sort = require('./modules/sort')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', Restaurant)
router.use('/sort', sort)
router.use('/users', users)

// 匯出路由器
module.exports = router