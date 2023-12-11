const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import config info
const { jwtSecret } = require('../config/authConfig');
const { db } = require('../config/dbConfig');

// Import utils
const { createError } = require('../utils');

// Cost factor for hashing
const saltRounds = 10;

let result;

/**
 * To register the user, we perform the following steps:
 * 1. Check if the user email already exists, and throw an error if it does.
 * 2. Hash the entered password.
 * 3. Enter the email and hashed password into the database.
 * @param {*} userData - Payload storing the entered email and password.
 * @returns 
 */
async function registerUser(userData) {
    // Check if user already exists.
    result = await db.query(
        'SELECT * FROM users \
        WHERE email = $1',
        [userData.email]
    );

    if (result.rows.length > 0) {
        throw createError(409, 'User already exists with the provided email.');
    }

    // Hash password.
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user.
    await db.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [userData.email, hashedPassword]
    );

    return {};
}

/**
 * To login the user, we perform the following steps:
 * 1. Find the user by email, or throw error if it doesn't exist.
 * 2. Compare the passed password and the stored password in the database (need to decrypt).
 * 3. Return the corresponding JWT token on success.
 * @param {*} userData - Payload storing the entered email and password.
 * @returns token - The JWT token on successful authentication.
 */
async function loginUser(userData) {
    // Find user by email.
    result = await db.query(
        'SELECT * FROM users \
        WHERE email = $1',
        [userData.email]
    );

    // Check if login is successful.
    // For login to be successful, two conditions must be met:
    // 1. The user must exist.
    // 2. The entered password must match the stored hash.
    let user = null;
    let isSuccessful = false;

    if (result.rows.length > 0) {
        user = result.rows[0];
        isSuccessful = await bcrypt.compare(userData.password, user.password);
    }

    if (!isSuccessful) {
        throw createError(401, 'Invalid email or password.');
    }

    // Create the JWT for the matched user.
    const token = jwt.sign({ id: user.id }, jwtSecret);
    
    return {token};
}

module.exports = {
    registerUser,
    loginUser,
};
