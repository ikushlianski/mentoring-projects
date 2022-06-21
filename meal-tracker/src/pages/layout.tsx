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
            <Navbar.Brand>
              <Link to={"/"}>Meal Tracker</Link>
            </Navbar.Brand>

            <Nav>
              <Link to={RoutesEnum.settings}>Settings</Link>
            </Nav>
          </Container>
        </Navbar>
      )}
      <Container>{children}</Container>
    </div>
  );
};
