//import some css here
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {FaHome, FaFolderOpen, FaGitAlt, FaCog, FaFlask} from 'react-icons/fa';

function NavBar() {
    const url = window.location.href;
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home"><FaHome /> Impulsive Valorant Matchmaker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/matches">matches</Nav.Link>
                    <Nav.Link href="/tournament">tournament</Nav.Link>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users">all users</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar