const knex = require('./knex');

class ListingService {
    static getListings() {
        return knex.select('*').from('listings');
    }

    static async createListing(fields) {
        const result = await knex('listings').insert(fields, ['id']);
        const id = result[0]['id'];
        return this.getListingById(id);
    }

    static getListingById(id) {
        return knex('listings').select('*').where('id', id);
    }

    static async updateListingById(id, fields) {
        await knex('listings').where({ id }).update(fields);
    }

    static async deleteListingById(id) {
        await knex('listings').where({ id }).del();
    }
}

module.exports = ListingService;