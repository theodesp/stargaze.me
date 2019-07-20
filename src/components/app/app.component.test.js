import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AppComponent from './app.component';
import { appTestSelectors } from './app.test.selectors';

it('renders without crashing', () => {
  const { container } = render(<AppComponent />);
  const title = getByTestId(container, appTestSelectors.container);
  expect(title.childElementCount).toBe(1);
});

it('matches snapshot', () => {
  const tree = renderer.create(<AppComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
