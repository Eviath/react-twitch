import React, {Component} from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import {EmbedTwitch} from '../models/EmbedTwitch'
import {StreamGameInfo} from "../models/StreamGameInfo";
import axios from "axios";

class StreamerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: [],
      stream_viewers: this.props.location.state.stream.viewer_count,
    };
    this.getStreamViewers = this.getStreamViewers.bind(this);
  }

  componentDidMount() {
    const stream = this.props.location.state.stream;
    this.setState(() => ({stream}));
    this.setState({isLoading: true}, this.getStreamViewers);
    setInterval(this.getStreamViewers, 5000);
  }

  async getStreamViewers() {

    // We're using axios instead of Fetch
    await axios
    // The API we're requesting data from
        .get(`https://api.twitch.tv/helix/streams?user_id=${this.state.stream.user_id}`)
        // Once we get a response, we'll map the API endpoints to our props
        // Let's make sure to change the loading state to display the data
        .then(results => {
          console.log(results);
          this.setState({
            stream_viewers: results.data.data[0].viewer_count,
            isLoading: false
          });
        })
        // We can still use the `.catch()` method since axios is promise-based
        .catch(error => this.setState({error, isLoading: false}));
  }

  render() {
    let stream = this.state.stream;

    return (
        <div className="Header">
          <Link to='/'> Homepage </Link>
          <h1>{stream.user_name}</h1>
          <p>{stream.title}</p>
          <p>{this.state.stream_viewers}</p>
          <p>{stream.game_id}</p>
          <EmbedTwitch channel={stream.user_name}/>
          {this.state.stream && <StreamGameInfo game={stream.game_id}/>}
        </div>
    );
  }
}

export default StreamerPage;

