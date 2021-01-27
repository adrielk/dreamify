import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NavbarComponent from "./components/NavbarComponent"
import Dashboard from "./components/DashboardComponent"
import StatView from "./components/StatComponent"
import LoginPage from "./components/LoginComponent"
import UserLogin from "./components/UserLoginComponent"
import './App.css'
//Great tutorial on react routing: https://reactrouter.com/web/guides/primary-components
//Plotly quickstart: https://plotly.com/javascript/react/
//Authentication tutorial: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#custom-attributes

//AWS login
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       current_page:"/dashboard"
    }
  }
  
  setCurrentPage =(page)=>{
    this.setState({current_page:page})
    console.log(page)
  }

  signIn = async (username, password)=> {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);//Must hanlde this when one fails to login...
    }
}

  render() {
    const{current_page} = this.state
    return (
      <Router>
        <div className = "App-header">
         <NavbarComponent current_page = {current_page} set_page = {this.setCurrentPage}/>
         {/* <Redirect to = {current_page}/> */}
          <Switch>
          <Route path = "/login">
                <LoginPage/>
            </Route>
            <Route path = "/dashboard">
              <Dashboard/>
            </Route>
     
            <Route path = "/statistics">
                <StatView/>
            </Route>

            <Route path = "/user_login">
                <UserLogin login_function = {this.signIn} set_page ={this.setCurrentPage}/>
            </Route>
          </Switch>
          
        </div>
      </Router>
       
      
    )
  }
}

export default withAuthenticator(App)//higher order component!

