const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')
const { getTable, createTable, updateTable, removeTable } = require('../controllers/table')



router.get('/table',auth, getTable)
router.post('/table',auth, createTable )
router.put('/table/:id',auth, updateTable )
router.delete('/table/:id',auth, removeTable )



module.exports = router