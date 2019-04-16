import React from 'react'
import {StreamerTable} from "./StreamerTable";
import {Col, Container} from 'react-bootstrap';
const Suggestions = (props) => {
  const options = props.results.map(r => (
      <li key={r.id}>
        {r.display_name}
      </li>

  ));

  let stream_info;
  if (props.userStream && props.userStream.length > 0) {
    stream_info = <StreamerTable streamers={props.userStream}/>
  } else {
    stream_info = 'Provide user name with live stream on Twitch.tv platform to see its details. If you dont know any streamer name, you can check them on homepage in featured.'
  }

    return (
        <div>
          <ul>{options}</ul>
          <Container>
            <Col md={8} className={'mx-auto'}>
              {stream_info}
            </Col>
          </Container>
        </div>
    )
};

export default Suggestions