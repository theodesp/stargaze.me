import React from 'react';
import PropTypes from 'prop-types';
import { repositoryTestSelectors } from './repository.testSelectors';
import Star from '../../star/star.component';

const RepositoryItem = ({
  name,
  description,
  url,
  viewerHasStarred,
  onAddStar,
  onRemoveStar,
}) => (
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
    <Star
      viewerHasStarred={viewerHasStarred}
      onAddStar={onAddStar ? onAddStar : null}
      onRemoveStar={onRemoveStar ? onRemoveStar : null}
    />
    <p data-testid={repositoryTestSelectors.description}>{description}</p>
  </div>
);

RepositoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  viewerHasStarred: PropTypes.bool.isRequired,
  onAddStar: PropTypes.func,
  onRemoveStar: PropTypes.func,
  description: PropTypes.string,
};

export default RepositoryItem;
