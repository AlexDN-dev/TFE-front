import { createApp } from 'vue'
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faRoad, faCalendar, faGaugeHigh, faLocationDot, faCarBattery, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from'./router/index'

library.add(faUserSecret, faRoad, faCalendar, faGaugeHigh, faLocationDot, faCarBattery, faTriangleExclamation)

const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
