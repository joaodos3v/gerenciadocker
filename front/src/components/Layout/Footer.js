import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          <SourceLink style={{ color: "blue"}}>GerenciaDocker</SourceLink> © 2019, powered by <a href="https://github.com/reduction-admin/react-reduction" target="_blank" rel="noopener noreferrer" style={{ color: "blue"}}>Reduction Admin</a>.
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
