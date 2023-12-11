import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

// Import Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

// Import services
import taskService from '../../services/taskService';
import categoryService from '../../services/categoryService';

// Import utils
import { formatTimestamp } from '../../utils';

function TaskForm() {
    // Use state to store form values
    const [name, setName] = useState('');
    const [dueTimestamp, setDueTimestamp] = useState('');
    const [categoryId, setCategoryId] = useState('#');
    const [categories, setCategories] = useState([]);

    // Use hooks for handling submit
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const flash = useFlash();
    const { taskId } = useParams();
    
    const from = location.state?.from?.pathname || '/';

    // Fetch the task data and categories list only on mount (for editing task).
    useEffect(() => {
        /* Fetch for categories list */
        async function getCategories() {
            const newCategories = await categoryService.getCategories(auth.token);
            setCategories([...newCategories]);
        }

        /* Fetch for task by id */
        async function getTaskById() {
            try {
                const task = await taskService.getTaskById(auth.token, taskId);
                setName(task.title);
                setDueTimestamp(task.due_timestamp ? formatTimestamp(task.due_timestamp) : '');
                setCategoryId(task.category_id ? task.category_id : '#');
            } catch (err) {
                // Send them back to the page they visited before they visited the form.
                // Tell them that the task could not be found.
                flash.flashMessage('Sorry, task does not exist.', 'danger');
                navigate(from);
            }
        }

        getCategories();
        if (taskId) getTaskById();
    }, [auth.token, taskId, flash, from, navigate]);

    /* Update name. */
    function handleChangeName(event) {
        event.preventDefault();
        setName(event.currentTarget.value);
    }

    /* Update timestamp. */
    function handleChangeDueTimestamp(event) {
        event.preventDefault();
        setDueTimestamp(event.currentTarget.value);
    }

    /* Update category. */
    function handleChangeCategoryId(event) {
        event.preventDefault();
        setCategoryId(event.currentTarget.value);
    }

    /* Make the API call and redirect back to from. */
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Create the payload.
            const taskData = {
                title: name,
                due_timestamp: moment(dueTimestamp).utc() || null,
                category_id: categoryId !== '#' ? categoryId : null,
            };

            // If a taskId is provided, this means to edit the task.
            if (taskId) {
                await taskService.updateTask(auth.token, taskId, taskData);
                flash.flashMessage('Successfully edited task!', 'success');
            }

            // Otherwise, we must create the next task.
            else {
                await taskService.createTask(auth.token, taskData);
                flash.flashMessage('Successfully added task!', 'success');
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
                    placeholder="Enter task name" 
                    value={name} 
                    onChange={handleChangeName}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="due-timestamp">
                <Form.Label>Due</Form.Label>
                <Form.Control 
                    type="datetime-local" 
                    placeholder="Enter task due timestamp" 
                    value={dueTimestamp} 
                    onChange={handleChangeDueTimestamp}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                    aria-label="Select category"
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                >
                    <option value="#">Default</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default TaskForm;
