import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyEventBus, AmplifyPlugin } from 'aws-amplify-vue'
import Vue from 'vue'

import awsConfig from '@/aws-exports'

Amplify.configure(awsConfig)

Vue.use(AmplifyPlugin, AmplifyModules)

export default ({ app }, inject) => {
  inject('Amplify', Amplify)
  inject('AmplifyEventBus', AmplifyEventBus)
  inject('graphql', (operation, vars = {}) => Amplify.API.graphql(AmplifyModules.graphqlOperation(operation, vars)))
}
