//import some css here
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import {FaHome, FaFolderOpen, FaGitAlt, FaCog, FaFlask} from 'react-icons/fa';
import { auth, logInWithEmailAndPassword, signInWithGoogle , logout, getValUserCredentials} from "../utils/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function NavBar() {
    const url = window.location.href;
    const tocheck = ["home","register","reset"];
    const url_array = url.split('/');
    const last_part_url = url_array[url_array.length -1];
    const navigate = useNavigate();
    const [usercred,setUserCred] = useState("user");
    tocheck.push(last_part_url);
    for (var i=0; i < tocheck.length; i++) {
        //console.log(tocheck[i]);
    } 
    
    const pureLogout = async () => {
        logout();
        navigate('/');
    };

    /* get the current user, if the current user is not populated then redirect to the login page */
    const [user, loading, error] = useAuthState(auth);
    //querry the database to get the users credentials
    getValUserCredentials(user?.uid).then((rs) => {
        console.log(rs);
        setUserCred(rs)
    })

    function Queuelink(props) {
        const rs = props.usercred;
        if(rs == "moderator"){
            return (
                <Nav.Link href="/moderator_queue">queue</Nav.Link>
            )
        }if(rs == "error"){
            return (
                <Nav.Link href="/register_user">register valo account</Nav.Link>
            )
        }else{
            return (
                <Nav.Link href="/queue">queue</Nav.Link>
            )
        }
    }

    function ModeratorDropdown(props){
        const rs = props.usercred;
        if(rs == "moderator"){
            return (
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users">all users</NavDropdown.Item>
                    <NavDropdown.Item href="/tasks">TODO's</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            )
        }else{
            return (
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#future_account_setttings">manage account</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Something else</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }
    

    
    if (user == null && last_part_url == "register"){
        if(last_part_url == "register") console.log("register");
        if(last_part_url != "" && last_part_url != "register") navigate("/");
    } 
    if (user != null) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Impulsive Valorant Matchmaker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/matches">matches</Nav.Link>
                        <Nav.Link href="/tournament">tournament</Nav.Link>
                        <Queuelink usercred={usercred}/>
                        <ModeratorDropdown usercred={usercred}/>
                    </Nav>
                    </Navbar.Collapse>
                    <Button  onClick={pureLogout}>Logout</Button>
                </Container>
            </Navbar>
        )
    }
    else {
        return (<div></div>)
    }
}

export default NavBar