import React, { Component } from 'react';
import './App.css';
import { Header} from "./components/Header";
import {LandingPage} from "./components/LandingPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StreamerPage from './pages/StreamerPage'
import HomePage from './pages/HomePage'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header name={'Jacek'} age={'21'}/>
        <LandingPage/>
        <Router>
          <Route exact path="/" component={HomePage}/>
          <Route path="/streamer" component={StreamerPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
