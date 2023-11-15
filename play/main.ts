import { createApp } from 'vue'
import App from './App.vue'
import emui from '../packages/components/index'
// import '../packages/emui/style.css'
const app = createApp(App)
app.use(emui)
app.mount('#app')
