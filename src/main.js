import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
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
app.use(ElementPlus);
app.use(AmplifyVue);
app.mount('#app');