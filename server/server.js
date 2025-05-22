const app = require('./server-config.js');
const routes = require('./server-routes.js');
const { createUser, searchUser, getUserSummary } = require('./controllers/user-controller');
const { assignTask } = require('./controllers/task-controller');
const { createProject, assignToProject, assignProjectToUser } = require('./controllers/project-controller');
const { addComment, getComments } = require('./controllers/comment-controller');

const port = process.env.PORT || 5001;

app.get('/', routes.getAllTodos);
app.get('/:id', routes.getTodo);

app.post('/', routes.postTodo);
app.patch('/:id', routes.patchTodo);

app.delete('/', routes.deleteAllTodos);
app.delete('/:id', routes.deleteTodo);

// user routes
app.post('/users', createUser);
app.post('/users/search', searchUser);
app.get('/users/:id/summary', getUserSummary);
// task routes
app.patch('/todos/:id/assign', assignTask);

// project routes
app.post('/projects', createProject);
app.get('/projects/:id/tasks', routes.getTasksForProject);
app.patch('/todos/:id/assign-to-project', assignToProject);
app.patch('/projects/:project_id/assign-to-user', assignProjectToUser);

// comment routes
app.post('/todos/:id/comments', addComment);
app.get('/todos/:id/comments', getComments);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;