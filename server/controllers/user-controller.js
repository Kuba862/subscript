const users = require("../database/user-queries");
const knex = require("../database/connection");

async function createUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).send('Missing name or email');

    try {
        const [user] = await users.createUser(name, email);
        res.status(201).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

async function searchUser(req, res) {
    const { email } = req.body;

    if (!email) return res.status(400).send("Missing email");

    try {
        const user = await users.findByEmail(email);
        res.status(200).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error searching user");
    }
}

async function getUserSummary(req, res) {
    const user_id = req.params.id;
    const user = await users.get(user_id);

    if(!user) return res.status(404).send('User not found');

    const directProjects = await knex('projects').where('projects.owner_id', user_id);

    const taskProjects = await knex('projects').distinct('projects.id', 'projects.name').join("todos", "projects.id", "todos.project_id").where('todos.assignee_id', user_id);

    const mergedProjects = [...directProjects, ...taskProjects.filter(p => !directProjects.find(dp => dp.id === p.id))];

    const [{ count }] = await knex("todos").where({ assignee_id: user_id, completed: false }).count();
    res.status(200).json({user, projects: mergedProjects, incomplete_tasks_count: parseInt(count, 10)});
}

module.exports = { createUser, searchUser, getUserSummary };