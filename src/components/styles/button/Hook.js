import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FFCC00 30%, #D2002E 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 38,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Link to='/login' >
            <Button className={classes.root}>
                Login
                <ContactMailIcon style={{paddingLeft: '5px'}} />
            </Button>
          </Link>  
}