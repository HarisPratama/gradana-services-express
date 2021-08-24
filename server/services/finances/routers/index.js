const router = require('express').Router()
const BalanceController = require('../controllers/balanceController')

router.post('/finance/topup', BalanceController.topUp)
router.get('/finance/:id', BalanceController.getBalance)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Finance service' })
})

module.exports = router
