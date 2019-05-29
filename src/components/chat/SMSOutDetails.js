import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class SMSOutDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    const { values, cellNumber, handleChange, handlePhoneChange} = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TextField 
            hintText='To Cell Number'
            floatingLabelText='954-555-4444'
            onChange={handlePhoneChange('to')}
            defaultValue={cellNumber}
            maxLength="10"
          />
          <br/>
          <TextField 
            hintText='Enter Message'
            floatingLabelText='Message'
            onChange={handleChange('body')}
            defaultValue={values.body}
          />          
          <br/>
          <RaisedButton 
            label="Continue"
            secondary={true}
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

export default SMSOutDetails;