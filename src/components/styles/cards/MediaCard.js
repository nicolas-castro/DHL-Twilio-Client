import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Hook2 from '../button/Hook2';
import Hook from '../button/Hook';


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
  actions: {
    justifyContent: 'center',
  },
});

export default function MediaCard() {
  const classes = useStyles();

   
  return  <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="../images/DHLtwilio.jpg"
                title="DHL Twilio Landing Page"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Welcome to DHL Express VOIP application. Please create an account below
                  or login if you have an existing account.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Hook2/>
              <Hook/>
            </CardActions>
          </Card>;
}