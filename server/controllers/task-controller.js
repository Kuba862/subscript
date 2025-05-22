const users = require("../database/user-queries");
const todos = require("../database/todo-queries");

async function assignTask(req, res) {
  const { user_email } = req.body;
  const { id } = req.params;

  const task = await todos.get(id);
  if (!task) return res.status(404).send("Task not found");

  const user = await users.findByEmail(user_email);
  if (!user) return res.status(404).send("User not found");

  const updated = await todos.update(id, { assignee_id: user.id });
  res.status(200).json(updated);
}

module.exports = { assignTask };