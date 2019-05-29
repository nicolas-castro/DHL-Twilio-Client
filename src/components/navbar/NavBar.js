import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/Auth-service'

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

        <nav className="navbar is-black"  role="navigation" aria-label="main navigation">
         
         <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="../images/DHL-logo.jpg" alt="DHL-logo" width={110} height={38} />
            </a>
            <button className="button is-black navbar-burger navbar-end" onClick={this.toggleNav}>
            <span className="navbar-end"></span>
            <span></span>
            <span></span>
          </button>
         </div>


            <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-start">
                <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to='/' >More</Link>
                  <div className="navbar-dropdown">
                  <Link className="navbar-item" to='/contacts' >My Contacts</Link>
                  <Link className="navbar-item" to='/contacts/create' >Add Contact</Link>           
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                  <Link to='/' className="button is-danger" onClick={() => this.logoutUser()}>Logout</Link>          
                  </div>
                </div>
              </div>
            </div>
        </nav>
      )
  } else {
    return ( 
      <nav className="navbar is-black " role="navigation" aria-label="main navigation">
         <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="/images/DHL-logo.jpg" alt="logo" width={110} height={38} />
            </a>
            <button className="button is-black navbar-burger" onClick={this.toggleNav}>
            <span ></span>
            <span></span>
            <span></span>
          </button>
         </div>

         <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-start">
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                  <Link className="button is-warning" to='/signup' ><strong>Sign up</strong></Link>
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

