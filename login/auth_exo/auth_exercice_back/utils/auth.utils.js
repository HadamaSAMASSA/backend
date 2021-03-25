const jwt = require('jsonwebtoken');
const jwtsecret = "unsecretcool321";

function generateToken(email) {
    return jwt.sign({email}, jwtsecret, {
        expiresIn: 3600
    });
}

function verifyToken(token) {
    return jwt.verify(token, jwtsecret);
}

module.exports = {
    generateToken,
    verifyToken
}