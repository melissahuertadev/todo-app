import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { createApp } from 'vue'
import App from './App.vue'
import AmplifyVue from '@aws-amplify/ui-vue';

const app = createApp(App);
app.use(AmplifyVue);
app.mount('#app');