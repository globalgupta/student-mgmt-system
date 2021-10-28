const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    let token = req.headers.authorization
    //console.log(token)
    if (!token) {
        res.status(401).json({
            message: 'unauthorized'
        })
        return;
    }
    
    let data = jwt.verify(token, 'SECRET')
    if (!data) {
        res.status(401).json({
            message: 'unauthorized'
        })
        return;
    } else {
        // req.currentUser = data[0];
        // console.log(req.currentUser.id)
        next();

    }
}

module.exports = validateToken;