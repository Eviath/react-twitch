import React, { Component } from 'react';
import '../App.css';
import {Jumbotron, Container} from "react-bootstrap";

export class LandingPage extends Component {
  render() {
    return (
        <Jumbotron fluid>
          <Container>
            <h1>React - Twitch App</h1>
            <p>
              React application based on Twitch Api.
            </p>
          </Container>
        </Jumbotron>
    );
  }
}





