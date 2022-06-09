import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { useToken } from '../../services/Auth';


function Header() {
  const { token, setToken } = useToken();
  let navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate("/login");
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My Social Network</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Accueil</Nav.Link>
              {token !== null
              ? <>
                  <Nav.Link as={Link} to="/friends">Amis</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Mon Profile</Nav.Link>
                  <Nav.Link onClick={logout}>Déconnexion</Nav.Link>
                </>
              : <>
                  <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
                  <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
