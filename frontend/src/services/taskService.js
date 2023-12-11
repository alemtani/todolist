import { callApi } from '../utils';

/* GET tasks. */
async function getTasks(token) {
    const result = await callApi('tasks', 'GET', token, null);
    return result;
}

/* POST task. */
async function createTask(token, taskData) {
    const result = await callApi('tasks', 'POST', token, taskData);
    return result;
}

/* PUT task. */
async function updateTask(token, taskId, taskData) {
    const result = await callApi(`tasks/${taskId}`, 'PUT', token, taskData);
    return result;
}

/* DELETE task. */
async function deleteTask(token, taskId) {
    const result = await callApi(`tasks/${taskId}`, 'DELETE', token, null);
    return result;
}

/* GET today tasks. */
async function getTasksToday(token) {
    const result = await callApi('tasks/today', 'GET', token, null);
    return result;
}

/* GET upcoming tasks. */
async function getTasksUpcoming(token) {
    const result = await callApi('tasks/upcoming', 'GET', token, null);
    return result;
}

/* GET task by id. */
async function getTaskById(token, taskId) {
    const result = await callApi(`tasks/${taskId}`, 'GET', token, null);
    return result;
}

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksToday,
    getTasksUpcoming,
    getTaskById,
};

export default taskService;
