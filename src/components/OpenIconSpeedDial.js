import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CallIcon from '@material-ui/icons/Call';
import InfoIcon from '@material-ui/icons/Info';
import MessageIcon from '@material-ui/icons/Message';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

class OpenIconSpeedDial extends Component {
  constructor(){
    super();
    this.state = { 
      open: false,
      hidden: false,
     };
}
handleVisibility = () => {
  this.setState(state => ({
    open: false,
    hidden: !state.hidden,
  }));
};

handleClick = () => {
  this.setState(state => ({
    open: !state.open,
  }));
};

handleOpen = () => {
  if (!this.state.hidden) {
    this.setState({
      open: true,
    });
  }
};

handleClose = () => {
  this.setState({
    open: false,
  });
};

  render() {
    const { hidden, open } = this.state;
    const actions = [
      { icon: <CallIcon />, name: 'Call' },
      { icon: <MessageIcon />, name: 'Text' },
      { icon: <DeleteIcon />, name: 'Delete' ,  href: "/contacts/create"},
    ];

    return (
      <div>
        <SpeedDial
          ariaLabel="Contact Options"
          hidden={hidden}
          icon={<SpeedDialIcon openIcon={<InfoIcon />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
          direction="left"
          ButtonProps={{ color: "secondary" , size: "small" }}


        >
          {actions.map((action) => {

            return(
            
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement='bottom'
              onClick={this.handleClick}
              href={action.href}
            />
          )})}
        </SpeedDial>
      </div>
    )
  }
}

export default OpenIconSpeedDial;