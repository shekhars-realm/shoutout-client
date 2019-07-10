import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../utils/MyButton';
import PropTypes from 'prop-types';
import DeleteShout from './DeleteShout';
import ShoutDialog from './ShoutDialog';
import LikeButton from './LikeButton';
//Mui imports
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//icon imports
import ChatIcon from '@material-ui/icons/Chat';
//redux imports
import {connect} from 'react-redux';
import {likeShout, unlikeShout} from '../../redux/actions/dataActions';


const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },
  content: {
   padding: 25,
   objectFit: 'cover'
  }
});

class Shout extends React.Component {


  render() {
    dayjs.extend(relativeTime)
    const {classes, shout: {
      body,
      createdAt,
      userImage,
      userHandle,
      shoutId,
      likeCount,
      commentCount
    }, user: {
      authenticated,
      credentials: {
        handle
      }
    }} = this.props;
    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteShout shoutId={shoutId}/>
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title= "Profile Image"/>
        <CardContent className={classes.content}>
          <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton shoutId={shoutId}/>
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount} comments</span>
          <ShoutDialog shoutId={shoutId} userhandle={userHandle}/>
        </CardContent>
      </Card>
    );
  }
}

Shout.propTypes = {
  user: PropTypes.object.isRequired,
  shout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Shout));
