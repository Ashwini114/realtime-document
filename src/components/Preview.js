import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import OnlineMembers from "./OnlineMembers"



const Preview = ({classes,onlineUsers,allUsers}) => {
  let options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);



  return (
    <Grid container spacing={3}>
    <Grid item xs={3}>
    <OnlineMembers classes={classes} onlineUsers={onlineUsers}/>
    </Grid>
    <Grid item xs={3}>
    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button >Present</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
           
          >
              
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>

 
    </Grid>
    <Grid item xs={3}>
    <Button variant="contained" color="secondary">
    Share
    </Button>
    </Grid>
  
   
  </Grid>
  );
}

export default Preview