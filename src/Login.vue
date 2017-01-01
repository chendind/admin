<template>
	<div class="bg">
		<div class="ui middle aligned center aligned grid" style="height: 80%;">
		  <div class="column" style="max-width: 350px;">
		    <h2 class="ui teal image header">
		      <img src="~assets/logo.png" class="image">
		      <div class="content">
		        西柚科技后台管理系统
		      </div>
		    </h2>
		    <div class="ui large form">
		      <div class="ui stacked segment">
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
		            <input type="text" name="name" placeholder="用户名">
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="lock icon"></i>
		            <input type="password" name="password" placeholder="密码">
		          </div>
		        </div>
		        <div class="ui fluid large teal button" @click="login()">登录</div>
		      </div>

		      <div class="ui error message"></div>

		    </div>
		  </div>
		</div>
	</div>
		
</template>
<script>
export default {
  name: 'main',
  methods:{
  	login(){
  		window.location.hash = '/';
  	}
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
  	
  }
}
</script>

<style scoped>
.bg{
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url('~assets/home-bg.jpg');
	background-size: cover;
	background-position: center;
}
</style>