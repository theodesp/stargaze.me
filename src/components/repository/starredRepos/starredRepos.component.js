import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Box, Button } from 'rebass';

import { RepositoriesList } from '../repositoryList/repositoriesList.component';
import { starredReposTestSelectors } from './starredRepos.testSelectors';
import { starredReposQuery } from '../queries';
import {
  addStarMutation,
  removeStarMutation,
  addStarAction,
  removeStarAction,
} from '../mutation';

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

  const [addStar] = useMutation(addStarMutation);
  const [removeStar] = useMutation(removeStarMutation);

  if (error)
    return (
      <Box mt={2} data-testid={starredReposTestSelectors.error}>
        There was an error loading repositories!
      </Box>
    );
  if (loading)
    return (
      <Box mt={2} data-testid={starredReposTestSelectors.loading}>
        Loading...
      </Box>
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
      <RepositoriesList
        repositories={data.viewer.starredRepositories}
        onAddStar={id => addStar(addStarAction(id))}
        onRemoveStar={id => removeStar(removeStarAction(id))}
      />
      {hasMoreRepos ? (
        <Button
          style={{
            marginBottom: '1em',
          }}
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
        </Button>
      ) : null}
    </div>
  );
};

StarredRepos.propTypes = {
  numRepos: PropTypes.number,
};

export default StarredRepos;
