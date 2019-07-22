import React from 'react';
import { SearchRepos } from './searchRepos.component';
import { GraphQLError } from 'graphql';
import { render, getByTestId, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { searchReposTestSelectors } from './searchRepos.testSelectors';
import { searchReposQuery } from '../queries';

const SEARCH_REPOS_RESPONSE = {
  search: {
    repositoryCount: 100,
    pageInfo: {
      endCursor: 'Y3Vyc29yOjI1',
      hasNextPage: true,
      __typename: 'pageInfo',
    },
    nodes: [
      {
        id: 'MDEwOlJlcG9zaXRvcnk0MjMyNTA2Ng==',
        name: 'Cook',
        url: 'https://github.com/twosigma/Cook',
        description:
          'Fair job scheduler on Mesos for batch workloads and Spark',
        viewerHasStarred: true,
        __typename: 'Repo',
      },
      {
        id: 'MDEwOlJlcG9zaXRvcnkyNjgwMjc=',
        name: 'jquery-cookie',
        url: 'https://github.com/carhartl/jquery-cookie',
        description: 'No longer maintained, superseded by JS Cookie:',
        viewerHasStarred: false,
        __typename: 'Repo',
      },
    ],
    __typename: 'search',
  },
};

const SEARCH_REPOS_MOCKS = [
  {
    request: {
      query: searchReposQuery,
      variables: { numRepos: 2, query: 'cook' },
    },
    result: { data: SEARCH_REPOS_RESPONSE },
  },
];

const SEARCH_REPOS_ERROR = [
  {
    request: {
      query: searchReposQuery,
      variables: { numRepos: 2, query: 'cook' },
    },
    result: {
      errors: [new GraphQLError('Error')],
    },
  },
];

describe('<SearchRepos />', () => {
  describe('Empty Query State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={SEARCH_REPOS_MOCKS}>
          <SearchRepos numRepos={2} query={''} />
        </MockedProvider>
      );
    });
    it('renders an empty query state', async () => {
      const { container } = rendered;
      const loading = getByTestId(container, searchReposTestSelectors.empty);
      expect(loading.textContent).toBe('Search query is empty!');
    });

    it('matches loading snapshot', async () => {
      const { container } = rendered;
      expect(container).toMatchSnapshot();
    });
  });
  describe('Loading State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={SEARCH_REPOS_MOCKS}>
          <SearchRepos numRepos={2} query={'cook'} />
        </MockedProvider>
      );
    });
    it('renders a loading state', async () => {
      const { container } = rendered;
      const loading = getByTestId(container, searchReposTestSelectors.loading);
      expect(loading.textContent).toBe('Loading...');
    });

    it('matches loading snapshot', async () => {
      const { container } = rendered;
      expect(container).toMatchSnapshot();
    });
  });
  describe('Loaded State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={SEARCH_REPOS_MOCKS}>
          <SearchRepos numRepos={2} query={'cook'} />
        </MockedProvider>
      );
    });
    it('renders a simple query properly', async () => {
      const { container } = rendered;

      const header = await waitForElement(
        () => getByTestId(container, searchReposTestSelectors.header),
        { container }
      );
      expect(header.textContent).toBe('Found 100 repos for query "cook"');

      const loadMoreButton = getByTestId(
        container,
        searchReposTestSelectors.loadMoreButton
      );
      expect(loadMoreButton).toBeVisible();
      expect(loadMoreButton.textContent).toBe('Show more');
    });
  });
  describe('Error State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={SEARCH_REPOS_ERROR}>
          <SearchRepos numRepos={2} query={'cook'} />
        </MockedProvider>
      );
    });
    it('renders an error state', async () => {
      const { container } = rendered;
      const error = await waitForElement(
        () => getByTestId(container, searchReposTestSelectors.error),
        { container }
      );
      expect(error.textContent).toBe(
        'There was an error loading repositories!'
      );
    });

    it('matches error snapshot', async () => {
      const { container } = rendered;
      await waitForElement(
        () => getByTestId(container, searchReposTestSelectors.error),
        { container }
      );
      expect(container).toMatchSnapshot();
    });
  });
});
