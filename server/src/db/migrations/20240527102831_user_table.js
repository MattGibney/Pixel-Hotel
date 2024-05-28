/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('figure').notNullable();
    table.string('birthday').notNullable();
    table.string('phone_number').notNullable();
    table.string('custom_data').notNullable();
    table.boolean('has_read_agreement').notNullable();
    table.string('gender').notNullable();
    table.string('country').notNullable();
    table.boolean('has_special_rights').notNullable();
    table.string('badge_type').notNullable();
    table.integer('gold').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
