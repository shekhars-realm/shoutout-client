import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css'
//MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends React.Component {
  render() {
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          <Button color='inherit' component={Link} to='/'>Home</Button>
          <Button color='inherit' component={Link} to='/login'>Login</Button>
          <Button color='inherit' component={Link} to='/signup'>Signup</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
