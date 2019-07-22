import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'rebass';

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
  <Card
    p={5}
    my={5}
    borderRadius={8}
    boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
  >
    <Star
      viewerHasStarred={viewerHasStarred}
      onAddStar={onAddStar ? onAddStar : null}
      onRemoveStar={onRemoveStar ? onRemoveStar : null}
    />
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
  </Card>
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
