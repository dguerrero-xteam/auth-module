<template>
<div class="container d-flex align-items-center justify-content-center flex-column">
  <img src="~/assets/loading.svg" alt="Loading..." width="80px" />
  Logging in...
</div>
</template>

<script>
export default {
  mounted() {
    const hashObj = this.$route.hash.substring(1).split('&')
      .reduce( (obj, str) => {
        const parts = str.split('='); obj[parts[0]] = parts[1]; return obj }
        , {}
      )
    console.info('hashObj:', hashObj)
    this.$auth.$storage.setUniversal('id_token', hashObj.id_token)
  }
}
</script>


<style scoped>
.container {
  min-height: 70vh;
}
</style>
