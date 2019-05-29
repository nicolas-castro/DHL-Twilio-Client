import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #D2002E 30%, #FFCC00 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 38,
    padding: '0 30px',
    marginRight: '5px',
    },
});

export default function Hook2() {
  const classes = useStyles();
  return  <Link to='/signup' >
            <Button className={classes.root}>
                Signup
                <SendIcon style={{paddingLeft: '5px'}} />
            </Button>
          </Link>            
    }