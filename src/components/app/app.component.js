import React from 'react';
import { appTestSelectors } from './app.test.selectors';
import GitHubContext from '../../providers/github/github.provider';
import { StarredRepos } from '../starredRepos/starredRepos.component';
import './app.component.css';

const AppComponent = () => {
  return (
    <div className="App" data-testid={appTestSelectors.container}>
      <GitHubContext>
        <header className="App-header">
          <p data-testid={appTestSelectors.title}>stargaze.me</p>
        </header>
        <StarredRepos />
      </GitHubContext>
    </div>
  );
};

export default AppComponent;
