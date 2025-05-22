/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("assigned_tasks").defaultTo(0);
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.schema.table("todos", function (table) {
        table
          .integer("project_id")
          .unsigned()
          .references("id")
          .inTable("projects")
          .onDelete("SET NULL");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table("todos", function (table) {
      table.dropColumn("project_id");
    })
    .then(() => {
      return knex.schema.dropTable("projects");
    });
};
