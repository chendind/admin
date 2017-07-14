import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import 'assets/less/index.less'
import 'assets/js/alert.js'

// 读取配置信息
import config from './config.js'
var root = new Vue({
  data: function(){
    return {
      config
    }
  },
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  mounted: function(){}
})




