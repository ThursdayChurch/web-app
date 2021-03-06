import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Icon } from '../ui/Icons';

const NavbarToggle = ({ isDark, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="border-0"
    >
      <span className="mr-2">
        <Icon
          onClick={onClick}
          name={isOpen ? 'times' : 'bars'}
          fill={isDark ? '#ffffff' : '#525252'}
        />
      </span>
    </Navbar.Toggle>
  );
};

NavbarToggle.propTypes = {
  isDark: PropTypes.bool,
  onClick: PropTypes.func,
};

NavbarToggle.defaultProps = {
  isDark: false,
  onClick: () => true,
};

export default NavbarToggle;
