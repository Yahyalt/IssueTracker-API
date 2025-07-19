/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('issues', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.enu('status', ['open', 'in_progress', 'closed']).defaultTo('open');
    table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium');
    table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
    table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('issues');
};
