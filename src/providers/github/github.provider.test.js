import React from 'react';
import {
  render,
  getByTestId,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import renderer from 'react-test-renderer';

import GitHubClientProvider from './github.provider';
import { menuBarTestSelectors } from '../../components/menuBar/menuBarTestSelectors';

const fakeResponse = { token: '123' };
const fakeAuthenticator = jest.fn(() => Promise.resolve(fakeResponse));
const fakeClient = jest.fn(() => Promise.resolve(fakeResponse));

beforeEach(() => {
  fakeAuthenticator.mockClear();
  fakeClient.mockClear();
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  window.localStorage.__proto__.setItem = jest.fn();
  window.localStorage.__proto__.getItem = jest.fn();
});

it('renders without crashing', () => {
  const { container } = render(
    <GitHubClientProvider authenticate={fakeAuthenticator} />
  );
  const login = getByTestId(container, menuBarTestSelectors.loginButton);
  expect(login.textContent).toBe('Sign In to Github');
});

it('authenticates', async () => {
  const { container } = render(
    <GitHubClientProvider authenticate={fakeAuthenticator} />
  );
  fireEvent.click(getByTestId(container, menuBarTestSelectors.loginButton));
  await waitForElement(
    () => getByTestId(container, menuBarTestSelectors.loginButton),
    { container }
  );
  const logout = getByTestId(container, menuBarTestSelectors.loginButton);
  expect(logout.textContent).toBe('Sign Out');
});

it('matches snapshot', () => {
  const tree = renderer
    .create(<GitHubClientProvider authenticate={fakeAuthenticator} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
