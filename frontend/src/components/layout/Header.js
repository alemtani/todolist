import {  Link,  useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

function Header() {
  // Use custom hooks
  const navigate = useNavigate();
  const auth = useAuth();
  const flash = useFlash();
  
  /* Logout user. */
  async function handleLogout(event) {
    event.preventDefault();
    await auth.logout();
    flash.flashMessage('Successfully logged out!', 'success');

    // Send them to the home page, which should redirect to the login page.
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Todolist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {auth.token ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inbox</Nav.Link>
              <Nav.Link as={Link} to="/today">Today</Nav.Link>
              <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
              <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
