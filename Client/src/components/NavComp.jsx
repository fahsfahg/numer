import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './Comp.css'

export default class NavComp extends Component {
  render() {
    return (
        <>
        {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="/home" className='home'>🐈🐾</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Numer - 😟
                  </Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/bisection">Bisection</Nav.Link>
                    <Nav.Link href="/falseposition">False-Position</Nav.Link>
                    <Nav.Link href="/onepoint">One-Point</Nav.Link>
                    <Nav.Link href="/onep">ฟ้าสัญญาว่าฟ้าจะตั้งใจเรียน</Nav.Link>
                    <Nav.Link href="/onepagain">ฟ้าสัญญาว่าฟ้าจะตั้งใจเรียน 2</Nav.Link>
                    <Nav.Link href="/onepp">ฟ้าสัญญาว่าฟ้าจะตั้งใจเรียน 3</Nav.Link>
                    <Nav.Link href="/newtonraphson">Newton-Raphson</Nav.Link>
                    <Nav.Link href="/secant">Secant</Nav.Link>
                    <hr />
                    <Nav.Link href="/cramer">Cramer</Nav.Link>
                    <NavDropdown
                      title="Gauss"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="/gaussElumination3">Gauss Elumination</NavDropdown.Item>
                      <NavDropdown.Item href="/gaussJordan">Gauss Jordan</NavDropdown.Item>
                      <NavDropdown.Item href="/gauss-seidel">Gauss Seidel</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/jacobi">Jacobi</Nav.Link>
                    <Nav.Link href="/conjugate">Conjugate</Nav.Link>
                    <Nav.Link href="/lu">LU Decomposition</Nav.Link>
                    <hr />
                    <Nav.Link href="/regression">Regression</Nav.Link>
                    <Nav.Link href="/regression">Regression</Nav.Link>
                  </Nav>
                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    )
  }
}
