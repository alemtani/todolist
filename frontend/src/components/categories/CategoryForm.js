import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Import Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

// Import services
import categoryService from '../../services/categoryService';

function CategoryForm() {
    // Use state to store form values
    const [name, setName] = useState('');

    // Use hooks for handling submit
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const flash = useFlash();
    const { categoryId } = useParams();
    
    const from = location.state?.from?.pathname || '/';

    // Fetch the category data only on mount (for editing category).
    useEffect(() => {
        /* Fetch for category by id */
        async function getCategoryById() {
            try {
                const category = await categoryService.getCategoryById(auth.token, categoryId);
                setName(category.title);
            } catch (err) {
                // Send them back to the page they visited before they visited the form.
                // Tell them that the category could not be found.
                flash.flashMessage('Sorry, category does not exist.', 'danger');
                navigate(from);
            }
        }

        if (categoryId) getCategoryById();
    }, [auth.token, categoryId, flash, from, navigate]);

    /* Update name. */
    function handleChangeName(event) {
        event.preventDefault();
        setName(event.currentTarget.value);
    }

    /* Make the API call and redirect back to from. */
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Create the payload.
            const categoryData = {
                title: name,
            }

            // If a categoryId is provided, this means to edit the category.
            if (categoryId) {
                await categoryService.updateCategory(auth.token, categoryId, categoryData);
                flash.flashMessage('Successfully edited category!', 'success');
            }

            // Otherwise, we must create the next category.
            else {
                await categoryService.createCategory(auth.token, categoryData);
                flash.flashMessage('Successfully added category!', 'success');
            }

            // Send them back to the page they visited before they visited the form.
            navigate(from);
        } catch (err) {
            flash.flashMessage(err.message, 'danger');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Name *</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter category name" 
                    value={name} 
                    onChange={handleChangeName}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CategoryForm;
