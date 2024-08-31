const Order = require('../models/Order')
const Table = require('../models/Table')
const MenuItem = require('../models/MenuItem')

exports.createOrder = async (req, res) => {
    try {
        const { tableId, items } = req.body

        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).json({msg: 'Table not found'})
        }

        if (table.status === "occupied") {
            return res.status(400).json({msg: 'Table is currently occupied'})
        }

        let total = 0
        
        for (let item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId)
            if (!menuItem) {
                res.status(404).json({msg: `menu not found: ${item.menuItemId}`})
            }
            total += menuItem.price * item.quantity
        }

        const order = new Order({
            table: tableId,
            items: items.map(item => ({
                menuItem: item.menuItemId,
                quantity: item.quantity
            }))
        })

        await order.save()


        table.status = 'occupied'

        await table.save()

        res.json(order)

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
}

exports.getOrder = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('table', 'tableNumber')
            .populate('items.menuItem', 'name price')
        res.json(orders)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { status } = req.body

        let order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({msg: 'Order not found'})
        }

        order.status = status || order.status

        await order.save()

        if (status === 'paid') {
            const table = await Table.findById(order.table)
            table.status = 'available'
            await table.save()
        }
        res.json(order)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

exports.removeOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({msg: 'Order not found'})
        }

        if (order.status !== "paid") {
            const table = await Table.findById(order.table)
            table.status = 'avaliable'
            await table.save()
        }

        await order.remove()
        res.json({msg: 'Order removed'})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

exports.bill = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
            .populate('table', 'tableNumber')
            .populate('items.menuItem', 'name price')
        
        if (!order) {
            return res.status(404).json({msg: 'Order not found'})
        }

        const bill = {
            orderId : order.id,
            tableNumber: order.table.tableNumber,
            items: order.items.map(item => ({
                name: item.menuItem.name,
                price: item.menuItem.price,
                quantity: item.quantity,
                total:  item.menuItem.price * item.quantity
            })),
            total: order.total
        }

        res.json(bill)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}