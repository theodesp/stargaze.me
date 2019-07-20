import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import renderer from 'react-test-renderer';
import RepositoriesList from './repositoriesList.component';
import { repositoriesListTestSelectors } from './repository.test.selectors';

const repository = {
  id: '1',
  name: 'stargaze.me',
  url: 'http://stargaze.me',
  description: 'star',
};

it('renders without crashing', () => {
  const { container } = render(
    <RepositoriesList repositories={{ nodes: [repository] }} />
  );
  const list = getByTestId(container, repositoriesListTestSelectors.list);
  expect(list.childElementCount).toBe(1);
});

it('matches snapshot', () => {
  const tree = renderer
    .create(<RepositoriesList repositories={{ nodes: [repository] }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
