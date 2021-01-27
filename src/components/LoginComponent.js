import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

//login
import { Auth } from 'aws-amplify';
import {Redirect} from 'react-router-dom';

function LoginComponent() {


    
    const loginStyle = {
        width: "70%",
        margin: "auto",
        font: "Helvetica",
        padding: "50px",
        textAlign: "center",
    }

    return (
        <div  style = {loginStyle}>
            <Jumbotron>
                <h1 style = {{fontSize:"70px"}} ><b>Welcome to Dreamify!</b></h1>
                <p>
                    Login to get started!
                </p>
                <p>
                    <Button size = "lg" variant="secondary" as={Link} to="/user_login">Login</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default LoginComponent
