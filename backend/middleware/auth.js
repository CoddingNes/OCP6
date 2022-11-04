const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'ZTB34}j77c%-Yzw');
        const userId = decoded.userId;
        req.auth = {
            userId: userId
        };    
        next();
    }
    catch(err) {
        console.log(err);
        res.status(401).json({err});
    }
};