const app = require('express')();
const bodyParser = require('body-parser');
const tasksContainer = require('./tasks.json');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * GET /tasks
 * 
 * Return the list of tasks with status code 200.
 */
app.get('/tasks', async (req, res) => {
    try {
        res.status(200).json(tasksContainer.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

/**
 * Get /task/:id
 * 
 * id: Number
 * 
 * Return the task for the given id.
 * 
 * If found return status code 200 and the resource.
 * If not found return status code 404.
 * If id is not valid number return status code 400.
 */
app.get('/task/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = tasksContainer.tasks.find(task => task.id === id);
        if (!task) return res.status(404).json({ error: 'Task não encontrada' });
        else if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
        else return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
});

/**
 * PUT /task/update/
 * 
 * id: Number
 * title: string
 * description: string
 * 
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.put('/task/update', async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const task = tasksContainer.tasks.find(task => task.id === id);

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
        else if (!task) return res.status(404).json({ error: 'Task não encontrada' });

        Object.assign(task, updates);
        return res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Erro ao editar tarefa' });
    }
});

/**
 * POST /task/create
 * 
 * title: string
 * description: string
 * 
 * Add a new task to the array tasksContainer.tasks with the given title and description.
 * Return status code 201.
 */
app.post('/task/create', async (req, res) => {
    try {
        const tasks = tasksContainer.tasks;
        const newTask = {
            id: tasks[tasks.length - 1]?.id + 1 || 1,
            title: req.body.title,
            done: false,
        };

        tasksContainer.tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Erro ao criar nova tarefa' });
    }
});

/**
 * DELETE /task/delete
 * 
 * id: Number
 * 
 * Delete the task linked to the  given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete('/task/delete/:id',  async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = tasksContainer.tasks.find(task => task.id === id);

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
        else if (!task) return res.status(404).json({ error: 'Task não encontrada' });

        tasksContainer.tasks = tasksContainer.tasks.filter(task => task.id !== id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Erro ao deletar tarefa' });
    }
});

app.listen(9001, () => {
  process.stdout.write('the server is available on http://localhost:9001/\n');
});
