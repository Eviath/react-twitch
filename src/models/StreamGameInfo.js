import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';

const clientId = 'ofnmc9arbsv2hfb72z7azqedk9ljjc';
axios.defaults.headers.common['Client-ID'] = clientId;

export class StreamGameInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      game: [],
    };
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true}, this.getGame);
  }

  // Get api streams
  async getGame() {
    // We're using axios instead of Fetch
    await axios
    // The API we're requesting data from
        .get(`https://api.twitch.tv/helix/games?id=${this.props.game}`)
        // Once we get a response, we'll map the API endpoints to our props
        // Let's make sure to change the loading state to display the data
        .then(results => {
          console.log(results);
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
        <div className="FeaturedStreams">
          <p>{game.name}</p>
          <img alt='gamethumb' src={game_thumb && game_thumb.replace("{height}", "200").replace("{width}", "300")}/>
        </div>
    );
  }
}


