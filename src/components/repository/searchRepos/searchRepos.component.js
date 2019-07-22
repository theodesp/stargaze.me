import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RepositoriesList } from '../repositoryList/repositoriesList.component';
import { searchReposTestSelectors } from './searchRepos.testSelectors';
import { searchReposQuery } from '../queries';
import {
  addStarMutation,
  removeStarMutation,
  addStarAction,
  removeStarAction,
} from '../mutation';

const updateRepositories = (prevResult = {}, { fetchMoreResult = {} }) => {
  const previousSearch = prevResult.search || {};
  const currentSearch = fetchMoreResult.search || {};
  const previousNodes = previousSearch.nodes || [];
  const currentNodes = currentSearch.nodes || [];
  return {
    ...prevResult,
    search: {
      ...previousSearch,
      nodes: [...previousNodes, ...currentNodes],
      pageInfo: currentSearch.pageInfo,
    },
  };
};

export const SearchRepos = ({ query = 'bootstrap', numRepos = 25 }) => {
  const { loading, error, data, fetchMore } = useQuery(searchReposQuery, {
    variables: { numRepos: numRepos, query },
  });
  const [addStar, props] = useMutation(addStarMutation);
  const [removeStar] = useMutation(removeStarMutation);

  if (!query)
    return (
      <div data-testid={searchReposTestSelectors.empty}>
        Search query is empty!
      </div>
    );
  if (error)
    return (
      <div data-testid={searchReposTestSelectors.error}>
        There was an error loading repositories!
      </div>
    );
  if (loading)
    return <div data-testid={searchReposTestSelectors.loading}>Loading...</div>;
  const hasMoreRepos = data.search && data.search.pageInfo.hasNextPage;

  return (
    <div>
      <header>
        <hgroup>
          <h2>Search Results</h2>
          <h4 data-testid={searchReposTestSelectors.header}>
            Found {data.search.repositoryCount} repos for query "{query}"
          </h4>
        </hgroup>
      </header>
      <hr />
      <RepositoriesList
        repositories={data.search}
        onAddStar={id => addStar(addStarAction(id))}
        onRemoveStar={id => removeStar(removeStarAction(id))}
      />
      {hasMoreRepos ? (
        <button
          data-testid={searchReposTestSelectors.loadMoreButton}
          onClick={() => {
            fetchMore({
              searchReposQuery,
              variables: {
                query,
                numRepos: numRepos || 25,
                after: data.search.pageInfo.endCursor,
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

export default SearchRepos;
