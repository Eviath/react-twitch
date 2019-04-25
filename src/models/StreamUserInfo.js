import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {authTwitch} from '../lib/methods'
import {Spinner, Image, Row, Col} from 'react-bootstrap';


export class StreamUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      access_token: null,
      streamerData: {}
    };
    this.authTwitch = authTwitch.bind(this);
  }

  componentDidMount() {
    // authorize twitch.tv
    this.setState({isLoading: true}, this.authTwitch());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.access_token !== prevState.access_token || this.props.streamer !== prevProps.streamer) {
      this.getUserInfo()
    }
  }


  getUserInfo() {
    axios.get(`https://api.twitch.tv/helix/users?id=${this.props.streamer}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.state.access_token
      }
    })

        .then(({data}) => {
          this.setState({
            isLoading: false,
            streamerData: data.data[0]
          })
        })
  };


  render() {
    // set streams state as variable
    let user = this.state.streamerData;
    let loading = <Spinner animation="grow"/>;

    if (this.state.isLoading) {
      return (
          loading
      )
    } else if (this.state.error) {
      return (
          <p>this.state.error</p>
      )
    } else {
      return (
          <div className="streamer-description">
            <Row>
              <Col md={3}>
                <Image className="streamer-avatar" src={user.profile_image_url} rounded/>
              </Col>
              <Col md={9}>
                <strong>{user.description ? user.description : "User didn't provide profile description."}</strong>
              </Col>
            </Row>
          </div>
      )
    }

  }
}


