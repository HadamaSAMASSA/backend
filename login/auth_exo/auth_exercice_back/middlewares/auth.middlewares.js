const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/auth.utils');

module.exports = async (req, res, next) => {
    // J'enleve la valeur Bearer ajouté
    const simpleToken = req.headers.authorization.split(" ")[1];
    // Je recupere le token decodé
    const decodedToken = verifyToken(simpleToken)
    // Je recherche l'utilisateur dans la DB, pour voir s'il existe bien
    const user = await UserModel.findOne({
        email: decodedToken.email
    })
    
    if (user) {
        req.toto = user;
        next()
    } else {
        res.status(400).send(err)
    }
}