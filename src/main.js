import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限



Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.filter('format',(val)=>{
  if(val==""||val==null){
    val=0;
  }
  const time=new Date(parseInt(val));
  const year=time.getFullYear();
  let month=time.getMonth()+1;
  month=(month<10)?"0"+month:month;
  let date=time.getDate();
  date=(date<10)?"0"+date:date;
  let hour=time.getHours();
  hour=(hour<10)?"0"+hour:hour;
  let minute=time.getMinutes();
  minute=(minute<10)?"0"+minute:minute;
  let second=time.getSeconds();
  second=(second<10)?"0"+second:second;
  /* const format=year+'-'+month+'-'+date+'\u0020\u0020'+hour+':'+minute+':'+second;*/
  const format=year+'-'+month+'-'+date;
  return format;
});
Vue.filter('accformat',(val)=>{
  if(val==""||val==null){
    val=0;
  }
  const time=new Date(parseInt(val));
  const year=time.getFullYear();
  let month=time.getMonth()+1;
  month=(month<10)?"0"+month:month;
  let date=time.getDate();
  date=(date<10)?"0"+date:date;
  let hour=time.getHours();
  hour=(hour<10)?"0"+hour:hour;
  let minute=time.getMinutes();
  minute=(minute<10)?"0"+minute:minute;
  let second=time.getSeconds();
  second=(second<10)?"0"+second:second;

  /* const format=year+'-'+month+'-'+date+'\u0020\u0020'+hour+':'+minute+':'+second;*/
  const format=year+'-'+month+'-'+date+"  "+hour+":"+minute+":"+second;
  return format;
});









