<template>
  <div>
    <div class="ui fixed menu">
      <div class="ui fluid container">
        <div class="item">
          <a class="ui logo icon image">
            <img style="width: 30px;" src="~assets/img/logo.png" alt="">
          </a>
          西柚后台管理系统
        </div>
        <div class="item right">
          <div id="userDrapdown" class="ui inline dropdown">
            <div class="title">
              <img class="ui avatar image" style="width: 30px;" src="~assets/img/eve.png" alt="">
              小柚子
              <i class="dropdown icon"></i>
            </div>
            <div id="userMenu" class="menu" tabindex="-1">
              <div class="item">
                <i class="settings icon"></i>
                帐号设置
              </div>
              <router-link to="/login" class="item">
                <i class="sign out icon"></i>
                退出登录
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="x-main-content">
      <div class="ui sidebar sticky accordion vertical menu left visible floated" style="">
        <div class="item">
          <a class="title"><i class="dropdown icon"></i> <b>例子</b></a>
          <div class="content menu">
            <router-link to="/example/table" class="item">
              表格：默认实现
            </router-link>
            <router-link to="/example/vuetable" class="item">
              表格：vuetable实现
            </router-link>
            <router-link to="/example/form" class="item">
              表单：文本输入与tinymce
            </router-link>
            <router-link to="/example/formImageUpload" class="item">
              表单：图片选择器
            </router-link>
            <router-link to="/example/article" class="item">
              文章：图文
            </router-link>
            <router-link to="/example/questionaire" class="item">
              问卷生成器
            </router-link>
            <router-link to="/example/sticky" class="item">
              semantic测试
            </router-link>
          </div>
        </div>
      </div>
      <div class="ui fluid floated" style="margin-left: 280px;">
          <router-view></router-view>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'main',
  methods:{
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    $(".accordion").accordion()
    $("#userDrapdown").dropdown()
  }
}
</script>

<style>
.x-main-content{
  margin-top: 56px;
  padding: 15px;
}
</style>
