const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { error } = require('../Utils/responseWrapper')
module.exports = async (req, res, next) => {
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        // return res.status(401).send("Authorization header is require")
        return res.send(error(401, 'Authorization header is require'))
    }
    const accessToken = req.headers.authorization.split(" ")[1]
    try {
        const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY)
        req._id = token._id

        const user = await User.findById(req._id)
        if (!user) {
            return res.send(error(404, 'User not found'))
        }
        next()
    } catch (err) {
        // return res.status(401).send("Invalid access key")
        return res.send(error(401, 'Invalid access key in middleware'))
    }
}