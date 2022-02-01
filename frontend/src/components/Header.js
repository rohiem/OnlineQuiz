import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logout from "../screens/Logout";
import Cookies from "universal-cookie";

function Header() {
  const cookies = new Cookies();
  const user = cookies.get("token");
  return (
    <div>
      <header>
        <Navbar bg="danger" variant="danger" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand href="#home">Manasa</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>
                    <i className="fas fa-s">Exams</i>
                  </Nav.Link>
                </LinkContainer>{" "}
                <LinkContainer to="/admin/teacher">
                  <Nav.Link>
                    <i className="fas fa-s">accept teachers</i>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/teacher/quizzes">
                  <Nav.Link>
                    <i className="fas fa-s">Quizzes by teachers</i>
                  </Nav.Link>
                </LinkContainer>
                {user ? (
                  <NavDropdown title={"Profile"} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item>
                      <Logout />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link href="login">
                      <i className="fas fa-users">login</i>
                    </Nav.Link>
                  </LinkContainer>
                )}
                {/*   {(
                  <NavDropdown title="Admin" id="adminmenue">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )} */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
