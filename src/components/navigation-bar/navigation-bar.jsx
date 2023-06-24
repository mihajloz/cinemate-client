import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/" className="mx-2">
        CineMate
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid">
          {!user && (
            <>
              <Nav.Link
                as={Link}
                to={`/login`}
                className="ms-lg-auto me-4 ms-2"
              >
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={`/signup`} className="ms-2 ms-md-2">
                Sign Up
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link mx-md-2 mx-2">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/profile`} className="mx-md-2 mx-2">
                Profile
              </Nav.Link>
              <Nav.Link
                onClick={onLoggedOut}
                className="ms-lg-auto mx-md-2 mx-2"
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
