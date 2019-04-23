import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {StreamerTable} from "./StreamerTable";
import {authTwitch} from '../lib/methods'


export class FeaturedStreamsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      streams: [],
      access_token: null
    };
    this.authTwitch = authTwitch.bind(this)
    this.getStreams = this.getStreams.bind(this);
  }

  componentDidMount() {
    // authorize twitch
    this.setState({isLoading: true}, this.authTwitch());
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.isLoading){
      this.getStreams();
      setInterval(this.getStreams, 5000)
    }
  }


  // Get api streams
  getStreams() {
    // We're using axios instead of Fetch
    axios
    // The API we're requesting data from
        .get("https://api.twitch.tv/helix/streams?first=4", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.state.access_token
          }
        })

        // Once we get a response, we'll map the API endpoints to our props
        // Let's make sure to change the loading state to display the data
        .then(results => {
          this.setState({
            streams: results.data.data,
            error: null,
            isLoading: false
          });
        })
        // We can still use the `.catch()` method since axios is promise-based
        .catch(error => this.setState({error, isLoading: false}));
  }


  render() {
    // set streams state as variable
    let streams = this.state.streams;

    return (
        <div className="FeaturedStreams">
          <h1 className={'p-5'}> Twitch Featured </h1>
          <StreamerTable streamers={streams}/>
        </div>
    );
  }
}


