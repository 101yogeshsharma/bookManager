import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar style={{width : "95vw", borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px"}} className="navbar sticky-top navbar-light bg-light m-auto" collapseOnSelect expand="lg" >
        <Navbar.Brand href="/">React Book Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Manage Books" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/AddBook">Add Books</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Delete">Delete Books</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Register">Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
