import { callApi } from '../utils';

/* Register user. */
async function register(userData) {
    const result = await callApi('auth/register', 'POST', null, userData);
    return result;
}

/* Login user. */
async function login(userData) {
    const result = await callApi('auth/login', 'POST', null, userData);
    return result;
}

const authService = {
    register,
    login,
};

export default authService;
