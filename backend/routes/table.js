const express = require('express')
const router = express.Router()

const { getTable, createTable } = require('../controllers/table')
const { auth } = require('../middleware/auth')



router.get('/table',auth, getTable)
router.post('/table',auth, createTable )



module.exports = router