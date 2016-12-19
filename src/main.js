// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var jQuery = require('jquery')
var jQuery = require('jquery')
window.jQuery = window.$ = jQuery

import Vue from 'vue'
import router from './router'
import '../semantic/src/semantic.less'

jQuery(()=>{
	require('../semantic/dist/semantic.min.js')
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
