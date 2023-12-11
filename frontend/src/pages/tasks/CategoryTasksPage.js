// Import components
import Content from '../../components/layout/Content';
import TaskList from '../../components/tasks/TaskList';

function CategoryTasksPage() {
    return (
        <Content title="Category Inbox">
            <TaskList />
        </Content>
    );
}

export default CategoryTasksPage;