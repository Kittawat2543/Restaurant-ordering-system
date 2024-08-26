const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')



const app = express()
dotenv.config()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: "10mb" }))


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connect to MongoDB"))
    .catch(err => console.log("MongoDB Connect Error", err))



readdirSync("./routes").map((r) => {
    app.use('/api', require("./routes/" + r))
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
