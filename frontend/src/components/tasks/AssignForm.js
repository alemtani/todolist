import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Import Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

// Import services
import taskService from '../../services/taskService';
import categoryService from '../../services/categoryService';

function AssignForm() {
    // Use state to store form values
    const [taskId, setTaskId] = useState('#');
    const [categoryId, setCategoryId] = useState('#');

    // Use state to store the list of tasks and caategories
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    // Use hooks for handling submit
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const flash = useFlash();
    
    const from = location.state?.from?.pathname || '/';

    // Fetch the task data and categories list only on mount (for editing task).
    useEffect(() => {
        /* Fetch for tasks list */
        async function getTasks() {
            const newTasks = await taskService.getTasks(auth.token);
            setTasks([...newTasks]);
        }

        /* Fetch for categories list */
        async function getCategories() {
            const newCategories = await categoryService.getCategories(auth.token);
            setCategories([...newCategories]);
        }

        getTasks();
        getCategories();
    }, [auth.token]);

    /* Update task. */
    function handleChangeTaskId(event) {
        event.preventDefault();
        setTaskId(event.currentTarget.value);
    }

    /* Update category. */
    function handleChangeCategoryId(event) {
        event.preventDefault();
        setCategoryId(event.currentTarget.value);
    }

    /* Make the API call and redirect back to from. */
    async function handleSubmit(event) {
        event.preventDefault();

        // Don't allow form propagation if taskId is invalid
        if (taskId === '#') {
            flash.flashMessage('Must select a valid task.', 'danger');
            event.stopPropagation();
            return;
        }

        try {
            // Find the task, and update the payload
            const taskData = tasks.find(task => task.id === parseInt(taskId));
            taskData.category_id = categoryId !== '#' ? categoryId : null;

            // Edit the task.
            await taskService.updateTask(auth.token, taskId, taskData);
            flash.flashMessage('Successfully edited task!', 'success');

            // Send them back to the page they visited before they visited the form.
            navigate(from);
        } catch (err) {
            flash.flashMessage(err.message, 'danger');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="task">
                <Form.Label>Task *</Form.Label>
                <Form.Select 
                    aria-label="Select task"
                    value={taskId}
                    onChange={handleChangeTaskId}
                    required
                >
                    <option value="#" disabled>Task</option>
                    {tasks.map(task => (
                        <option key={task.id} value={task.id}>{task.title}</option>
                    ))}
                </Form.Select>
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

export default AssignForm;
