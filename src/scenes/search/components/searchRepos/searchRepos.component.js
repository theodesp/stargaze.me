import React from 'react';
import { SearchRepos } from '../../../../components';

export const Search = props => {
  return <SearchRepos query={props['*']} />;
};

export default Search;
