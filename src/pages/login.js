import React from 'react';
import '../App.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Mui Imports
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  form: {
    textAlign: 'center'
  }
});

class Login extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          {'hola'}
        </Grid>
        <Grid item sm/>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
