import React, {Component} from 'react';
import '../App.css';
import {Card, CardGroup, Spinner} from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import {Link} from "react-router-dom";
import {StreamUserInfo} from "../models/StreamUserInfo";

export class StreamerTable extends Component {
  render() {
    const columns = [];

    this.props.streamers && this.props.streamers.forEach((streamer) => {
      columns.push(
          <Card className="streamertable-card" style={{width: '18rem'}}>
            <Card.Img variant="top" src={streamer.thumbnail_url.replace("{height}", "800").replace("{width}", "1200")}/>
            <Card.Body>
              <Card.Title>
                {streamer.user_name}
              </Card.Title>
              <StreamUserInfo streamer={streamer.user_id}/>
            </Card.Body>
            <Card.Footer>
              <Card.Text>{streamer.title}</Card.Text>
              <small className="text-muted">Viewer count: {streamer.viewer_count}</small>
              <br/>
              <small className="text-muted"> Streaming since <Moment>{streamer.started_at}</Moment></small>
              <br/>
              <small className="text-muted">Stream started <Moment fromNow>{streamer.started_at}</Moment></small>
            </Card.Footer>
            <Link className='streamer-link' to={{pathname: '/streamer', state: {stream: streamer}}}/>
          </Card>
      )
    });


    return (
        <CardGroup>
          {columns}
        </CardGroup>
    );
  }
}