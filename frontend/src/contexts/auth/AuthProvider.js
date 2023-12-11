import { useState } from 'react';
import AuthContext from './AuthContext';
import authService from '../../services/authService';

/**
 * This Provider defines the value that children components access when using the context.
 * @param {*} children - nested JSX components 
 * @returns a Provider for the context
 */
function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    /* Register user. */
    async function register(userData) {
        await authService.register(userData);
    }

    /* Login user. */
    async function login(userData) {
        // Need to update token for authentication purposes.
        const result = await authService.login(userData);
        localStorage.setItem('token', result.token);
        setToken(result.token);
    }

    /* Logout user. */
    async function logout() {
        // Simply nullify current token
        localStorage.removeItem('token');
        setToken(null);
    }

    const value = {
        token, 
        register, 
        login, 
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
