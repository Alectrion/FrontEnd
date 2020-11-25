import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';




import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';
import InputSwitch from 'primevue/inputswitch';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import OrderList from 'primevue/orderlist';
import OverlayPanel from 'primevue/overlaypanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TabMenu from 'primevue/tabmenu';
import * as VueGoogleMaps from "vue2-google-maps";


Vue.config.productionTip = false
Vue.component('DataTable', DataTable)
Vue.component('Column', Column);
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Menubar', Menubar);
Vue.component('Dialog', Dialog);
Vue.component('Dropdown', Dropdown);
Vue.component('MultiSelect', MultiSelect);
Vue.component('Chart', Chart);
Vue.component('ProgressBar', ProgressBar);
Vue.component('InputSwitch', InputSwitch);
Vue.component('Textarea', Textarea);
Vue.component('RadioButton', RadioButton);
Vue.component('OrderList', OrderList);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel );
Vue.component('TabMenu', TabMenu);
Vue.component('Dataview', DataView);


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDp3Ud3SixagW8bJOwtosy5bBMB5JRNS_k",
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
