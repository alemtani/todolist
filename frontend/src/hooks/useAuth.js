import { useContext } from 'react';
import AuthContext from '../contexts/auth/AuthContext';

/* Hook allows components to use the AuthContext */
function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;
