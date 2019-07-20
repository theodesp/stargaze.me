import React from 'react';
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

class GitHubClientProvider extends React.Component {
  state = {
    client: this.props.client || null,
    error: null,
  };
  componentDidMount() {
    const token =
      window.localStorage.getItem('github-token') ||
      process.env.REACT_APP_GITHUB_TOKEN;
    if (token) {
      this.setState({
        client: client,
      });
    }
  }
  handleOnSignoutClick = () => {
    window.localStorage.removeItem('github-token');
    this.state.client.resetStore();
    this.setState({
      client: null,
      error: null,
    });
  };

  handleOnLoginClick = async () => {
    const { authenticate = authWithGitHub } = this.props;
    const handleError = error => {
      console.warn('Error: ', error);
      this.setState({ error });
    };
    const data = await authenticate(gitHubConfig).catch(handleError);
    window.localStorage.setItem('github-token', data.token);
    this.setState({ client: client });
  };

  render() {
    const { client, error } = this.state;
    const { children } = this.props;

    return client ? (
      <ApolloProvider client={client}>
        <button
          data-testid={githubTestSelectors.loginButton}
          onClick={this.handleOnSignoutClick}
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
          onClick={this.handleOnLoginClick}
        >
          Sign In to Github
        </button>
      </div>
    );
  }
}

GitHubClientProvider.propTypes = {
  client: PropTypes.object,
  authenticate: PropTypes.func,
};

export default GitHubClientProvider;
