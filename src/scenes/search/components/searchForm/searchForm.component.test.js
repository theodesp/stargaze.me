import React from 'react';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SearchForm from './searchForm.component';
import { searchFormTestSelectors } from './searchForm.testSelectors';

it('renders without crashing', () => {
  const { container } = render(<SearchForm />);
  const submit = getByTestId(container, searchFormTestSelectors.submit);
  expect(submit.textContent).toBe('Search');
});

it('calls onSubmit', () => {
  const onSubmit = jest.fn();
  const { container } = render(<SearchForm onSubmit={onSubmit} />);
  const form = getByTestId(container, searchFormTestSelectors.form);
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalled();
});

it('matches snapshot', () => {
  const tree = renderer.create(<SearchForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
