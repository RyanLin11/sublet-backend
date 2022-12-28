const createError = require('http-errors');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');

class SessionController {
    // aka register
    static async createSession(req, res, next) {
        try {
            // do not create a new session if one already exists
            if (req.session.user_id) {
                res.status(400).send('You are already signed in');
                return;
            }
            // determine the value of attribute "user_id" that is assigned to this new session
            const result = await UserService.getUser({ username: req.body.username });
            if (result.length === 0) {
                return next(createError(400, 'Username does not exist'));
            }
            // determine if the request is authorized to add this attribute "user_id"
            const db_user = result[0];
            const isValid = await new Promise((resolve, reject) => {
                bcrypt.compare(req.body.password, db_user.password, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            });
            if (!isValid) {
                return next(createError(400, 'Username or password is incorrect'));
            }
            // Create session with this "user_id"
            req.session.user_id = db_user.id;
            res.status(200).send({ message: 'Session Created' });
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    // aka get identity or check if logged in
    static getMySession(req, res, next) {
        try {
            res.send(req.session);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    // aka logout
    static async deleteMySession(req, res, next) {
        try {
            // delete session
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            });
            res.status(200).send({ message: 'Session Deleted' });
        } catch (e) {
            return next(createError(500, e.message));
        }
    }
}

module.exports = SessionController;