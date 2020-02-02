<template lang="pug">
  v-app-bar(
    app
    dense
  )
    v-tabs
      v-tab(
        v-for="(link, i) in links"
        :key="i"
        nuxt
        :to="link.href"
      ) {{ link.title }}

    v-spacer

    v-subheader.flex-shrink-0.mr-4 Welcome {{ userName }}

    amplify-sign-out.mt-3
</template>

<script>
export default {
  data () {
    return {
      userName: ''
    }
  },

  computed: {
    links () {
      return [
        {
          href: '/ai',
          title: 'AI'
        },
        {
          href: '/chat',
          title: 'Chat'
        },
        {
          href: '/analytics',
          title: 'Analytics'
        },
        {
          href: '/webpush',
          title: 'Web Push'
        }
      ]
    }
  },

  mounted () {
    this.getUserName()
  },

  methods: {
    async getUserName () {
      try {
        const session = await this.$Amplify.Auth.currentAuthenticatedUser()

        this.userName = session.username
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>
