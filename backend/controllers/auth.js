const User = require('../models/Users')
const brcypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, password, role } = req.body
        var user = await User.findOne({ name })

        if (user) {
            return res.status(400).json({msg: 'User already exists'})
        }


        const salt = await brcypt.genSalt(10)
        const passwordHash = await brcypt.hash(password,salt)


        user = new User({
            name,
            password: passwordHash,
            role
        })

        await user.save()

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        res.json(payload)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
        
    }
}


exports.login = async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(400).json({msg: 'User Not Found'})
        }

        const isMatch = await brcypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({msg: 'Name or Password Invalid'})
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) throw err
            res.json({token})
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}