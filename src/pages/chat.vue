<template lang="pug">
  v-container.fill-height
    v-card(
      height="100%"
      width="100%"
    ).d-flex.flex-column
      v-card-title Chat app with Amplify

      .flex-grow-1.chat__window
        .chat__content(
          ref="container"
        )
          v-container.px-4
            template(
              v-if="noMessages"
            )
              v-row(
                justify="center"
              )
                v-subheader No messages

            template(
              v-for="(message, i) in messages"
            )
              template(
                v-if="!!message.datetime"
              )
                v-row(
                  :key="`message-${i}-datetime`"
                  justify="center"
                )
                  v-subheader {{ message.datetime }}

              template(
                v-else-if="message.userName === userName"
              )
                v-row(
                  :key="`message-${i}-me`"
                  justify="end"
                )
                  v-col.chat__message
                    v-card(
                      :color="message.loading ? 'grey' : 'primary'"
                      :disabled="message.loading"
                      flat
                      loader-height="8"
                      :loading="message.loading ? 'primary': false"
                      :min-width="message.loading ? 200 : undefined"
                    )
                      v-card-text {{ message.content }}

              template(
                v-else
              )
                v-row(
                  :key="`message-${i}-name`"
                  justify="start"
                )
                  v-col.chat__username
                    v-subheader {{ message.userName }}

                v-row(
                  :key="`message-${i}-content`"
                  justify="start"
                )
                  v-col.chat__message
                    v-avatar(
                      color="accent"
                    ) {{ message.userName | initial }}

                  v-col.chat__message.ml-n2
                    v-card(
                      color="white"
                      flat
                      light
                    )
                      v-card-text {{ message.content }}

            template(
              v-if="postingMessage"
            )
              v-row(
                justify="end"
              )
                v-col.chat__message
                  v-card(
                    color="grey"
                    disabled
                    flat
                    loader-height="8"
                    loading="primary"
                    :min-width="200"
                  )
                    v-card-text {{ postingMessage.content }}

      v-card-actions.px-4
        .chat__actions
          v-alert(
            outlined
            type="error"
            :value="!!error"
          ) {{ error }}

          v-text-field(
            v-model="content"
            append-icon="mdi-send"
            hide-details
            outlined
            placeholder="Type a message (press Enter to send)"
            rounded
            single-line
            @keydown.enter.native="sendMessage"
          )
</template>

<script>
import { createMessage } from '@/graphql/mutations'
import { listMessagesSortedByCreatedAt } from '@/graphql/queries'
import { onCreateMessage } from '@/graphql/subscriptions'

export default {
  filters: {
    initial (val) {
      return String(val).toUpperCase().substr(0, 2)
    }
  },

  data () {
    return {
      content: '',
      error: '',
      messages: [],
      noMessages: false,
      postingMessage: undefined,
      subscription: {
        unsubscribe: () => {}
      },
      userName: ''
    }
  },

  async mounted () {
    await this.getUserName()
    await this.fetch()
    this.subscribe()
  },

  updated () {
    this.scrollToBottom()
  },

  beforeDestroy () {
    this.subscription.unsubscribe()
  },

  methods: {
    async fetch () {
      try {
        const result = await this.$graphql(listMessagesSortedByCreatedAt, {
          chatRoom: 'default',
          limit: 100
        })

        this.messages = result.data.listMessagesSortedByCreatedAt.items
        this.noMessages = this.messages.length === 0
      } catch (error) {
        this.error = error
      }
    },

    async getUserName () {
      try {
        const session = await this.$Amplify.Auth.currentAuthenticatedUser()

        this.userName = session.username
      } catch (error) {
        this.error = error
      }
    },

    onNewMessage (event) {
      const message = event.value.data.onCreateMessage

      this.messages.push(message)

      const newMessage = !!this.postingMessage &&
        this.postingMessage.id === message.id

      if (newMessage) {
        this.postingMessage = false
      }
    },

    scrollToBottom () {
      const container = this.$refs.container

      container.scrollTop = container.scrollHeight
    },

    async sendMessage (event) {
      if (event.keyCode !== 13) {
        return
      }

      const message = {
        chatRoom: 'default',
        userName: this.userName,
        content: this.content
      }

      try {
        this.postingMessage = message
        this.content = ''

        const result = await this.$graphql(createMessage, {
          input: message
        })

        this.postingMessage = result.data.createMessage
      } catch (error) {
        this.error = error
        this.content = message.content
        this.postingMessage = false
      }
    },

    subscribe () {
      this.subscription = this.$graphql(onCreateMessage).subscribe({
        next: this.onNewMessage
      })
    }
  }
}
</script>

<style lang="sass">
.chat
  &__window
    background: rgba(white, 0.08)
    box-shadow: 0 2px 2px 0 rgba(black, 0.5) inset
    position: relative

  &__content
    bottom: 0
    left: 0
    overflow: auto
    position: absolute
    right: 0
    top: 0

  &__message
    flex: 0 1 auto
    max-width: calc(100% - 72px)
    width: auto

    .v-card
      border-radius: 16px !important

      .v-card__text
        font-size: $font-size-root

  &__username
    flex: 0 1 auto
    margin-bottom: -8px
    margin-left: 76px
    margin-top: 16px
    padding: 0
    width: auto

    .v-subheader
      height: auto

  &__actions
    width: 100%
</style>
