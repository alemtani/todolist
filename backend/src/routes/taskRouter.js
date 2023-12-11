const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/* GET tasks. */
router.get('/', taskController.getTasks);

/* POST task. */
router.post('/', taskController.createTask);

/* PUT task. */
router.put('/:id', taskController.updateTask);

/* DELETE task. */
router.delete('/:id', taskController.deleteTask);

/* DEPRECATED: Need to filter tasks from frontend due to timezone offsets. */
router.get('/today', taskController.getTasksToday);

/* GET upcoming tasks. */
router.get('/upcoming', taskController.getTasksUpcoming);

/* GET task by id. */
router.get('/:id', taskController.getTaskById);

module.exports = router;
