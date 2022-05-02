import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { selectIsLoggedIn } from '../../app/action-creators/auth';
import { Fragment } from 'react';
import { logoutUser } from '../../app/action-creators/auth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const signOutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Pet Peers</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/pets'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {isLoggedIn && (
              <Fragment>
                <LinkContainer to='/my-pets'>
                  <Nav.Link>My Pets</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/add-pet'>
                  <Nav.Link>Add Pet</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={signOutHandler}>Logout</Nav.Link>
              </Fragment>
            )}
            {!isLoggedIn && (
              <Fragment>
                <LinkContainer to='/'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/registration'>
                  <Nav.Link className='ps-2'>User Registration</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
