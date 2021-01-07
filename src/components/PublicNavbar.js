import React from 'react';
import {Navbar} from 'react-bootstrap';

const PublicNavbar = () => {
    return (
    <Navbar bg="success" expand="lg">
        <Navbar.Brand href="#home" className="text-white ml-5">Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
    </Navbar>
    )
}

export default PublicNavbar
