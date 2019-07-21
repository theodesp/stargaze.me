import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RepositoriesList } from '../repository/repositoriesList.component';
import { starredReposTestSelectors } from './starredRepos.testSelectors';

export const starredReposQuery = gql`
  query StarredReposQuery($numRepos: Int, $after: String) {
    viewer {
      id
      name
      avatarUrl
      starredRepositories(first: $numRepos, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          id
          name
          description
          url
        }
      }
    }
  }
`;

const updateRepositories = (prevResult = {}, { fetchMoreResult = {} }) => {
  const previousViewer = prevResult.viewer || {};
  const currentViewer = fetchMoreResult.viewer || {};
  const previousNodes = previousViewer.starredRepositories.nodes || [];
  const currentNodes = currentViewer.starredRepositories.nodes || [];
  const pageInfo = fetchMoreResult.viewer.starredRepositories.pageInfo;
  return currentNodes.length
    ? {
        ...prevResult,
        viewer: {
          ...previousViewer,
          starredRepositories: {
            ...previousViewer.starredRepositories,
            nodes: [...previousNodes, ...currentNodes],
            pageInfo,
          },
        },
      }
    : prevResult;
};

export const StarredRepos = ({ numRepos = 25 }) => {
  const { loading, error, data, fetchMore } = useQuery(starredReposQuery, {
    variables: { numRepos: numRepos },
  });

  if (error)
    return (
      <div data-testid={starredReposTestSelectors.error}>
        There was an error loading repositories!
      </div>
    );
  if (loading)
    return (
      <div data-testid={starredReposTestSelectors.loading}>Loading...</div>
    );
  const hasMoreRepos =
    data.viewer && data.viewer.starredRepositories.pageInfo.hasNextPage;

  return (
    <div>
      <header>
        <hgroup>
          <h2>Your starred Repos</h2>
          <h4 data-testid={starredReposTestSelectors.header}>
            You have starred {data.viewer.starredRepositories.totalCount} repos
          </h4>
        </hgroup>
      </header>
      <hr />
      <RepositoriesList repositories={data.viewer.starredRepositories} />
      {hasMoreRepos ? (
        <button
          data-testid={starredReposTestSelectors.loadMoreButton}
          onClick={() => {
            fetchMore({
              starredReposQuery,
              variables: {
                numRepos: numRepos || 25,
                after: data.viewer.starredRepositories.pageInfo.endCursor,
              },
              updateQuery: updateRepositories,
            });
          }}
        >
          Show more
        </button>
      ) : null}
    </div>
  );
};

StarredRepos.propTypes = {
  numRepos: PropTypes.number,
};

export default StarredRepos;
