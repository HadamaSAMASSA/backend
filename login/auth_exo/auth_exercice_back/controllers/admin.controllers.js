const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

module.exports.admin = async (req, res, next) => {
    try {
        const users = await UserModel.find({}).select('firstname surname dateOfBirth')
        console.log(users)
        res.json({data: users})
    } catch(err) {
        console.error(err)
        res.status(403).json({isNotConnected: true})
    }
}