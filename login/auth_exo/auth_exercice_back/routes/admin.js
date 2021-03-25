const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controllers')
const checkAuth = require('../middlewares/auth.middlewares')

router.get('/', checkAuth, adminController.admin)

module.exports = router