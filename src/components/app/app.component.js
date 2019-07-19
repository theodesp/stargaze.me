import React from 'react';
import logo from '../../images/logo.svg';
import { appTestSelectors } from './test.selectors';
import GitHubContext from '../../providers/github/github.provider';
import './app.component.css';

function AppComponent() {
  return (
    <div className="App" data-testid={appTestSelectors.container}>
      <GitHubContext>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p data-testid={appTestSelectors.title}>stargaze.me</p>
        </header>
      </GitHubContext>
    </div>
  );
}

export default AppComponent;
