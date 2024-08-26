const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers['authtoken']
        if (!token) {
            return res.status(401).json({msg: 'No Token'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user

        next()

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }





}