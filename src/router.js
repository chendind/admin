import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import Business from './components/Business.vue'
const Foo = { template: '<div>foo</div>' }
Vue.use(VueRouter);
const routes = [
  	{ 
  		path: '/', 
  		component: Main,
		children: [
		    {
		      // 当 /user/:id/profile 匹配成功，
		      // UserProfile 会被渲染在 User 的 <router-view> 中
		      path: 'business',
		      component: Business
		    }
		]
	}
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})