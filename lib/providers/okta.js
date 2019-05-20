const { assignDefaults } = require('./_utils')

module.exports = function okta (strategy) {
  const DEFAULTS = {
    // client_id & okta_domain MUST be set in nuxt.config.js

    response_type: 'id_token token',
    scope: 'openid profile email',
    nonce: ``,

    // TODO: automate
    redirect_uri_after_logout: 'http://localhost:8081/login',
    redirect_uri: 'http://localhost:8081/implicit/callback'
  }

  const ENDPOINTS = {
    authorization_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/authorize`,

    // authorization_endpoint:
    //  `https://${strategy.domain}.okta.com/oauth2/default/v1/authorize`,

    userinfo_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/userinfo`,

    // not sure if the token endpoint is needed for id_token or token types
    token_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/token`,

    logout_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/logout`
  }

  assignDefaults(strategy, {
    ...ENDPOINTS,
    ...DEFAULTS
  })
}
