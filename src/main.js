import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { createApp } from 'vue'
import App from './App.vue'


import AmplifyVue from '@aws-amplify/ui-vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrash)


const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(AmplifyVue);
app.mount('#app');