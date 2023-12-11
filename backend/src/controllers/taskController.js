const taskService = require('../services/taskService');

/* GET tasks. */
async function getTasks(req, res, next) {
    try {
        const result = await taskService.getTasks(req.userId);
        res.json(result);
    } catch (err) {
        console.error(`Error while getting tasks with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* POST task. */
async function createTask(req, res, next) {
    try {
        const result = await taskService.createTask(req.userId, req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while creating task with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* PUT task. */
async function updateTask(req, res, next) {
    try {
        const result = await taskService.updateTask(req.userId, req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while updating task with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* DELETE task. */
async function deleteTask(req, res, next) {
    try {
        const result = await taskService.deleteTask(req.userId, req.params.id);
        res.json(result);
    } catch (err) {
        console.error(`Error while deleting task with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* GET tasks today. */
async function getTasksToday(req, res, next) {
    try {
        const result = await taskService.getTasksToday(req.userId);
        res.json(result);
    } catch (err) {
        console.error(`Error while getting today's tasks:`, err.message);
        next(err);
    }
}

/* GET tasks upcoming. */
async function getTasksUpcoming(req, res, next) {
    try {
        const result = await taskService.getTasksUpcoming(req.userId);
        res.json(result);
    } catch (err) {
        console.error(`Error while getting upcoming tasks:`, err.message);
        next(err);
    }
}

/* GET task by id. */
async function getTaskById(req, res, next) {
    try {
        const result = await taskService.getTaskById(req.userId, parseInt(req.params.id));
        res.json(result);
    } catch (err) {
        console.error(`Error while getting task with id ${req.params.id}:`, err.message);
        next(err);
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksToday,
    getTasksUpcoming,
    getTaskById,
};
