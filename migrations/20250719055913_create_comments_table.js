/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('comments', function(table) {
    table.increments('id').primary();
    table.text('content').notNullable();
    table.integer('issue_id').unsigned().references('id').inTable('issues').onDelete('CASCADE');
    table.integer('author_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema.dropTable('comments');
};
