const comments = require("../database/comment-queries");
const todos = require("../database/todo-queries");
const users = require("../database/user-queries");

async function addComment(req, res) {
  const task_id = req.params.id;
  const { user_email, content } = req.body;

  if (!content || !user_email)
    return res.status(400).send("Missing content or user email");

  const task = await todos.get(task_id);
  if (!task) return res.status(404).send("Task not found");

  const user = await users.getByEmail(user_email);
  if (!user) return res.status(404).send("User not found");

  const [comment] = await comments.create(task_id, user.id, content);
  res.status(201).json(comment);
}

async function getComments(req, res) {
  const task_id = req.params.id;

  const task = await todos.get(task_id);
  if (!task) return res.status(404).send("Task not found");

  const list = await comments.getByTaskId(task_id);
  res.status(200).json(list);
}

module.exports = { addComment, getComments };
