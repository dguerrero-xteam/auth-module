const { assignDefaults, addAuthorize } = require('./_utils')

module.exports = function github (strategy) {
  /* eslint-disable */
  console.log('okta strategy:', strategy)
  /* eslint-enable */
  const endpoints = {
    authorization_endpoint: `https://${strategy.domain}.okta.com/oauth2/v1/authorize`, // must already be logged in❓

    // authorization_endpoint: `https://${strategy.domain}.okta.com/oauth2/default/v1/authorize`, // sends me back to app 👍
    token_endpoint: `https://${strategy.domain}.okta.com/oauth2/token`,
    userinfo_endpoint: `https://${strategy.domain}.okta.com/oauth2/userinfo`
  }
  assignDefaults(strategy, {
    // client_id & okta_domain MUST be set in nuxt.config.js
    // _scheme: 'okta',

    client_id: process.env.OKTA_CLIENT_ID,
    nonce: ``,
    redirect_uri: process.env.OKTA_REDIRECT_URI,
    response_type: process.env.OKTA_RESPONSE_TYPE || 'id_token token',
    scope: process.env.VUE_APP_SCOPE || 'openid profile email',

    authorization_endpoint: endpoints.authorization_endpoint,
    token_endpoint: endpoints.token_endpoint,
    userinfo_endpoint: endpoints.userinfo_endpoint
  })

  // addAuthorize.call(this, strategy)
}
