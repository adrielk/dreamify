import React from 'react'
import { Link } from 'react-router-dom';
import {Navbar, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';//don't forget to import this for bootstrap


//login
import { Auth } from 'aws-amplify';

//as prop is intriguing... render props?
function NavbarComponent({current_page, set_page}) {

    const textStyle = {
        color:"white",
        font: "Helvetica",
        fontWeight: "bold"
    }


        //sets state of website to current page. This is useful for conditional renders
    function setPage(page){
        set_page(page)
        
    }
    
    async function signOut() {
        console.log("LOGOUT!")
        try {
            await Auth.signOut();
            setPage("/login")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div>
            <Navbar bg = "dark" >
                {/* <Link to = "/home"> */}
                    <Navbar.Brand style = {textStyle}>Dreamify</Navbar.Brand>
                {/* </Link> */}
                <Nav className = "mr-auto" >
                    <Nav.Link  style = {textStyle} as={Link} to="/dashboard" onClick = {()=>setPage("/dashboard")}>Dream Dashboard</Nav.Link>
                    <Nav.Link style = {textStyle} as={Link} to ="/statistics" onClick = {()=>setPage("/statistics")}>Dream Statistics</Nav.Link>
                </Nav>

                {current_page !=="/login" &&
                    <Navbar.Collapse className="justify-content-end" style = {{paddingRight:"50px"}}> 
                        <DropdownButton id= "dropdown-basic-button" title = "Account" variant = "success">
                            <Dropdown.Item onClick = {signOut} as={Link} to = "/login" >Logout</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                }

            </Navbar>

            {/* <Link to= "/home"> <button type = "button"> Go home</button> </Link>
          <Link to= "/dashboard"> homework </Link>
          <Link to= "/statistics"> fallback </Link> */}
        </div>
    )
}

export default NavbarComponent
