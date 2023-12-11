import { useState } from 'react';
import {
    useNavigate,
    useLocation,
} from 'react-router-dom';

// Import Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

function LoginForm() {
    // Use state to store form values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Use hooks for handling submit
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const flash = useFlash();

    const from = location.state?.from?.pathname || '/';

    /* Update email. */
    function handleChangeEmail(event) {
        event.preventDefault();
        setEmail(event.currentTarget.value);
    }

    /* Update password. */
    function handleChangePassword(event) {
        event.preventDefault();
        setPassword(event.currentTarget.value);
    }

    /* Make the API call and redirect back to from. */
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Make the API call to login.
            const userData = {
                email,
                password,
            }

            await auth.login(userData);

            // Flash message if successful.
            flash.flashMessage('Successfully logged in!', 'success');

            // Send them back to the page they tried to visit when they were 
            // redirected to the login page. Use { replace: true } so we don't create  
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they 
            // won't end up back on the login page, which is also really nice for the 
            // user experience.
            navigate(from, { replace: true });
        } catch (err) {
            flash.flashMessage(err.message, 'danger');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    required
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={handleChangeEmail}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    required
                    type="password" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={handleChangePassword}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
