import { useLocation, Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

/* Control access to routes based on authentication token. */
function PrivateRoute({ children }) {
    const auth = useAuth();
    const location = useLocation();

    // If the user is not authenticated, redirect them to the /login page.
    // Save the current location they were trying to go to when they were redirected.
    // This allows us to send them to that page after they login rather than defaulting to the home page.
    return auth.token ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
