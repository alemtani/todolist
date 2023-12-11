import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

function RegisterForm() {
    // Use state to store form values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    // Use hooks for handling submit
    const navigate = useNavigate();
    const auth = useAuth();
    const flash = useFlash();

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

    /* Update reentered password. */
    function handleChangePassword2(event) {
        event.preventDefault();
        setPassword2(event.currentTarget.value);
    }

    /* Make the API call and redirect back to login. */
    async function handleSubmit(event) {
        event.preventDefault();

        // Don't allow form submission if passwords don't match
        if (password !== password2) {
            flash.flashMessage('Passwords do not match.', 'danger');
            event.stopPropagation();
            return;
        }

        try {
            // Make the API call to register user.
            const userData = {
                email,
                password,
            }

            await auth.register(userData);

            // Flash message if successful.
            flash.flashMessage('Successfully registered!', 'success');

            // Send them to the login page.
            navigate('/login');
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
            <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Reenter Password</Form.Label>
                <Form.Control 
                    required
                    type="password" 
                    placeholder="Reenter Password" 
                    value={password2} 
                    onChange={handleChangePassword2}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default RegisterForm;
