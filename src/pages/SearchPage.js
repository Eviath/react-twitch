import React, {Component} from 'react';
import '../App.css';
import Search from "../components/Search";

class SearchPage extends Component {

  render() {
    return (
        <div className="SearchStreamsRow">
          <h1 className="m-5">Search Page</h1>
          <Search/>
        </div>
    );
  }
}

export default SearchPage;

