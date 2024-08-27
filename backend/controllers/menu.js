const MenuItem = require('../models/MenuItem')

// Get all menu
exports.getMenu = async (req, res) => {
    try {
        const menu = await MenuItem.find()
        res.json(menu)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

// Add new menu
exports.createMenu = async (req, res) => {
    try {
   
        const { name, description, price, category } = req.body
        var menuItem = new MenuItem({
            name,
            description,
            price,
            category
        })
        
        await menuItem.save()
        res.json(menuItem)


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

// Update Menu
exports.updateMenu = async (req, res) => {
    try {
        const id = req.params.id
        var newData = req.body
        
        const updatedMenu = await MenuItem.findOneAndUpdate({ _id: id }, newData, { new: true }).exec()
        res.json(updatedMenu)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

// Delete menu
exports.removeMenu = async (req, res) => {
    try {
        const id = req.params.id
        const removedMenu = await MenuItem.findOneAndDelete({ _id: id }).exec()
        
        res.json(removedMenu)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}