import React, {Component} from 'react';
import '../App.css';
import {Jumbotron, Container} from "react-bootstrap";

export class LandingPage extends Component {
  render() {
    return (
        <Jumbotron fluid>
          <Container>
            <p>
              React application Twitch Api based
            </p>
          </Container>
        </Jumbotron>
    );
  }
}





