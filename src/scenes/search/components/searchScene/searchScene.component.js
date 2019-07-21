import React from 'react';
import SearchForm from '../searchForm/searchForm.component';

export const SearchScene = ({ children }) => (
  <div style={{ 'margin-top': '1em' }}>
    <SearchForm />
    {children}
  </div>
);

export default SearchScene;
