// Import components
import Content from '../../components/layout/Content';
import TaskForm from '../../components/tasks/TaskForm';

function AddPage() {
    return (
        <Content title="Add Task">
            <TaskForm />
        </Content>
    );
}

export default AddPage;