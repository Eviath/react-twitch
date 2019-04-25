import React, {Component} from 'react';
import '../App.css';
import {Container} from "react-bootstrap";

export class Footbar extends Component {
  render() {
    return (
        <div className="footer">
          <Container>
            <h5>Footer thing</h5>
          </Container>
        </div>
    );
  }
}


