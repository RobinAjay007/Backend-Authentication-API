const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const authenticateToken = (req, res, next) => {
    let headers = req.headers;
    // ['authorization']
    // console.log(token)
    if (!headers) return res.status(401).json({ error: 'Unauthorized' });
    let bearer = headers.authorization.split(" ");
    const token= bearer[1];
    jwt.verify(token, keys.secretKey, (err, user) => {
        console.log(user)
        if (err) return res.status(403).json({ error: 'Forbidden' });
        console.log(user)
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = { authenticateToken, isAdmin };
