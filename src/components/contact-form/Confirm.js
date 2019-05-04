import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export class Confirm extends Component {

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  save = e => {
    e.preventDefault();
    this.props.handleSubmit();
  }

  
  render() {
    const { values, handleFileUpload } = this.props;
    
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Grid 
          container
          direction="column"
          justify="center"
          alignItems="center"
          >
            <Typography variant="h6" color="textPrimary">
              Verify Contact Information
            </Typography>
          <List>
            <ListItem>
            <ListItemText
            primary="Add Photo"
            style={{paddingRight: 30}}
            />
            <ListItemSecondaryAction>
            <input accept="image/*" 
            id="icon-button-file" 
            type="file" 
            style={{display:'none'}}
            defaultValue={values.imageUrl}
            onChange={(e) => handleFileUpload(e)}
            />
              <label 
              htmlFor="icon-button-file"
              >
                <IconButton 
                color="primary" 
                component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>

            </ListItemSecondaryAction>

            </ListItem>
            <ListItem 
              primaryText='First Name'
              secondaryText={ values.firstName }
            />
            <ListItem 
              primaryText="Last Name"
              secondaryText={ values.lastName }
            />
            <ListItem 
              primaryText="Cell Number"
              secondaryText={ values.cellNumber }
            />
          </List>
          <RaisedButton 
              label="Save Contact"
              primary={true}
              style={styles.button}
              onClick={this.save}
              />
            <RaisedButton 
              label="Back"
              primary={false}
              style={styles.button}
              onClick={this.back}
              />
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles ={
  button: {
    margin: 15
  },
  gridBox:{
    maxWidth: 500,
  }
}

export default Confirm;

