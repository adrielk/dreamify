import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NavbarComponent from "./components/NavbarComponent"
import Dashboard from "./components/DashboardComponent"
import './App.css'
//Great tutorial on react routing: https://reactrouter.com/web/guides/primary-components

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       current_page:"/home"
    }
  }
  
  render() {
    const{current_page} = this.state
    return (
      <Router>
        <div className = "App-header">
         <NavbarComponent/>
         <Redirect to = {current_page}/>
          <Switch>
          <Route path = "/home">
                <h2>Home Page</h2>
            </Route>
            <Route path = "/dashboard">
              <Dashboard/>
            </Route>
     
            <Route path = "/statistics">
                <h3>Dream Stats</h3>
            </Route>
          </Switch>
          
        </div>
      </Router>
       
      
    )
  }
}

export default App

