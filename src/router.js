import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main.vue'
import Login from './Login.vue'
import Form from './pages/Form.vue'
import Business from './pages/Business.vue'
import FormImageUpload from './pages/FormImageUpload.vue'
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
		    },
		    {
		    	path: 'form',
		    	component: Form
		    },
		    {
		    	path: 'formImageUpload',
		    	component: FormImageUpload
		    }
		]
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