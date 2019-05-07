import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';




export class FormContactDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  
  render() {
    const { values, handleChange, handlePhoneChange } = this.props;
    // console.log(values)
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <br/>
          <TextField 
            hintText='Enter First Name'
            floatingLabelText='First Name'
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <br/>
          <TextField 
            hintText='Enter Last Name'
            floatingLabelText='Last Name'
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br/>
          <TextField 
            hintText='Cell Number'
            floatingLabelText='954-555-4444'
            onChange={handlePhoneChange('cellNumber')}
            defaultValue={values.cellNumber}
            maxLength="10"
          />
          <br/>
          <RaisedButton 
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles ={
  button: {
    margin: 15
  }
}

export default FormContactDetails

