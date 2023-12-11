// Import config info
const { db } = require('../config/dbConfig');

// Import utils
const { createError } = require('../utils');

let result;

/**
 * Retrieve all the user categories, sorted by created_at timestamp in increasing order.
 * @param {*} userId - The authenticated user to fetch categories for.
 * @returns categories - The list of all the categories from the user.
 */
async function getCategories(userId) {
    // Fetch all user categories
    result = await db.query(
        'SELECT * FROM categories \
        WHERE user_id = $1 \
        ORDER BY title ASC',
        [userId]
    );

    const categories = result.rows;
    return categories;
}

/**
 * Create the category for the corresponding user.
 * @param {*} userId - The authenticated user to create the new category for.
 * @param {*} categoryData - The passed-in category data to create.
 * @returns 
 */
async function createCategory(userId, categoryData) {
    // Create new category in database
    await db.query(
        'INSERT INTO categories (user_id, title) VALUES ($1, $2)',
        [userId, categoryData.title]
    );

    return {};
}

/**
 * Update the category for the corresponding user.
 * Throw error if the category does not belong to the user.
 * @param {*} userId - The authenticated user to update the category for.
 * @param {*} categoryId - The category to update.
 * @param {*} categoryData - The new category data.
 * @returns 
 */
async function updateCategory(userId, categoryId, categoryData) {
    // Update category in database
    result = await db.query(
        'UPDATE categories \
        SET title = $1 \
        WHERE id = $2 AND user_id = $3 \
        RETURNING *',
        [categoryData.title, categoryId, userId]
    );

    // If category not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Failed to update requested category.');
    }

    return {};
}

/**
 * Delete the category for the corresponding user.
 * Need to nullify category for all tasks that map to category first.
 * @param {*} userId - The authenticated user to delete the category for.
 * @param {*} categoryId - The category to delete.
 * @returns 
 */
async function deleteCategory(userId, categoryId) {
    // Delete category in database
    result = await db.query(
        'DELETE FROM categories \
        WHERE id = $1 AND user_id = $2 \
        RETURNING *',
        [categoryId, userId]
    );

    // If category not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Failed to delete requested category.');
    }

    return {};
}

/**
 * Get the specific category from the user.
 * @param {*} userId 
 * @param {*} categoryId 
 * @returns category - The specific category from the user.
 */
async function getCategoryById(userId, categoryId) {
    // Fetch category in database
    result = await db.query(
        'SELECT * FROM categories \
        WHERE id = $1 AND user_id = $2',
        [categoryId, userId]
    );

    // If category not found or does not belong to user, return error
    if (result.rows.length === 0) {
        throw createError(404, 'Category does not exist.');
    }

    const category = result.rows[0];
    return category;
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
};
