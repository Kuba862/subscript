const todos = require('../database/todo-queries');
const projects = require('../database/project-queries');
const users = require('../database/user-queries');

async function createProject(req, res) {
    const { name } = req.body;

    if(!name) return res.status(400).send("Missing name");

    const project = await projects.create(name);
    res.status(201).json(project);
}

async function assignToProject(req, res) {
    const { project_id } = req.body;
    const { id } = req.params;

    const task = await todos.get(id);
    if (!task) return res.status(404).send("Task not found");

    const updated = await todos.update(id, { project_id });
    res.status(200).json(updated);
}

async function assignProjectToUser(req, res) {
    const { user_email } = req.body;
    const { project_id } = req.params;

    const user = await users.findByEmail(user_email);
    if(!user) return res.status(404).send("User not found");

    console.log("project_id", project_id);
    console.log("user new", user);

    const project = await projects.get(project_id);
    if (!project) return res.status(404).send("Project not found");

    const updated = await projects.assignToUser(project_id, user.id);
    res.status(200).json(updated);
}

async function getTaskForProject(req, res) {
    const { id } = req.params;
    const project = await projects.get(id);

    if (!project) return res.status(404).send("Project not found");

    const tasks = await todos.getByProjectId(id);
    res.status(200).json(tasks);
}


module.exports = { createProject, assignToProject, assignProjectToUser, getTaskForProject };