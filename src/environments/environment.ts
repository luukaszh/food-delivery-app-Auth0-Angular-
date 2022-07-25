import pkg from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: pkg.domain,
    clientId: pkg.clientId,
    redirectUri: window.location.origin,
    audience: pkg.audience,
  },
  dev: {
    serverUrl: pkg.serverUrl,
  }
};
