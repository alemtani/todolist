import { callApi } from '../utils';

/* GET categories. */
async function getCategories(token) {
    const result = await callApi('categories', 'GET', token, null);
    return result;
}

/* POST category. */
async function createCategory(token, categoryData) {
    const result = await callApi('categories', 'POST', token, categoryData);
    return result;
}

/* PUT category. */
async function updateCategory(token, categoryId, categoryData) {
    const result = await callApi(`categories/${categoryId}`, 'PUT', token, categoryData);
    return result;
}

/* DELETE category. */
async function deleteCategory(token, categoryId) {
    const result = await callApi(`categories/${categoryId}`, 'DELETE', token, null);
    return result;
}

/* GET category by id. */
async function getCategoryById(token, categoryId) {
    const result = await callApi(`categories/${categoryId}`, 'GET', token, null);
    return result;
}

/* GET category tasks. */
async function getCategoryTasks(token, categoryId) {
    const result = await callApi(`categories/${categoryId}/tasks`, 'GET', token, null);
    return result;
}

const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoryTasks,
};

export default categoryService;
