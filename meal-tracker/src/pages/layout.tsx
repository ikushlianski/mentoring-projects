import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutesEnum } from "src/pages/routes.enum";

interface Props {
  children: React.ReactNode;
  showNavMenu: boolean;
}

export const Layout: React.FC<Props> = ({ children, showNavMenu }) => {
  return (
    <div>
      {showNavMenu && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Link to={"/"}>
              <Nav className="">
                <Navbar.Brand>Meal Tracker</Navbar.Brand>
              </Nav>
            </Link>

            <Nav className="me-auto">
              <Nav.Link>
                <Link to={RoutesEnum.settings}>Settings</Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
      <div>{children}</div>
    </div>
  );
};
