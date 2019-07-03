import React from 'react';
import '../App.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../Images/icon.png';
import axios from 'axios';
//Mui Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  form: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 100,
    margin: '10px auto 10px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8em',
    margin: '5px auto 5px auto'
  },
  progress: {
    position: 'absolute'
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/login', userData).then((res) => {
      console.log(res.data);
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    }).catch((err) => {
      this.setState({
        errors: err.response.data,
        loading: false
      })
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {classes} = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm xs>
          <img className={classes.image} src={AppIcon} alt='app icon'/>
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id='email' 
              name='email' 
              type='email' 
              label='Email'
              helperText={this.state.errors.email}
              error={this.state.errors.email ? true : false}
              fullWidth 
              className={classes.textField} 
              value={this.state.email} 
              onChange={this.handleChange}
            />
            <TextField 
              id='password' 
              name='password' 
              type='password' 
              label='Password'
              helperText={this.state.errors.password}
              error={this.state.errors.password ? true : false}
              fullWidth 
              className={classes.textField} 
              value={this.state.password} 
              onChange={this.handleChange}
            />
            {
              this.state.errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {this.state.errors.general}
                </Typography>
              )
            }
            <Button disabled={this.state.loading} type='submit' variant='contained' color='primary' className={classes.button}>
              Login
              {
                this.state.loading && (
                  <CircularProgress size={30} className={classes.progress}/>
                )
              }
            </Button>
            <br/>
            <small>don't have an account? Sign up <Link to='/signup'>here</Link></small>
          </form>
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
