import React, { Component } from 'react'
import service from '../api/service';
import SMSOutDetails from './SMSOutDetails';
import { Redirect } from 'react-router-dom';


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
                  values={values}
              />
      );
      case 2:
          return(
              <h1>SMS SENT</h1>
          )
      case 3:
      return <Redirect to='/contacts'/>
    }
  }
}

export default SMSForm;