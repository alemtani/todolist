import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import Bootstrap components
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// Import utils
import { convertUtcToLocal } from '../../utils';

const Task = memo(function Task({ task, onDelete }) {
    // Use hooks to keep track of location for onEdit
    const location = useLocation();

    // Use memo to prevent Task from constantly rerendering when passing in onDelete,
    // using the cached version of onDelete rather than a new copy every render
    async function handleDelete(event) {
        event.preventDefault();
        await onDelete(task.id);
    }

    // Check for overdue tasks to style differently (color red)
    const diffTime = new Date(task.due_timestamp) - new Date();

    return (
        <ListGroup.Item>
            <Stack direction="horizontal" gap={3} className="align-items-center">
                <Form.Check>
                    <Form.Check.Input className="task-checkbox" onClick={handleDelete} />
                    <Form.Check.Label className="pl-3">
                        <Stack>
                            <h3>{task.title}</h3>
                            {task.due_timestamp && (<p className={diffTime < 0 ? "text-danger" : ""}>{convertUtcToLocal(task.due_timestamp)}</p>)}
                            {task.category_id && (<p className="text-secondary">{task.category}</p>)}
                        </Stack>
                    </Form.Check.Label>
                </Form.Check>
                <Link as="button" className="ms-auto" to={`/edit/${task.id}`} state={{ from: location }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </Link>
            </Stack>
        </ListGroup.Item>
    );
});

export default Task;
