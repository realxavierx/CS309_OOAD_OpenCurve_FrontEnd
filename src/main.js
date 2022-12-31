import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import vue3JsonExcel from "vue3-json-excel"
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(vue3JsonExcel)
app.use(router).use(VueAxios,axios).use(ElementPlus)
app.use(vue3videoPlay)
app.use(VueMarkdownEditor)
app.mount('#app')