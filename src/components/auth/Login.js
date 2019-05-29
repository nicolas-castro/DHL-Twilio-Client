import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Redirect } from 'react-router-dom';



class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', loggedInUser: null, message: null };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "", loggedInUser: true });
        this.props.getUser(response);       
    })
    .catch(err => {
      if (err.response && err.response.data) {
        // console.error("API response", err.response.data)
        return  this.setState({ message: err.response.data.message }) 
      }
    });
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    if(this.state.loggedInUser){
      return <Redirect to='/contacts/create'/>
    }
    return(
      <div className="columns is-mobile is-centered" style={{ marginTop: '20px' }}>
        <form onSubmit={this.handleFormSubmit}>     
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input name="username" className="input" type="text" 
                     value={this.state.username} onChange={ e => this.handleChange(e)} 
                     placeholder="username" />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" 
                     name="password" 
                     value={this.state.password} onChange={ e => this.handleChange(e)}
                     placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="control is-centered columns is-mobile " style={{ marginTop: '20px' }}> 
            <button className="button" 
                    style={{ backgroundColor: '#FFCC01', color: 'white'}} 
                    type="submit" 
                    value="Login" >
                    LOGIN
            </button>
          </div>       
        </form>

        { this.state.message && <div> { this.state.message } </div> }
      </div>
    )
  }
}

export default Login;