import Vue from 'vue'
import router from './router/index.js'
import 'assets/less/index.less'
$(()=>{
	require('../static/semantic/semantic.js')
  require('../static/js/alert.js')
	var root = new Vue({
	  el: '#app',
	  router,
	  mounted: function(){}
	})
})




