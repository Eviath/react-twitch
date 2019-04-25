import React, {Component} from 'react';
import '../App.css';
import {Navbar, Nav} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to={'/'}>
          <Navbar.Brand>React-Twitch</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/*<Link to="/search">Search for stream</Link>*/}
            </Nav>
            <Nav>
              <NavLink exact to="/" className='nav-link'>Homepage</NavLink>
              <NavLink exact to="/search" className='nav-link' >Search</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}


