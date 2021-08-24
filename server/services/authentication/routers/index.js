const router = require('express').Router()
const AuthControllers = require('../controllers/authController')

router.post('/register', AuthControllers.register)
router.post('/login', AuthControllers.login)

module.exports = router
