const knex = require('./connection');

async function createUser(name, email) {
    return knex('users').insert({ name, email }).returning('*');
}

async function get(id) {
    return knex('users').where({ id }).first();
}

async function findByEmail(email) {
    return knex('users').where({ email }).first();
}

module.exports = { createUser, get, findByEmail };