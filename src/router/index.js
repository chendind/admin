/*
* 页面命名一律采取驼峰式
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from 'pages/Main.vue'
import Login from 'pages/Login.vue'
import example from './example.js'
Vue.use(VueRouter);
const routes = [
  	{
  		path: '/',
  		component: Main,
		  children: [
        example
      ]
  	},
    {
      path: '/example/questionaire',
      component(r){
        r(require('pages/example/questionaire.vue'))
      }
    },
    {
      path: '/example/questionairePreview',
      component(r){
        r(require('pages/example/questionairePreview.vue'))
      }
    },
    {
      path: '/example/sticky',
      component(r){
        r(require('pages/example/sticky.vue'))
      }
    },
  	{
  		path: '/login',
  		component: Login,
		  children: []
  	}
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})
