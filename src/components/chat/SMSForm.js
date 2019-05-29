import React, { Component } from 'react'
import service from '../api/service';
import SMSOutDetails from './SMSOutDetails';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        to: '',
        body: '',
        step: 1,
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
        step: step + 1,
    });
  }


  handleChange = input => e => {  
    this.setState({[input]: e.target.value});
}

  handlePhoneChange = input => e => {
    this.setState({[input]: "+1" + e.target.value});
  }

  handleSubmit = e => {
    
    const { step } = this.state;

    service.sendSMS(this.state)
      
    .then(res => {
      console.log('new SMS: ', res);
      this.setState({to: '', body: '',step: step + 1})
    })
    .catch(err => {
      console.log('error while sendign SMS', err)
    })
      
  }



  render() {
    const { to, body, step} = this.state;
    const { defaultValue } = this.props;
    const values = { to, body }
    // eslint-disable-next-line default-case
    switch(step){
      case 1: 
          return(
              <SMSOutDetails 
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handlePhoneChange={this.handlePhoneChange}
                  defaultValue={defaultValue}
                  values={values}
              />
      );
      case 2:
          return(
            <MuiThemeProvider>
              <React.Fragment>
                <h1>Message Sent</h1>
                <RaisedButton 
                  label="Continue"
                  secondary={true}
                  style={styles.button}
                  onClick={this.nextStep}
                />
              </React.Fragment>
            </MuiThemeProvider>

          )
      case 3:
      return <Redirect to='/contacts'/>
    }
  }
}

const styles ={
  button: {
    margin: 15
  }
}

export default SMSForm;