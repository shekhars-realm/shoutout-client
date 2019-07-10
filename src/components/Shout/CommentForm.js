import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
//mui improts
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux improts
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions';
const styles = theme => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  submitButton: {
    position: 'relative',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  }
})
class CommentForm extends React.Component {
  state= {
    body: '',
    errors: {}
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        errors: {}
      })
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log('in form submit');
    event.preventDefault();
    this.props.submitComment(this.props.shoutId, {body: this.state.body});
  }
  render () {
    const {classes, authenticated} = this.props;
    const commentFormarkup = authenticated ? (
      <Grid item sm={12} style={{textAlign: 'center'}}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Comment on shout'
            error={this.state.errors.comment ? true : false}
            helperText={this.state.errors.comment}
            className={classes.textField}
            fullWidth
            value={this.state.body}
            onChange={this.handleChange}
          />
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator}/>
      </Grid>
    ) : null;
    return commentFormarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  shoutId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));
