import React from 'react';
import styled from 'styled-components';
import NavLink from '../navLink/navLink.component';
import LinkButton from '../../styles/components/link';
import TopMenu from '../../styles/components/topMenu';
import { menuBarTestSelectors } from './menuBarTestSelectors';
import PropTypes from 'prop-types';

const MenuBarLink = styled(NavLink)({
  padding: '0 1em',
});

export const MenuBar = ({ isAuthenticated, onSignOut, onSignIn }) => {
  return (
    <TopMenu>
      <nav>
        <MenuBarLink to="/">Home</MenuBarLink>
        <MenuBarLink to="/search">Search</MenuBarLink>
      </nav>
      <h1 data-testid={menuBarTestSelectors.title}>stargaze.me</h1>
      {isAuthenticated ? (
        <LinkButton
          href="#"
          data-testid={menuBarTestSelectors.loginButton}
          onClick={onSignOut}
        >
          Sign Out
        </LinkButton>
      ) : (
        <LinkButton
          href="#"
          data-testid={menuBarTestSelectors.loginButton}
          onClick={onSignIn}
        >
          Sign In to Github
        </LinkButton>
      )}
    </TopMenu>
  );
};

MenuBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func,
  onSignIn: PropTypes.func,
};

export default MenuBar;
