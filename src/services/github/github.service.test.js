import { authWithGitHub } from './github.service';

const fakeResponse = { fakeData: {} };
const fakeAuthenticator = {
  authenticate: jest.fn((config, cb) => cb(null, fakeResponse)),
};

beforeEach(() => {
  fakeAuthenticator.authenticate.mockClear();
});

it('github authentication successful request', async () => {
  expect.assertions(2);
  const response = await authWithGitHub(
    {
      scopes: '',
    },
    fakeAuthenticator
  );

  expect(fakeAuthenticator.authenticate).toHaveBeenCalledTimes(1);
  expect(response).toBe(fakeResponse);
});
