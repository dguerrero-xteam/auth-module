const { assignDefaults } = require('./_utils')

module.exports = function okta (strategy) {
  const DEFAULTS = {
    _scheme: 'oktaplus',

    // client_id and okta_domain
    // MUST be set in the nuxt.config.js

    url: 'okta.com',

    redirect: {
      callback: '/implicit/callback'
    },

    scope: 'openid profile email offline_access',

    server_id: 'default',
    grant_type: 'authorization_code',
    response_type: 'id_token token code',
    nonce: ''
  }

  const serverId = strategy.server_id ? strategy.server_id : DEFAULTS.server_id
  const url = strategy.url ? strategy.url : DEFAULTS.url
  const baseEndpoint = `https://${strategy.domain}.${url}/oauth2/${serverId}/v1`
  const apiProxyServer = strategy?.api_proxy_server

  const ENDPOINTS = {
    authorization_endpoint: `${baseEndpoint}/authorize`,
    userinfo_endpoint: `${baseEndpoint}/userinfo`,
    logout_endpoint: `${baseEndpoint}/logout`,
    token_endpoint: apiProxyServer ?`${apiProxyServer}/api/get-refresh-token` : null,
  }

  assignDefaults(strategy, {
    ...ENDPOINTS,
    ...DEFAULTS
  })
}
