import React, { Component } from 'react';
import './App.css';
import { Header} from "./components/Header";
import {LandingPage} from "./components/LandingPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StreamerPage from './pages/StreamerPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Header/>
        <LandingPage/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/streamer" component={StreamerPage}/>
          <Route path="/search" component={SearchPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
