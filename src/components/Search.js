import React, { Component } from 'react'
import axios from "axios";
import Suggestions from './Suggestions'


class Search extends Component {
  state = {
    query: '',
    results: [],
    access_token: null
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.getInfo()
      }
    })
  };

  componentDidMount() {
    this.authTwitch();
  }


  getInfo = () => {
    axios.get(`https://api.twitch.tv/helix/users?login=${this.state.query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.state.access_token
      }
    })

        .then(({ data }) => {
          this.setState({
            results: data.data
          })
        })
  };

  authTwitch = () => {
    console.log('auth start');
    let data = JSON.stringify({
      client_id: 'ofnmc9arbsv2hfb72z7azqedk9ljjc',
      client_secret: 'qfjcszp77b0a70odi3cuyctgpu77my',
      grant_type: "client_credentials"
    });

    axios.post('https://id.twitch.tv/oauth2/token', data, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
    )
        .then((res) => {
          this.setState({
            access_token: res.data.access_token
          })
        })
  };



  render() {
    return (
        <form>
          <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
          />
          <Suggestions results={this.state.results} />
        </form>
    )
  }
}

export default Search
