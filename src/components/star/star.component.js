import React from 'react';
import PropTypes from 'prop-types';
import * as activeStar from '../../images/star-active.png';
import * as star from '../../images/star.png';

export const Star = ({ viewerHasStarred, onAddStar, onRemoveStar }) => {
  const handleOnAddStar = () => {
    onAddStar && onAddStar();
  };
  const handleOnRemoveStar = () => {
    onRemoveStar && onRemoveStar();
  };
  if (viewerHasStarred) {
    return (
      <img
        style={{
          verticalAlign: 'middle',
          cursor: 'pointer',
        }}
        src={activeStar}
        alt="viewerHasStarred"
        onClick={handleOnRemoveStar}
      />
    );
  }

  return (
    <img
      style={{
        verticalAlign: 'middle',
        cursor: 'pointer',
      }}
      src={star}
      alt="star"
      onClick={handleOnAddStar}
    />
  );
};

Star.propTypes = {
  viewerHasStarred: PropTypes.bool.isRequired,
  onAddStar: PropTypes.func,
  onRemoveStar: PropTypes.func,
};

export default Star;
