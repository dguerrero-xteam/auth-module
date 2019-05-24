const { assignDefaults } = require('./_utils')

module.exports = function okta (strategy) {
  const DEFAULTS = {
    _scheme: 'oauth2',

    // client_id, okta_domain, redirect_uri, and redirect_uri_after_logout
    // MUST each be set in the nuxt.config.js or .env file

    scope: 'openid profile email',

    response_type: 'id_token token',
    nonce: ``
  }

  const ENDPOINTS = {
    authorization_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/authorize`,

    userinfo_endpoint:
      `https://${strategy.domain}.okta.com/oauth2/v1/userinfo`,

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
