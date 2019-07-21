import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { searchFormTestSelectors } from './searchForm.testSelectors';

const handleOnSubmit = e => {
  e.preventDefault();
  const query = e.target.elements.repos.value.trim();
  navigate(`/search/${query}`);
};

export const SearchForm = ({ onSubmit = handleOnSubmit }) => (
  <form
    data-testid={searchFormTestSelectors.form}
    onSubmit={onSubmit ? e => onSubmit(e) : undefined}
    style={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 300,
      margin: 'auto',
    }}
  >
    <input
      type="search"
      name="repos"
      data-testid={searchFormTestSelectors.input}
      placeholder="Enter a Repository name"
      autoFocus
      size={32}
      style={{
        borderRight: 'none',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      }}
    />
    <button data-testid={searchFormTestSelectors.submit} type="submit">
      Search
    </button>
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchForm;
