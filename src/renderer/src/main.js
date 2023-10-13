import { createApp } from 'vue'
import App from './App.vue'

import { roverData } from './roverData.js'
import { GeneralFunctions } from './GeneralFunctions.js'

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(VueApexCharts);

//data handler script
app.config.globalProperties.$roverData = roverData;
app.config.globalProperties.$GeneralFunctions = GeneralFunctions;

app.mount('#app')
