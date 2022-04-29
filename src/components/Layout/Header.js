import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const signOutHandler = () => {};

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Patient Portal</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/pets'>
              <Nav.Link>Pets</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/sign-in'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={signOutHandler}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
