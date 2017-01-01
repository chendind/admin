// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var jQuery = require('jquery')
window.jQuery = window.$ = jQuery

import Vue from 'vue'
import router from './router'
import 'assets/css/semantic-overwrite.css'
jQuery(()=>{
	require('../static/semantic/dist/semantic.js');
	var root = new Vue({
	  el: '#app',
	  router,
	  mounted: function(){}
	})
})




