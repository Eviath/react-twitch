import React, { Component } from 'react'
import axios from "axios";
import Suggestions from './Suggestions'
import {authTwitch} from '../lib/methods'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      results: [],
      access_token: null
    };
    this.authTwitch = authTwitch.bind(this)
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.getUserInfo();
      }
    })
  };

  componentDidMount() {
    this.authTwitch()
  }


  getUserInfo = () => {
    axios.get(`https://api.twitch.tv/helix/users?login=${this.state.query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.state.access_token
      }
    })

        .then(({ data }) => {
          this.setState({
            results: data.data
          }, () => {
            if (this.state.results && this.state.results.length > 0) {
              this.getStreamInfo();
            }
          })
        })
  };

  getStreamInfo = () => {
    axios.get(`https://api.twitch.tv/helix/streams?user_id=${this.state.results[0].id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.state.access_token
      }
    })

        .then(({ data }) => {
          this.setState({
            userStream: data.data
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
          <Suggestions results={this.state.results} userStream={this.state.userStream} />
        </form>
    )
  }
}

export default Search
