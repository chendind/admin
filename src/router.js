import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'
Vue.use(VueRouter)

const routes = [
  	{ 
  		path: '/', 
  		components: {
  			default: Main
		}
	}
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})