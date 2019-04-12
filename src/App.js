import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/signup';
import AuthService from './components/auth/auth-service';

import './App.css';




class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {                  
    this.setState({
      loggedInUser: userObj
    })
  }


  render() {
    return (
      <div className="App">
      <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
      </Switch>
      
      </div>
    );
  }
}

export default App;
