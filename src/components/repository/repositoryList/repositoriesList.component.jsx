import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RepositoryItemComponent from '../repositoryItem/repositoryItem.component';
import { repositoriesListTestSelectors } from './respositoryList.testSelectors';

const UnorderedList = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const RepositoriesList = ({ repositories, onAddStar, onRemoveStar }) => {
  return (
    <UnorderedList data-testid={repositoriesListTestSelectors.list}>
      {repositories.nodes.map(
        ({ name, description, url, id, viewerHasStarred }) => (
          <RepositoryItemComponent
            name={name}
            description={description}
            url={url}
            viewerHasStarred={viewerHasStarred}
            key={id}
            onAddStar={onAddStar ? () => onAddStar(id) : null}
            onRemoveStar={onRemoveStar ? () => onRemoveStar(id) : null}
          />
        )
      )}
    </UnorderedList>
  );
};

RepositoriesList.propTypes = {
  repositories: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        viewerHasStarred: PropTypes.bool.isRequired,
        description: PropTypes.string,
      })
    ),
    pageInfo: PropTypes.shape({
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      __typename: PropTypes.string,
    }),
    repositoryCount: PropTypes.number,
    __typename: PropTypes.string,
  }),
  onAddStar: PropTypes.func,
  onRemoveStar: PropTypes.func,
};

export default RepositoriesList;
