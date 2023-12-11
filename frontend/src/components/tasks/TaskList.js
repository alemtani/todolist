import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';

// Import individual components
import Task from './Task';

// Import Bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

// Import services
import taskService from '../../services/taskService';
import categoryService from '../../services/categoryService';

function TaskList() {
    // Use state to store tasks
    const [tasks, setTasks] = useState([]);

    // Use hooks for authentication token
    const auth = useAuth();
    const flash = useFlash();
    const location = useLocation();
    const { categoryId } = useParams();

    // Fetch tasks, using useCallback to memoize function copy of getTasks
    // rather than creating a new copy every time
    const getTasks = useCallback(async () => {
        let newTasks;

        // Render requested set of tasks
        switch (location.pathname) {
            case '/':
                newTasks = await taskService.getTasks(auth.token);
                break;
            case '/today':
                newTasks = await taskService.getTasksToday(auth.token);
                break;
            case '/upcoming':
                newTasks = await taskService.getTasksUpcoming(auth.token);
                break;
            case `/categories/${categoryId}/tasks`:
                newTasks = await categoryService.getCategoryTasks(auth.token, categoryId);
                break;
            default:
                break;
        }

        setTasks([...newTasks]);
    }, [auth.token, location.pathname, categoryId]);

    // "Lift state up" by handling delete in parent component,
    // using useCallback to memoize function copy rather than creating new copy
    const handleDelete = useCallback(async (taskId) => {
        try {
            // Make the API call to delete.
            await taskService.deleteTask(auth.token, taskId);
            flash.flashMessage('Successfully deleted task!', 'success');

            // Need to refresh set of tasks
            getTasks();
        } catch (err) {
            flash.flashMessage(err.message, 'danger');
        }
    }, [auth.token, flash, getTasks]);

    // On mount, need to fetch tasks
    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <Stack gap={4} className="align-items-center justify-content-center">
            <ListGroup className="w-100">
                {tasks.map(task => (
                    <Task task={task} key={task.id} onDelete={handleDelete} />
                ))}
            </ListGroup>
            <Stack direction="horizontal" gap={3}>
                <Link className="btn btn-primary rounded w-25 ms-auto" to="/add" state={{ from: location }}>
                    Add Task
                </Link>
                <Link className="btn btn-warning rounded w-25 me-auto" to="/assign" state={{ from: location }}>
                    Assign Task
                </Link>
            </Stack>
        </Stack>
    );
}

export default TaskList;
