import React from 'react';
import '../App.css';
import axios from 'axios';
//Mui imports
import Grid from '@material-ui/core/Grid';
//import components
import Shout from '../components/Shout';

class Home extends React.Component {

  state = {
    shouts: null
  }

  componentDidMount() {
    axios.get('/shouts').then((res) => {
      this.setState({
        shouts: res.data
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    let recentShoutMarkup = this.state.shouts ? (
      this.state.shouts.map((shout) => {
        return <Shout key={shout.shoutId} shout={shout}/>
      })
    ) : <p>loading...</p>
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentShoutMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Content..</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
