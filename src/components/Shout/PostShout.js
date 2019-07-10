import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
//Muiimports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons import
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//redux Imports
import {connect} from 'react-redux';
import {postShout,clearErrors} from '../../redux/actions/dataActions';

const styles = (theme) => ({
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
  closeButton: {
    position: 'absolute',
    right: 0
  }
});

class PostShout extends Component {
  state={
    open: false,
    body: '',
    errors: {}
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        open: false,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.props.clearErrors();
    this.setState({open: false, errors: {}})
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postShout({body: this.state.body});
  }
  render () {
    const {classes, UI: {loading}} = this.props;
    return (
      <Fragment>
        <MyButton tip='Post shout' onClick={this.handleOpen}>
          <AddIcon color='primary'/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color='secondary'/>
          </MyButton>
          <DialogTitle>Shout it out!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                multiline
                rows='3'
                placeholder='Shout!!!!'
                error={this.state.errors.body ? true : false}
                helperText={this.state.errors.body}
                className={classes.textField}
                fullWidth
                onChange={this.handleChange}
              />
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostShout.propTypes = {
  classes: PropTypes.object.isRequired,
  postShout: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(mapStateToProps, {postShout, clearErrors})(withStyles(styles)(PostShout));
