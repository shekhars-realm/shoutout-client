import React from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../utils/MyButton';
import {Link} from 'react-router-dom';
//redux imports
import {connect} from 'react-redux';
import {likeShout, unlikeShout} from '../../redux/actions/dataActions';
//icon imports
import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';

class LikeButton extends React.Component {
  likedShout = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.shoutId === this.props.shoutId)) {
      return true;
    } else {
      return false
    }
  }

  likeShout = () => {
    this.props.likeShout(this.props.shoutId);
  }

  unlikeShout = () => {
    console.log('liked');
    this.props.unlikeShout(this.props.shoutId);
  }

  render () {
    const {authenticated} = this.props.user;
    const likeButton = !authenticated ? (
      <MyButton tip='like'>
        <Link to='/login'>
          <FavouriteBorder color='primary'/>
        </Link>
      </MyButton>
    ) : (
      this.likedShout() ? (
        <MyButton tip='unlike' onClick={this.unlikeShout}>
          <FavouriteIcon color='primary'/>
        </MyButton>
      ) : (
        <MyButton tip='like' onClick={this.likeShout}>
          <FavouriteBorder color='primary'/>
        </MyButton>
      )
    )
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeShout: PropTypes.func.isRequired,
  unlikeShout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  shoutId: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  likeShout, unlikeShout
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
