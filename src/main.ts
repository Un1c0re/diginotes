import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {storePlugin} from "pinia-plugin-store";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();


const plugin = storePlugin({
    stores: ["DeskStore"],
    storage: localStorage,
})

pinia.use(plugin);
app.use(pinia);
app.use(router);

app.mount('#app')
