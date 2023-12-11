// Import components
import Content from '../../components/layout/Content';
import TaskList from '../../components/tasks/TaskList';

function HomePage() {
    return (
        <Content title="Inbox">
            <TaskList />
        </Content>
    );
}

export default HomePage;
