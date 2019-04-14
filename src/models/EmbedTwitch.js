import React, { Component } from 'react';
import '../App.css';

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

export class EmbedTwitch extends React.Component {
  componentDidMount() {
    let embed;
    const script = document.createElement('script');
    script.setAttribute(
        'src',
        EMBED_URL
    );
    script.addEventListener('load', () => {
      embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
    });
    document.body.appendChild(script);
  }

  render() {

    return (
        <div>
          <div id={this.props.targetID}/>
        </div>
    )
  }
}

EmbedTwitch.defaultProps = {
  targetID: 'twitch-embed',
  width: '940',
  height: '480',
};
