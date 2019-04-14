import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { EmbedTwitch } from '../models/EmbedTwitch'

class StreamerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: [],
    };
  }

  componentDidMount () {
    const  stream  = this.props.location.state.stream;
    this.setState(() => ({ stream }))
  }

  render() {
   let  stream  = this.state.stream;

    return (
        <div className="Header">
          <Link to='/'> Homepage </Link>
            <h1>{stream.user_name}</h1>
            <p>{stream.title}</p>
            <EmbedTwitch channel={stream.user_name}/>
        </div>
    );
  }
}

export default StreamerPage;

