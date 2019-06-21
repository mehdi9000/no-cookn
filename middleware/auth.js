const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const AuthMiddleware = {};

AuthMiddleware.generateAccessToken = function generateAccessToken(userLoad) {
  console.log(userLoad);
  return jwt.sign(userLoad.toJSON(), keys.secretOrKey, {
    expiresIn: keys.expiresIn
  });
};

AuthMiddleware.verifyToken = function verifyToken(req, res, next) {
  let bearer = req.headers['Authorization'];

  let token = bearer ? bearer.split(' ')[1] : null;

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  function verifyCallBack(error, decode) {
    if (error) return res.status(401).json({ error: 'Access Denied' });

    res.decoded = decode;

    return next();
  }

  return jwt.verify(token, keys.secretOrKey, verifyCallBack);
};

module.exports = AuthMiddleware;
