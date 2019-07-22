import gql from 'graphql-tag';

export const searchReposQuery = gql`
  query($query: String!, $after: String) {
    search(type: REPOSITORY, query: $query, first: 25, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          name
          url
          description
          viewerHasStarred
        }
      }
    }
  }
`;

export const starredReposQuery = gql`
  query StarredReposQuery($numRepos: Int, $after: String) {
    viewer {
      id
      name
      avatarUrl
      starredRepositories(first: $numRepos, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          id
          name
          description
          url
          viewerHasStarred
        }
      }
    }
  }
`;
