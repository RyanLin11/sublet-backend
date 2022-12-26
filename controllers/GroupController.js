const createError = require('http-errors');
const GroupService = require('../services/GroupService');

class GroupController {
    static async getGroups(req, res, next) {
        try {
            const groups = await GroupService.getGroups();
            res.send(groups);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async getGroup(req, res, next) {
        try {
            const group = await GroupService.getGroupById(req.params.id);
            res.send(group);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async createGroup(req, res, next) {
        try {
            const group = await GroupService.createGroup(req.body);
            res.send(group);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async deleteGroup(req, res, next) {
        try {
            await GroupService.deleteGroup(req.params.id);
            res.sendStatus(200);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }
}

module.exports = GroupController;