const knex = require("./connection");

async function create(name) {
  return knex("projects").insert({ name }).returning("*");
}

async function get(id) {
  return knex("projects").where({ id }).first();
}

async function assignToUser(project_id, user_id) {
  return knex("projects")
    .where({ id: project_id })
    .update({ owner_id: user_id })
    .returning("*");
}

module.exports = { create, get, assignToUser };
