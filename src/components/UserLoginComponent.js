import React from 'react'
import ReactDOM from 'react-dom'
import {Form, Button} from "react-bootstrap"
import { Link } from 'react-router-dom';


function UserLoginComponent({login_function, set_page}) {

    var Username;
    var Password;

    const loginStyle = {
        width: "30%",
        margin:"auto",
        marginTop:"10%",
        color:"black",
        backgroundColor:"rgb(251, 250, 245)",
        padding:"15px",
        borderRadius:"10px",
        font: "Helvetica",
        fontWeight: "bold"
    }

    //sets state of website to current page. This is useful for conditional renders
  

    function onSubmit(){
        //console.log(Username+","+Password)
        const usernameNode = ReactDOM.findDOMNode(Username)//use of references here is not elegant. Probably better to manage with state (or hooks!)
        const passNode = ReactDOM.findDOMNode(Password)
        const username = usernameNode.value
        const password = passNode.value
        login_function(username, password)
        set_page("/dashboard")//this is not centralized, which makes it messy. Note this bad coding practice
    }//a way to redirect by function call??

    return (
        <div style = {loginStyle}>
            <h2 style = {{textAlign:"center", fontWeight:"bold"}}>Login</h2>
            <Form>
                <Form.Group controlId="formGroupUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control ref = {(username) => Username = username} type = "text" type="username" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref = {(password) => Password = password} type = "text"  type="password" placeholder="Password" />
                </Form.Group>
                <div style = {{textAlign:"center"}}>
                    <Button onClick = {onSubmit} as={Link} to="/dashboard"  size = "lg" variant = "success">Sign in</Button>
                </div>
            </Form>
        </div>
    )
}

export default UserLoginComponent
