const knex = require('./knex');

class UserService {
    static async getUsers() {
        return knex('users').select('*');
    }

    static async createUser(fields) {
        const result = await knex('users').insert(fields, ['id']);
        const id = result[0]['id'];
        return this.getUserById(id);
    }

    static getUser(fields) {
        return knex('users').select('*').where(fields);
    }

    static async getUserById(id) {
        let result = await knex('users').select('*').where('id', id);
        return result[0];
    }

    static async updateUserById(id, fields) {
        await knex('users').where({ id }).update(fields);
    }

    static async deleteUserById(id) {
        await knex('users').where({ id }).del();
    }
}

module.exports = UserService;