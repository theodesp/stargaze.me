import React from 'react';
import PropTypes from 'prop-types';
import { repositoryTestSelectors } from './repository.test.selectors';

const RepositoryItem = ({ name, description, url }) => (
  <div>
    <h2 data-testid={repositoryTestSelectors.name}>{name}</h2>
    <a
      data-testid={repositoryTestSelectors.url}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {url}
    </a>
    <p data-testid={repositoryTestSelectors.description}>{description}</p>
  </div>
);

RepositoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default RepositoryItem;
