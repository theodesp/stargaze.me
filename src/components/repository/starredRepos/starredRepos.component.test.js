import React from 'react';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/react-testing';
import { render, getByTestId, waitForElement } from '@testing-library/react';
import StarredRepos from './starredRepos.component';
import { starredReposTestSelectors } from './starredRepos.testSelectors';
import { starredReposQuery } from '../queries';

const STARRED_REPOS_RESPONSE = {
  viewer: {
    id: 'MDQ6VXNlcjMyODgwNQ==',
    name: 'Theofanis Despoudis',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/328805?v=4',
    starredRepositories: {
      totalCount: 100,
      pageInfo: {
        endCursor: 'Y3Vyc29yOnYyOpHOAWbWew==',
        hasNextPage: true,
        __typename: 'pageInfo',
      },
      nodes: [
        {
          id: 'MDEwOlJlcG9zaXRvcnkyMTM0OTI2Ng==',
          name: 'computer-science-for-javascript',
          description:
            'A complete collection of useful data structures and algorithms in JavaScript',
          url: 'https://github.com/theodesp/computer-science-for-javascript',
          viewerHasStarred: true,
          __typename: 'Repo',
        },
      ],
      __typename: 'StarredRepo',
    },
    __typename: 'Viewer',
  },
};

const STARRED_REPOS_MOCKS = [
  {
    request: {
      query: starredReposQuery,
      variables: { numRepos: 1 },
    },
    result: { data: STARRED_REPOS_RESPONSE },
  },
];

const STARRED_REPOS_ERROR = [
  {
    request: {
      query: starredReposQuery,
      variables: { numRepos: 1 },
    },
    result: {
      errors: [new GraphQLError('Error')],
    },
  },
];

describe('<StarredRepos />', () => {
  describe('Loading State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={STARRED_REPOS_MOCKS}>
          <StarredRepos numRepos={1} />
        </MockedProvider>
      );
    });
    it('renders a loading state', async () => {
      const { container } = rendered;
      const loading = getByTestId(container, starredReposTestSelectors.loading);
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
        <MockedProvider mocks={STARRED_REPOS_MOCKS}>
          <StarredRepos numRepos={1} />
        </MockedProvider>
      );
    });
    it('renders a simple query properly', async () => {
      const { container } = rendered;

      const header = await waitForElement(
        () => getByTestId(container, starredReposTestSelectors.header),
        { container }
      );
      expect(header.textContent).toBe('You have starred 100 repos');

      const loadMoreButton = getByTestId(
        container,
        starredReposTestSelectors.loadMoreButton
      );
      expect(loadMoreButton).toBeVisible();
      expect(loadMoreButton.textContent).toBe('Show more');
    });

    it('matches loaded snapshot', async () => {
      const { container } = rendered;
      await waitForElement(
        () => getByTestId(container, starredReposTestSelectors.header),
        { container }
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Error State', () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MockedProvider mocks={STARRED_REPOS_ERROR}>
          <StarredRepos numRepos={1} />
        </MockedProvider>
      );
    });
    it('renders an error state', async () => {
      const { container } = rendered;
      const error = await waitForElement(
        () => getByTestId(container, starredReposTestSelectors.error),
        { container }
      );
      expect(error.textContent).toBe(
        'There was an error loading repositories!'
      );
    });

    it('matches error snapshot', async () => {
      const { container } = rendered;
      await waitForElement(
        () => getByTestId(container, starredReposTestSelectors.error),
        { container }
      );
      expect(container).toMatchSnapshot();
    });
  });
});
