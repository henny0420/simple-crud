const jwt = require('jsonwebtoken')
const DB = require('../models')

const authorize = (tokenProvided = true, userAllowed = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.token

            if (!token) return res.status(400).json({
                status: false,
                message: "token not provided"
            })

            const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
            const userToFind = decodeToken.id
            const user = await DB.USER.findById(decodeToken.id)
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }

            const allowUser = userAllowed.find((val) => val === user.role)
            if (allowUser) {
                req.user = user
                next()
            }
            else {
                return res.status(403).json({ message: 'unauthorized access' })
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token', error: error.message })
        }
    }
}

module.exports = authorize