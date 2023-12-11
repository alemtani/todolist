import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

// Import individual hooks
import useFlash from '../../hooks/useFlash';

/* Flash component to render on messages. */
function Flash() {
    const flash = useFlash();

    return (
        <>
            {flash.message && (
                <Container className="mt-3">
                    <Alert key={flash.message.variant} variant={flash.message.variant} className="mb-0">
                        {flash.message.text}
                    </Alert>
                </Container>
            )}
        </>
    );
}

export default Flash;
