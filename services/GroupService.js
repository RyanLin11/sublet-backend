const knex = require('./knex');

class GroupService {
    static getGroups() {
        return knex('groups').select('*');
    }

    static async createGroup(fields) {
        const result = await knex('groups').insert(fields, ["id"]);
        const id = result[0]['id'];
        return this.getGroupById(id);
    }

    static getGroupById(id) {
        return knex('groups').select('*').where('id', id);
    }

    static async updateGroupById(id, fields) {
        await knex('groups').where({ id }).update(fields);
    }

    static async deleteGroupById(id) {
        await knex('groups').where({ id }).del();
    }
}

module.exports = GroupService;