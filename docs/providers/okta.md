# Okta Provider

[Source Code](https://github.com/nuxt-community/auth-module/blob/dev/lib/providers/okta.js)

**_NOTE: The Okta Provider only supports SPA mode with redirects to Okta for login and logout._**

## Usage

### 1. Create an `.env` file with the following information
```bash
#
# MANDATORY variables
#

# OKTA_DOMAIN
# the unique portion of your okta url, e.g.
# https://dev-012345-admin.okta.com
OKTA_DOMAIN='dev-012345'

# OKTA_CLIENT_ID
# the Client ID set by Okta
# Can be located under:
# Applications >> <app> >> General >> Client Credentials
OKTA_CLIENT_ID='0abcde1fgHIjk2lMn345'

# OKTA_REDIRECT_URI
# is the uri Okta will redirect the user to upon login
# _MUST_ also be set in Okta's 
# Applications >> <app> >> General >> Logout redirect URIs
OKTA_REDIRECT_URI='http://localhost:8081/implicit/callback'

# OKTA_REDIRECT_URI_ON_LOGOUT
# is the uri Okta will redirect the user to upon logout
# _MUST_ also be set in Okta's 
# Applications >> <app> >> General >> Logout redirect URIs
OKTA_REDIRECT_URI_ON_LOGOUT='http://localhost:8081/login'



#
# OPTIONAL variables
# values shown below are the default values
#

# OKTA_SCOPE
# Oauth2 scopes that are supported by the app
# _MUST_ also be included in Okta's 
# Applications >> <app> >> General >> Scopes
OKTA_SCOPE='openid profile email'
```

### 2. Add the following section to the `nuxt.config.js` file
```js
auth: {
  strategies: {
    okta: {
      domain: process.env.OKTA_DOMAIN,
      client_id: process.env.OKTA_CLIENT_ID,
      redirect_uri: process.env.OKTA_REDIRECT_URI,
      redirect_uri_after_logout: process.env.OKTA_REDIRECT_URI_ON_LOGOUT,
      scope: process.env.OKTA_SCOPE // optional
    }
  }
}
```

### 3. Create the following `/implicit/callback.vue` file in `pages` directory

```js
<template>
<div class="container">
  <p class="container-msg">Logging in...</p>
</div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false
  },

  mounted() {
    const hashObj = this.$route.hash.substring(1).split('&')
      .reduce( (obj, str) => {
        const parts = str.split('='); obj[parts[0]] = parts[1]; return obj }
        , {}
      )
    this.$auth.$storage.setUniversal('id_token', hashObj.id_token)
  }
}
</script>


<style scoped>
.container {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-msg {
  font-size: 3em;
}
</style>
```

## 4. Anywhere in your application logic:

```js
this.$auth.loginWith('okta')
```

User will be redirected to a page like this:

<img align="center" src="../images/okta_login_redirect.png">


### Obtaining `client_id`, `domain`, and `audience`

Your application needs some details about this client to communicate with Okta.

`OKTA_DOMAIN` and `OKTA_CLIENT_ID` are **REQUIRED** and **SET BY OKTA**.

`OKTA_REDIRECT_URI` and `OKTA_REDIRECT_URI_ON_LOGOUT` are **REQUIRED** and **MUST BE SET IN YOUR OKTA ACCOUNT**.

`OKTA_SCOPE` is optional and defaults to `'openid profile email'`.

You can get your `OKTA_DOMAIN`, `OKTA_CLIENT_ID`, `OKTA_REDIRECT_URI`, and `OKTA_REDIRECT_URI_ON_LOGOUT`, can all be accessed or set in your Okta admin site, on the "Applications" tab, and then your specific application's "General" sub-tab.

<img align="center" src="../images/YOUR_OKTA_DOMAIN--settings.png">
