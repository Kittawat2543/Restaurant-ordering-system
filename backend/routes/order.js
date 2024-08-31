const express = require('express')
const router = express.Router()
const {
    createOrder,
    getOrder,
    updateOrder,
    removeOrder,
    bill
} = require('../controllers/order')
const { auth } = require('../middleware/auth')


router.get('/order', auth, getOrder)
router.post('/order', auth, createOrder)
router.put('/order/:id', auth, updateOrder)
router.delete('/order/:id', auth, removeOrder)
router.get('/order/:id/bill', auth, bill)




module.exports = router