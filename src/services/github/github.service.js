import netlify from 'netlify-auth-providers';
import { gitHubConfig } from '../../config';

const defaultAuthenticator = new netlify({
  site_id: gitHubConfig.netlifySiteId,
});

export const authWithGitHub = async (
  config,
  authService = defaultAuthenticator
) => {
  return new Promise((resolve, reject) => {
    authService.authenticate(
      { provider: 'github', scope: config.scopes },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};
