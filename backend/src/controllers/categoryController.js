// Import services (need both due to relationship)
const categoryService = require('../services/categoryService');
const taskService = require('../services/taskService');

/* GET categories. */
async function getCategories(req, res, next) {
    try {
        const result = await categoryService.getCategories(req.userId);
        res.json(result);
    } catch (err) {
        console.error(`Error while getting categories:`, err.message);
        next(err);
    }
}

/* POST category. */
async function createCategory(req, res, next) {
    try {
        const result = await categoryService.createCategory(req.userId, req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while creating category:`, err.message);
        next(err);
    }
}

/* PUT category. */
async function updateCategory(req, res, next) {
    try {
        const result = await categoryService.updateCategory(req.userId, req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while updating category with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* DELETE category. */
async function deleteCategory(req, res, next) {
    try {
        let result = await taskService.deleteCategoryFromTasks(req.userId, req.params.id);
        result = await categoryService.deleteCategory(req.userId, req.params.id);
        res.json(result);
    } catch (err) {
        console.error(`Error while deleting category with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* GET category by id. */
async function getCategoryById(req, res, next) {
    try {
        const result = await categoryService.getCategoryById(req.userId, parseInt(req.params.id));
        res.json(result);
    } catch (err) {
        console.error(`Error while getting category with id ${req.params.id}:`, err.message);
        next(err);
    }
}

/* GET category tasks. */
async function getCategoryTasks(req, res, next) {
    try {
        let result = await categoryService.getCategoryById(req.userId, req.params.id);
        result = await taskService.getCategoryTasks(req.userId, parseInt(req.params.id));
        res.json(result);
    } catch (err) {
        console.error(`Error while getting category tasks with id ${req.params.id}:`, err.message);
        next(err);
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoryTasks,
};
