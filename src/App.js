import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/Auth-service';
import Login from './components/auth/Login';
import './App.css';
import Navbar from './components/navbar/NavBar';
import CreateContact from './components/contact-form/CreateContact';
import InteractiveList from './components/Contacts';
import SMSForm from './components/chat/SMSForm'
import HomePage from './components/home/LandingPage';


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
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
       

          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>  
          <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route exact path='/contacts/create' render={() => <CreateContact getUser={this.getTheUser}/>}/>
              <Route exact path='/contacts' render={() => <InteractiveList Component={CreateContact} getUser={this.getTheUser}/>}/>
              <Route exact path='/sms/out' render={() => <SMSForm Component={SMSForm} getUser={this.getTheUser}/>}/>
          </Switch> 
        
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
          <HomePage/>       
          <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
          </Switch>  
      </div>
      );
    }
  }
}

export default App;
