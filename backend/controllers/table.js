const Table = require('../models/Table')


exports.getTable = async (req, res) => {
    try {
        const tables = await Table.find()

        res.json(tables)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error"})
    }
}


exports.createTable = async (req, res) => {
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

}