// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var jQuery = require('jquery')
var jQuery = require('jquery')
window.jQuery = window.$ = jQuery

import Vue from 'vue'
import router from './router'
import '../static/semantic/src/semantic.less'
require.context(
  'file?name=[path][name].[ext]&context=node_modules/tinymce!tinymce',
  true,
  /.*/
);
jQuery(()=>{
	require('../static/semantic/dist/semantic.min.js');

	new Vue({
	  el: '#app',
	  router,
	  mounted: function(){}
	})
})




