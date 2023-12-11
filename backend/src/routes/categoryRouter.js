const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/* GET categories. */
router.get('/', categoryController.getCategories);

/* POST category. */
router.post('/', categoryController.createCategory);

/* PUT task. */
router.put('/:id', categoryController.updateCategory);

/* DELETE task. */
router.delete('/:id', categoryController.deleteCategory);

/* GET category by id. */
router.get('/:id', categoryController.getCategoryById);

/* GET category tasks. */
router.get('/:id/tasks', categoryController.getCategoryTasks);

module.exports = router;
