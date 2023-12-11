import { Link } from 'react-router-dom';

// Import components
import Content from '../../components/layout/Content';

function NotFoundPage() {
    return (
        <Content title="Sorry, Page Not Found">
            <div className="text-center">
                <Link className="btn btn-primary rounded w-25" to="/">
                    Go Back
                </Link>
            </div>
        </Content>
    )
}

export default NotFoundPage;
