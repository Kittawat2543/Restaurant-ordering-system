const express = require('express')
const {
    getMenu,
    createMenu,
    updateMenu,
    removeMenu
} = require('../controllers/menu')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.get('/menu', auth, getMenu)
router.post('/menu', auth, createMenu)
router.put('/menu/:id', auth, updateMenu)
router.delete('/menu/:id', auth, removeMenu)



module.exports = router
