//import some css here
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import {FaHome, FaFolderOpen, FaGitAlt, FaCog, FaFlask} from 'react-icons/fa';
import { auth, logInWithEmailAndPassword, signInWithGoogle , logout} from "../utils/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function NavBar() {
    const url = window.location.href;
    const tocheck = ["home","register","reset"];
    const url_array = url.split('/');
    const last_part_url = url_array[url_array.length -1];
    const navigate = useNavigate();
    tocheck.push(last_part_url);
    for (var i=0; i < tocheck.length; i++) {
        console.log(tocheck[i]);
    } 
    /* get the current user, if the current user is not populated then redirect to the login page */
    const [user, loading, error] = useAuthState(auth);
    console.log(user);
    if (user == null && last_part_url == "register"){
        if(last_part_url == "register") console.log("register");
        if(last_part_url != "" && last_part_url != "register") navigate("/");
    } 
    if (user != null) {
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
                    <Button  onClick={logout}>Logout</Button>
                </Container>
            </Navbar>
        )
    }
    else {
        return (<div></div>)
    }
}

export default NavBar