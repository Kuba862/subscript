const knex = require("./connection");

async function create(task_id, user_id, content) {
  return knex("comments").insert({ task_id, user_id, content }).returning("*");
}

async function getByTaskId(task_id) {
  return knex("comments").where({ task_id }).orderBy("created_at", "asc");
}

module.exports = { create, getByTaskId };
