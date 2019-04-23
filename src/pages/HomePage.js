import React, {Component} from 'react';
import '../App.css';
import {FeaturedStreamsRow} from "../components/FeaturedStreamsRow";

class HomePage extends Component {
  render() {
    return (
        <div className="FeaturedStreamsRow">
          <FeaturedStreamsRow/>
        </div>
    );
  }
}

export default HomePage;

