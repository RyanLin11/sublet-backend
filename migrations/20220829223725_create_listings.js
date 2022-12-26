/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('listings', function (table) {
        table.increments('id');
        table.float('rent').notNullable();
        table.integer('user_id').notNullable().references('users.id');
        table.integer('group_id').references('groups.id');
        table.string('address').notNullable();
        table.string('accommodation_type').notNullable();
        table.string('description');
        table.boolean('has_washroom').defaultTo(false).notNullable();
        table.timestamp('move_in_date').notNullable();
        table.timestamp('move_out_date').notNullable();
        table.string('listing_code').notNullable();
        table.string('contact_info').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('listings');
};
