import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
//Muiimports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icons import
import CloseIcon from '@material-ui/icons/Close';
import UnFoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//redux Imports
import {connect} from 'react-redux';
import {getShout} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  horizontalDivider: {
    border: 'none',
    margin: 4
  },
  userImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
  expandButton: {
    position: 'absolute',
    right: 0
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  }
});

class ShoutDialog extends React.Component {
  state={
    open: false
  }
  handleOpen = () => {
    this.setState({open: true})
    this.props.getShout(this.props.shoutId);
  }
  handleClose = () => {
    this.setState({open: false})
  }
  render () {
    console.log('in dialog: ', this.props);
    const {classes, shout: {body, shoutId, createdAt, likeCount, commentCount, userHandle, userImage, comments}, UI: {loading}} = this.props;

    const dialogMarkup = loading ? <div className={classes.spinnerDiv}><CircularProgress size={200} thickness={2}/></div> : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.userImage}/>
        </Grid>
        <Grid item sm={7}>
          <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>@{userHandle}</Typography>
          <hr className={classes.horizontalDivider}/>
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('h:mm a,MMMM DD YYYY')}</Typography>
          <hr className={classes.horizontalDivider}/>
          <Typography variant="body1">{body}</Typography>
          <LikeButton shoutId={shoutId}/>
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <Comments comments={comments}/>
      </Grid>
    )

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Expand' tipClassName={classes.expandButton}>
          <UnFoldMore color='primary'/>
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ShoutDialog.propTypes = {
  getShout: PropTypes.func.isRequired,
  shoutId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  shout: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  shout: state.data.shout,
  UI: state.UI
})

const mapActionsToProps = {
  getShout
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ShoutDialog));
