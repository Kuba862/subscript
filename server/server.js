const app = require('./server-config.js');
const routes = require('./server-routes.js');
const { createUser, searchUser } = require('./controllers/user-controller');
const { assignTask } = require('./controllers/task-controller');
const { createProject, assignToProject, assignProjectToUser } = require('./controllers/project-controller');
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

// task routes
app.patch('/todos/:id/assign', assignTask);

// project routes
app.post('/projects', createProject);
app.get('/projects/:id/tasks', routes.getTasksForProject);
app.patch('/todos/:id/assign-to-project', assignToProject);
app.patch('/projects/:id/assign-to-user', assignProjectToUser);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;