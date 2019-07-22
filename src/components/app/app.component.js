import React from 'react';
import { Router } from '@reach/router';
import { appTestSelectors } from './app.test.selectors';
import GitHubContext from '../../providers/github/github.provider';
import './app.component.css';
import HomeScene from '../../scenes/home/components/homeScene/homeScene.component';
import SearchScene from '../../scenes/search/components/searchScene/searchScene.component';
import SearchRepos from '../../scenes/search/components/searchRepos/searchRepos.component';

export const NotFound = () => <div>Sorry, nothing here.</div>;

export const AppComponent = () => {
  return (
    <div className="App" data-testid={appTestSelectors.container}>
      <GitHubContext>
        <Router>
          <HomeScene path="/" />
          <SearchScene path="search">
            <SearchRepos path="/*" />
          </SearchScene>
          <NotFound default />
        </Router>
      </GitHubContext>
    </div>
  );
};

export default AppComponent;
