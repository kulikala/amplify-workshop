<template lang="pug">
  v-app(
    dark
  )
    app-header(
      v-if="!noAuth"
    )

    v-content
      v-container.d-flex.align-center.fill-height.justify-center(
        v-if="noAuth"
      )
        amplify-authenticator
      nuxt(
        v-else
      )
</template>

<script>
import AppHeader from '@/components/app/Header'

export default {
  components: {
    AppHeader
  },

  data () {
    return {
      noAuth: true
    }
  },

  created () {
    this.initEvents()
    this.checkSession()
  },

  beforeDestroy () {
    this.disposeEvents()
  },

  methods: {
    authStateChanged (info) {
      switch (info) {
        case 'signedIn':
        case 'signedOut':
          this.checkSession()
      }
    },

    async checkSession () {
      let result

      try {
        result = await this.$Amplify.Auth.currentAuthenticatedUser({
          bypassCache: true
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }

      const isLoggedIn = !!result

      this.noAuth = !isLoggedIn
    },

    disposeEvents () {
      this.$AmplifyEventBus.$off('authState', this.authStateChanged)
    },

    initEvents () {
      this.$AmplifyEventBus.$on('authState', this.authStateChanged)
    }
  }
}
</script>
