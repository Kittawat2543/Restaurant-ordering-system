const Table = require('../models/Table')

// Get all table
exports.getTable = async (req, res) => {
    try {
        const tables = await Table.find()

        res.json(tables)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}

// Add new table
exports.createTable = async (req, res) => {
    try {
        const { tableNumber, seats } = req.body
        var table = await Table.findOne({ tableNumber })
        if (table) {
            return res.status(400).json({ msg: 'Table already exists' })
        }

        table = new Table({
            tableNumber,
            seats
        })

        await table.save()
        res.json(table)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }

}

// Update table
exports.updateTable = async (req, res) => {
    try {

        const id = req.params.id
        var newData = req.body

        const updatedTable = await Table.findOneAndUpdate({ _id: id }, newData, { new: true }).exec()

        if (!updated) {
            return res.status(404).json({msg: 'Table not found'})
        }

        res.json(updatedTable)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
}

// Delete table
exports.removeTable = async (req, res) => {
    try {
        const id = req.params.id
        const removedTable = Table.findOneAndDelete({ _id: id }).exec()
        
        res.send(removedTable)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    
    }
}