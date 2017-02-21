<template>

  <div>
    <div class="sticky-content">
      <div class="ui left rail">
        <div class="ui sticky fixed top">
          <!-- <div style="width: 100px;height: 100px;background-color: red"></div>
          <div style="width: 100px;height: 100px;background-color: green"></div>
          <div style="width: 100px;height: 100px;background-color: yellow"></div>
          <div style="width: 100px;height: 100px;background-color: blue"></div>
          <div style="width: 100px;height: 100px;background-color: red"></div>
          <div style="width: 100px;height: 100px;background-color: green"></div>
          <div style="width: 100px;height: 100px;background-color: yellow"></div>
          <div style="width: 100px;height: 100px;background-color: blue"></div> -->
          <div class="ui accordion vertical menu" style="">
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
                  semantic: sticky测试
                </router-link>
              </div>
            </div>
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
                  semantic: sticky测试
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div id="context">
        <div style="height: 1200px"></div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: '',
  components: {
  },
  methods:{
  },
  data () {
    return {}
  },
  mounted(){
    $(".accordion").accordion({
      exclusive: false,
      onChange: function(){
        $('.ui.sticky').sticky({
          context: '#context'
        })
      }
    })
    $('.ui.sticky').sticky({
      context: '#context'
    })
  }
}
</script>

<style scoped>
.sticky-content{
  position: absolute;
  right: 0;
  left: 328px;
}
</style>
