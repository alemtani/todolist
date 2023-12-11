// Import components
import Content from '../../components/layout/Content';
import TaskList from '../../components/tasks/TaskList';

function TodayPage() {
    return (
        <Content title="Today">
            <TaskList />
        </Content>
    );
}

export default TodayPage;