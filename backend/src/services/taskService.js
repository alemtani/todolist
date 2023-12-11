// Import config info
const { db } = require('../config/dbConfig');

// Import utils
const { createError } = require('../utils');

let result;

/**
 * Retrieve all the user tasks, sorted by deadline in increasing order.
 * @param {*} userId - The authenticated user to fetch tasks for.
 * @returns tasks - The list of all the tasks from the user.
 */
async function getTasks(userId) {
    // Fetch all user tasks
    result = await db.query(
        'SELECT tasks.*, categories.title AS category FROM tasks \
        LEFT JOIN categories \
        ON tasks.category_id = categories.id \
        WHERE tasks.user_id = $1 \
        ORDER BY tasks.due_timestamp ASC, tasks.created_at ASC',
        [userId]
    );

    const tasks = result.rows;
    return tasks;
}

/**
 * Create the task for the corresponding user.
 * @param {*} userId - The authenticated user to create the new task for.
 * @param {*} taskData - The passed-in task data to create.
 * @returns 
 */
async function createTask(userId, taskData) {
    // Create new task in database
    await db.query(
        'INSERT INTO tasks (user_id, title, due_timestamp, category_id) VALUES ($1, $2, $3, $4)',
        [userId, taskData.title, taskData.due_timestamp, taskData.category_id]
    );

    return {};
}

/**
 * Update the task for the corresponding user.
 * Throw error if the task does not belong to the user.
 * @param {*} userId - The authenticated user to update the task for.
 * @param {*} taskId - The task to update.
 * @param {*} taskData - The new task data.
 * @returns 
 */
async function updateTask(userId, taskId, taskData) {
    // Update task in database
    result = await db.query(
        'UPDATE tasks \
        SET title = $1, due_timestamp = $2, category_id = $3 \
        WHERE id = $4 AND user_id = $5 \
        RETURNING *',
        [taskData.title, taskData.due_timestamp, taskData.category_id, taskId, userId]
    );

    // If task not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Failed to update requested task.');
    }

    return {};
}

/**
 * Delete the task for the corresponding user.
 * @param {*} userId - The authenticated user to delete the task for.
 * @param {*} taskId - The task to delete.
 * @returns 
 */
async function deleteTask(userId, taskId) {
    // Delete task in database
    result = await db.query(
        'DELETE FROM tasks \
        WHERE id = $1 AND user_id = $2 \
        RETURNING *',
        [taskId, userId]
    );

    // If task not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Failed to delete requested task.');
    }

    return {};
}

/**
 * Retrieve all the user tasks due today, sorted by deadline in increasing order.
 * @param {*} userId - The authenticated user to fetch tasks for.
 * @returns tasks - The list of all the tasks from the user due today.
 */
async function getTasksToday(userId) {
    // Fetch all user tasks where timestamp has a date of the current date
    result = await db.query(
        'SELECT tasks.*, categories.title AS category FROM tasks \
        LEFT JOIN categories \
        ON tasks.category_id = categories.id \
        WHERE tasks.user_id = $1 AND tasks.due_timestamp::date <= CURRENT_DATE \
        ORDER BY tasks.due_timestamp ASC, tasks.created_at ASC',
        [userId]
    );

    const tasks = result.rows;
    return tasks;
}

/**
 * Retrieve all the user tasks that are upcoming, sorted by deadline in increasing order.
 * NOTE: An upcoming task will always have a non-null timestamp.
 * @param {*} userId - The authenticated user to fetch tasks for.
 * @returns tasks - The list of all the tasks from the user that are upcoming.
 */
async function getTasksUpcoming(userId) {
    // Fetch all user tasks where timestamp is not null
    result = await db.query(
        'SELECT tasks.*, categories.title AS category FROM tasks \
        LEFT JOIN categories \
        ON tasks.category_id = categories.id \
        WHERE tasks.user_id = $1 AND tasks.due_timestamp IS NOT NULL \
        ORDER BY tasks.due_timestamp ASC, tasks.created_at ASC',
        [userId]
    );

    const tasks = result.rows;
    return tasks;
}

/**
 * Get the specific task from the user.
 * @param {*} userId 
 * @param {*} taskId 
 * @returns task - The specific task from the user.
 */
async function getTaskById(userId, taskId) {
    // Fetch task in database
    result = await db.query(
        'SELECT tasks.*, categories.title AS category FROM tasks \
        LEFT JOIN categories \
        ON tasks.category_id = categories.id \
        WHERE tasks.id = $1 AND tasks.user_id = $2',
        [taskId, userId]
    );

    // If task not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Failed to get requested task.');
    }

    const task = result.rows[0];
    return task;
}

/**
 * Get the specific category tasks from the user.
 * @param {*} userId 
 * @param {*} categoryId 
 * @returns tasks - The specific category tasks from the user.
 */
async function getCategoryTasks(userId, categoryId) {
    // Fetch category tasks in database
    result = await db.query(
        'SELECT tasks.*, categories.title AS category FROM tasks \
        LEFT JOIN categories \
        ON tasks.category_id = categories.id \
        WHERE tasks.category_id = $1 AND tasks.user_id = $2 \
        ORDER BY tasks.due_timestamp ASC, tasks.created_at ASC',
        [categoryId, userId]
    );

    const tasks = result.rows;
    return tasks;
}

/**
 * Clears the specific category in all tasks from the user.
 * @param {*} userId 
 * @param {*} categoryId 
 * @returns
 */
async function deleteCategoryFromTasks(userId, categoryId) {
    // Nullify category for all user tasks that map to category
    await db.query(
        'UPDATE tasks \
        SET category_id = NULL \
        WHERE category_id = $1 AND user_id = $2',
        [categoryId, userId]
    );

    return {};
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksToday,
    getTasksUpcoming,
    getTaskById,
    getCategoryTasks,
    deleteCategoryFromTasks,
};
