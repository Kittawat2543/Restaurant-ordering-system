const express = require('express')
const {
    getMenu,
    createMenu,
    updateMenu,
    removeMenu
} = require('../controllers/menu')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.get('/menu', getMenu)
router.post('/menu',createMenu)
router.put('/menu/:id',updateMenu)
router.delete('/menu/:id',removeMenu)



module.exports = router
