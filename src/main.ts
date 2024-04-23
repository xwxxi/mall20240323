import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
// 这里就是vite-plugin-pages生成的路由信息，正常使用即可
import router from "./router";
import "@/assets/css/reset.css";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const pinia = createPinia();

createApp(App).use(Antd).use(pinia).use(router).mount("#app");
