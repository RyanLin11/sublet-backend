const createError = require('http-errors');

function authenticate(req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        next(createError(403, 'Not logged in'));
    }
}

module.exports = authenticate;