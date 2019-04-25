import React, {Component} from 'react';
import '../App.css';
import {EmbedTwitch} from '../models/EmbedTwitch'
import {StreamGameInfo} from "../models/StreamGameInfo";
import axios from "axios";
import {authTwitch} from '../lib/methods'

class StreamerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: [],
      stream_viewers: this.props.location.state.stream.viewer_count,
      access_token: null
    };
    this.authTwitch = authTwitch.bind(this)
    this.getStreamViewers = this.getStreamViewers.bind(this);
  }

  componentDidMount() {
    this.authTwitch();
    const stream = this.props.location.state.stream;
    this.setState(() => ({stream}));
    this.setState({isLoading: true}, this.authTwitch());
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.isLoading){
      this.getStreamViewers();
      setInterval(this.getStreamViewers, 5000)
    }
  }


  getStreamViewers() {
    // We're using axios instead of Fetch
    axios
    // The API we're requesting data from
        .get(`https://api.twitch.tv/helix/streams?user_id=${this.state.stream.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.state.access_token
          }
        })
        // Once we get a response, we'll map the API endpoints to our props
        // Let's make sure to change the loading state to display the data
        .then(results => {
          this.setState({
            stream_viewers: results.data.data[0].viewer_count,
            error: null,
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
          <h1>{stream.user_name}</h1>
          <p>Streaming {this.state.stream && <StreamGameInfo game={stream.game_id}/>} for <span className="badge badge-secondary">{this.state.stream_viewers}</span> viewers</p>
          <p>{stream.title}</p>

            <EmbedTwitch channel={stream.user_name}/>
        </div>
    );
  }
}

export default StreamerPage;

