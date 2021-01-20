import React from 'react'
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';//don't forget to import this for bootstrap

//as prop is intriguing... render props?
function NavbarComponent() {
    return (
        <div>
            <Navbar bg = "light">
                <Link to = "/home">
                    <Navbar.Brand>Dreamify</Navbar.Brand>
                </Link>
                <Nav className = "mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Dream Dashboard</Nav.Link>
                    <Nav.Link as={Link} to ="/statistics">Dream Statistics</Nav.Link>
                </Nav>
            </Navbar>

            {/* <Link to= "/home"> <button type = "button"> Go home</button> </Link>
          <Link to= "/dashboard"> homework </Link>
          <Link to= "/statistics"> fallback </Link> */}
        </div>
    )
}

export default NavbarComponent
