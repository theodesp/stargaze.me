import { render, getByTestId } from '@testing-library/react';
import renderer from 'react-test-renderer';
import React from 'react';
import RepositoryItem from './repositoryItem.component';
import { repositoryTestSelectors } from './repository.testSelectors';

const repository = {
  name: 'stargaze.me',
  url: 'http://stargaze.me',
  description: 'star',
  viewerHasStarred: true,
};

it('renders without crashing', () => {
  expect.assertions(3);
  const { container } = render(<RepositoryItem {...repository} />);
  const name = getByTestId(container, repositoryTestSelectors.name);
  const description = getByTestId(
    container,
    repositoryTestSelectors.description
  );
  const url = getByTestId(container, repositoryTestSelectors.url);

  expect(name.textContent).toBe(repository.name);
  expect(description.textContent).toBe(repository.description);
  expect(url.textContent).toBe(repository.url);
});

it('matches snapshot', () => {
  const tree = renderer.create(<RepositoryItem {...repository} />).toJSON();
  expect(tree).toMatchSnapshot();
});
