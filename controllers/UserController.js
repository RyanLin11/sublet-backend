const createError = require('http-errors');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');

class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers();
            res.send(users);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async createUser(req, res, next) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await UserService.createUser(req.body);
            res.send(user);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async getUser(req, res, next) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.send(user);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async editUser(req, res, next) {
        try {
            const { 
                display_name,
                username,
                email,
                password,
                old_password
            } = req.body;
            const updateFields = {
                display_name,
            };

            // get current user data
            const db_user = await UserService.getUserById(req.params.id);

            // validate that new username is unique
            if (username !== db_user.username) {
                const existingUser = await UserService.getUser({ username });
                if (existingUser.length === 0) {
                    updateFields.username = username;
                } else {
                    return next(createError(400, 'Username is already taken'));
                }
            }
            // validate that new email is unique
            if (email && email !== db_user.email) {
                const existingUser = await UserService.getUser({ email });
                if (existingUser.length === 0) {
                    updateFields.email = email;
                } else {
                    return next(createError(400, 'This email is already associated with an account'));
                }
            }
            // validate user-provided current password
            if (password) {
                const isValid = await bcrypt.compare(old_password, db_user.password);
                if (isValid) {
                    updateFields.password = password;
                } else {
                    return next(createError(403, 'Password is incorrect'));
                }
            }
            await UserService.updateUserById(req.params.id, updateFields);
            res.status(200).send({ message: 'User Successfully Updated'});
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async deleteUser(req, res, next) {
        try {
            await UserService.deleteUserById(req.params.id);
            res.status(200).send({ message: 'User Successfully Deleted' });
        } catch (e) {
            return next(createError(500, e.message));
        }
    }
}

module.exports = UserController;