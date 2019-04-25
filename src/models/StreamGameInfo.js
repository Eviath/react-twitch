import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {authTwitch} from '../lib/methods'

export class StreamGameInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      game: [],
      access_token: null
    };
    this.authTwitch = authTwitch.bind(this);
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    // authorize twitch.tv
    this.setState({isLoading: true}, this.authTwitch());
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.isLoading){
      this.getGame();
      setInterval(this.getGame, 5000)
    }
  }

  // Get api streams
   getGame() {
    this.authTwitch();
    // We're using axios instead of Fetch
     axios
    // The API we're requesting data from
        .get(`https://api.twitch.tv/helix/games?id=${this.props.game}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.state.access_token
          }
        })
        // Once we get a response, we'll map the API endpoints to our props
        // Let's make sure to change the loading state to display the data
        .then(results => {
          this.setState({
            game: results.data.data[0],
            isLoading: false
          });
        })
        // We can still use the `.catch()` method since axios is promise-based
        .catch(error => this.setState({error, isLoading: false}));
  }


  render() {
    // set streams state as variable
    let game = this.state.game;
    let game_thumb = this.state.game.box_art_url;

    return (
          <strong>{game.name}</strong>
    );
  }
}


