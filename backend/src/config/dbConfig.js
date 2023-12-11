const pg = require('pg');

// Create PostgreSQL client and connect
const db = new pg.Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/* Connect database */
async function connect() {
    await db.connect();
    console.log(`Connected to postgres db at host ${process.env.DB_HOST}`);
}

/* Create the users table if it did not exist */
async function createUsers() {
    await db.query(
        'CREATE TABLE IF NOT EXISTS users ( \
            id SERIAL PRIMARY KEY, \
            email VARCHAR(255) NOT NULL UNIQUE, \
            password VARCHAR(255) NOT NULL, \
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP \
        )'
    );
    console.log('Created table users if it did not exist');
}

/* Create the categories table if it did not exist */
async function createCategories() {
    await db.query(
        'CREATE TABLE IF NOT EXISTS categories ( \
            id SERIAL PRIMARY KEY, \
            user_id INTEGER REFERENCES users(id) NOT NULL, \
            title VARCHAR(255) NOT NULL, \
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP \
        )'
    );
    console.log('Created table categories if it did not exist');
}

/* Create the tasks table if it did not exist */
async function createTasks() {
    await db.query(
        'CREATE TABLE IF NOT EXISTS tasks ( \
            id SERIAL PRIMARY KEY, \
            user_id INTEGER REFERENCES users(id) NOT NULL, \
            category_id INTEGER REFERENCES categories(id), \
            title VARCHAR(255) NOT NULL, \
            due_timestamp TIMESTAMP WITH TIME ZONE, \
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP \
        )'
    );
    console.log('Create table tasks if it did not exist');
}

/* Setup function */
async function setup() {
    await connect();
    await createUsers();
    await createCategories();
    await createTasks();
}

const dbConfig = {
    db,
    setup,
};

module.exports = dbConfig;