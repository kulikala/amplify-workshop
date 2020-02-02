<template lang="pug">
  v-container
    h1 {{ message }}

    v-btn(
      nuxt
      to="/"
    ) Home
</template>

<script>
export default {
  layout: 'empty',

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  computed: {
    message () {
      return this.error.statusCode === 404 ? '404 Not Found' : 'An error occurred'
    }
  },

  head () {
    return {
      title: this.message
    }
  }
}
</script>
