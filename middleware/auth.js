const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const AuthMiddleware = {};

AuthMiddleware.generateAccessToken = function generateAccessToken(userLoad) {
  console.log(userLoad);
  return jwt.sign(userLoad.toJSON(), process.env.SECRET_OR_KEY, {
    expiresIn: keys.expiresIn
  });
};

AuthMiddleware.verifyToken = function verifyToken(req, res, next) {
  let bearer = req.headers['token'];

  let token = bearer ? bearer.split(' ')[1] : null;

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  function verifyCallBack(error, decode) {
    if (error) return res.status(401).json({ error: 'Access Denied' });

    res.decoded = decode;

    return next();
  }

  return jwt.verify(token, process.env.SECRET_OR_KEY, verifyCallBack);
};

module.exports = AuthMiddleware;
