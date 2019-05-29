import React, { Component } from 'react'
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import OpenIconSpeedDial from './OpenIconSpeedDial';
import Grid from '@material-ui/core/Grid';


class Contacts extends Component {
  constructor(){
    super();
    this.state = { 
      listOfContacts: [],
      open: false,
      hidden: false,
     };
}

getAllContacts = () =>{
  axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {withCredentials:true})
  .then(responseFromApi => {
    this.setState({
      listOfContacts: responseFromApi.data
    })
  })
}

componentDidMount() {
  this.getAllContacts();
}
  render() {

    const { listOfContacts } = this.state;
    
    return (
      <React.Fragment>
        <Grid 
          container
          justify="center"
          alignItems="center"
          >
          <Grid item xs={7} >
            <List>
            { listOfContacts.map((oneContact) => {
                return(
                  <ListItem 
                    button
                    divider
                    key={oneContact._id}
                    >
                    <ListItemAvatar>
                      <Avatar alt='Profile Pic' src={oneContact.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={oneContact.firstName} 
                      secondary={ oneContact.lastName}
                      />
                    <ListItemSecondaryAction
                    >
                      <OpenIconSpeedDial 
                      cellNumber={oneContact.cellNumber}  
                      id={oneContact._id}
                      />
                    </ListItemSecondaryAction>
                  </ListItem> 
                )
              })}
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Contacts;

             