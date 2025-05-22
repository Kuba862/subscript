const app = require('./server-config.js');
const routes = require('./server-routes.js');
const { createUser, searchUser } = require('./controllers/user-controller');
const { assignTask } = require('./controllers/task-controller');

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;