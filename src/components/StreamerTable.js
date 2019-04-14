import React, {Component} from 'react';
import '../App.css';
import {Card, CardGroup} from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import {Link} from "react-router-dom";

export class StreamerTable extends Component {
  render() {
    const columns = [];

    this.props.streamers.forEach((streamer) => {
      columns.push(
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={streamer.thumbnail_url.replace("{height}", "200").replace("{width}", "300")}/>
            <Card.Body>
              <Card.Title>
                <Link to={{pathname: '/streamer', state: {stream: streamer}}}>{streamer.user_name}</Link>
              </Card.Title>
              <Card.Text>{streamer.title}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Viewer count: {streamer.viewer_count}</small>
              <br/>
              <small className="text-muted"> Streaming since <Moment>{streamer.started_at}</Moment></small>
              <br/>
              <small className="text-muted">Stream started <Moment fromNow>{streamer.started_at}</Moment></small>
            </Card.Footer>
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