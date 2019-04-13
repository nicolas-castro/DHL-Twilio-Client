import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null, isActive: false };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      //ends the user session on the app
      this.setState({ loggedInUser: null });
      //ends the user session on the backend
      this.props.getUser(null);  
    })
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }


  render(){
    if(this.state.loggedInUser){
      return(

        <nav className="navbar is-primary " role="navigation" aria-label="main navigation">
         
         <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width={112} height={28} />
            </a>
            <button className="button is-primary navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
         </div>


            <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-start">
                <Link className="navbar-item" to='/' >Home</Link>
                <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to='/' >More</Link>
                  <div className="navbar-dropdown">
                  <Link className="navbar-item" to='/' >About</Link>
                  <Link className="navbar-item" to='/' >Jobs</Link>           
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                  <Link className="button is-primary" to='/signup' ><strong>Sign up</strong></Link>
                  <Link className="button is-light" to='/login' > Log in</Link> 
                  <Link to='/' className="button is-light" onClick={() => this.logoutUser()}>Logout</Link>          
                  </div>
                </div>
              </div>
            </div>
        </nav>
      )
  } else {
    return ( 
      <nav className="navbar is-primary " role="navigation" aria-label="main navigation">
         <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width={112} height={28} />
            </a>
            <button className="button is-primary navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
         </div>

         <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-start">
                <Link className="navbar-item" to='/' >Home</Link>
                <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to='/' >More</Link>
                  <div className="navbar-dropdown ">
                  <Link className="navbar-item" to='/' >About</Link>
                  <Link className="navbar-item" to='/' >Jobs</Link>           
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                  <Link className="button is-primary" to='/signup' ><strong>Sign up</strong></Link>
                  <Link className="button is-light" to='/login' > Log in</Link> 
                  </div>
                </div>
              </div>
            </div>
        </nav>
    )
  }
}
}
export default Navbar;