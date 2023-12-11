// Import Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/* Define overall layout of content. */
function Content({ title, children }) {
    return (
        <Container className="my-3">
            <Row>
                <Col className="text-center">
                    <h1>{title}</h1>
                </Col>
            </Row>
            <Row className="py-3">
                <Col md={{ span: 8, offset: 2 }}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default Content;
