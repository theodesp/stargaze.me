import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AppComponent from './app.component';
import { appTestSelectors } from './test.selectors';

it('renders without crashing', () => {
  const { container } = render(<AppComponent />);
  const title = getByTestId(container, appTestSelectors.title);
  expect(title.textContent).toBe('stargaze.me');
});

it('matches snapshot', () => {
  const tree = renderer.create(<AppComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
