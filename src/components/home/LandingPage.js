import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MediaCard from '../styles/cards/MediaCard';




export class HomePage extends Component {

 
  
  render() {

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <br></br>
        <Grid 
          container
          justify="center"
          alignItems="center"
          >
          <Paper>
            <Grid item xs={12} >
              <MediaCard/> 
          </Grid>
          </Paper>
          </Grid>

        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default HomePage;

