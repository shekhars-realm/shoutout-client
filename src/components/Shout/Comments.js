import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
//mui Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  horizontalDivider: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginleft: 20
  }
})

class Comments extends Component {

  render () {
    const {comments, classes} = this.props;
    return (
      <Grid container>
        {
          comments.map((comment) => {
            const {body, createdAt, userImage, userHandle} = comment;
            return (
              <Fragment>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img src={userImage} alt='comment' className={classes.commentImage}/>
                    </Grid>
                    <Grid item sm={9}>
                      <div className={classes.commentData}>
                        <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow('h:mm a,MMMM DD YYYY')}</Typography>
                        <hr className={classes.horizontalDivider}/>
                        <Typography variant="body1">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <hr className={classes.visibleSeparator}/>
              </Fragment>
            )
          })
        }
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
