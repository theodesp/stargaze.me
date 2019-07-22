import gql from 'graphql-tag';

export const addStarMutation = gql`
  mutation($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        id
      }
    }
  }
`;

export const removeStarMutation = gql`
  mutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        id
      }
    }
  }
`;

export const addStarAction = id => ({
  variables: { starrableId: id },
  update: proxy => {
    proxy.writeFragment({
      id: `Repository:${id}`,
      fragment: gql`
        fragment repository on Repository {
          viewerHasStarred
        }
      `,
      data: { viewerHasStarred: true, __typename: 'Repository' },
    });
  },
});

export const removeStarAction = id => ({
  variables: { starrableId: id },
  optimisticResponse: {
    __typename: 'Mutation',
    removeStar: {
      starrable: {
        id: id,
        __typename: 'Repository',
      },
    },
  },
  update: proxy => {
    proxy.writeFragment({
      id: `Repository:${id}`,
      fragment: gql`
        fragment repository on Repository {
          viewerHasStarred
        }
      `,
      data: { viewerHasStarred: false, __typename: 'Repository' },
    });
  },
});
