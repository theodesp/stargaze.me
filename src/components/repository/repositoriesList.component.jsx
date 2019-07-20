import React from 'react';
import RepositoryItemComponent from './repositoryItem.component';
import { repositoriesListTestSelectors } from './repository.test.selectors';

export const RepositoriesList = ({ repositories }) => {
  return (
    <ul data-testid={repositoriesListTestSelectors.list}>
      {repositories.nodes.map(({ name, description, url, id }) => (
        <RepositoryItemComponent
          name={name}
          description={description}
          url={url}
          key={id}
        />
      ))}
    </ul>
  );
};

export default RepositoriesList;
