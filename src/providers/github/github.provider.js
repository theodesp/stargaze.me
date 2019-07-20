import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { gitHubConfig } from '../../config';
import { authWithGitHub } from '../../services';
import { githubTestSelectors } from './girhubTestSelectors';

const httpLink = createHttpLink({
  uri: gitHubConfig.apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('github-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const Apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GitHubClientProvider = ({
  client = Apollo,
  authenticate = authWithGitHub,
  children,
}) => {
  const [apolloClient, setApolloClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =
      window.localStorage.getItem('github-token') ||
      process.env.REACT_APP_GITHUB_TOKEN;
    if (token) {
      setApolloClient(client);
    }
  }, [client]); // Runs only once

  const handleOnSignoutClick = () => {
    window.localStorage.removeItem('github-token');
    apolloClient.resetStore();
    setApolloClient(null);
    setError(null);
  };

  const handleOnLoginClick = async () => {
    const handleError = error => {
      console.warn('Error: ', error);
      setError(error);
    };
    const data = await authenticate(gitHubConfig).catch(handleError);
    window.localStorage.setItem('github-token', data.token);
    setApolloClient(client);
  };

  return apolloClient ? (
    <ApolloProvider client={apolloClient}>
      <button
        data-testid={githubTestSelectors.loginButton}
        onClick={handleOnSignoutClick}
      >
        Sign Out
      </button>
      {children}
    </ApolloProvider>
  ) : error ? (
    <div>
      Error! <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  ) : (
    <div>
      <button
        data-testid={githubTestSelectors.loginButton}
        onClick={handleOnLoginClick}
      >
        Sign In to Github
      </button>
    </div>
  );
};

GitHubClientProvider.propTypes = {
  client: PropTypes.object,
  authenticate: PropTypes.func,
};

export default GitHubClientProvider;
