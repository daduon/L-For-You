import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.scss';
import router from './router';
import * as components from "./components";


const app = createApp(App);

// Registration global customer Components ;
for (const key of Object.keys(components)) {
    const component = (components as any)[key];
    app.component(component.name, component);
}

app.use(router);
app.mount('#app');
