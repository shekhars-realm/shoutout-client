import React from 'react';
import '../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
//Mui imports
import Grid from '@material-ui/core/Grid';
//import components
import Shout from '../components/Shout/Shout';
import Profile from '../components/Profile/Profile';
//redux imports
import {connect} from 'react-redux';
import {getShouts} from '../redux/actions/dataActions'

class Home extends React.Component {

  state = {
    shouts: null
  }

  componentDidMount() {
    this.props.getShouts()
  }
  render() {
    const {shouts, loading} = this.props.data
    let recentShoutMarkup = !loading ? (
      shouts.map((shout) => {
        return <Shout key={shout.shoutId} shout={shout}/>
      })
    ) : <p>loading...</p>
    return (
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentShoutMarkup}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {getShouts})(Home);
