import React, {Component} from 'react';
import '../App.css';
import Search from "../components/Search";
import axios from 'axios'

class SearchPage extends Component {


  render() {
    return (
        <div className="SearchStreamsRow">
          Search Page
          <Search/>
        </div>
    );
  }
}

export default SearchPage;

