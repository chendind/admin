<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">用户</a>
        <i class="right angle icon divider"></i>
        <div class="active section">代理商管理</div>
      </div>
    </h1>
    <img id="expImage" src="~assets/img/default.png" class="ui small image" alt="">
    <div class="ui button" @click="show('#imageChooseModal')" style="margin-top: 10px;">
      选择一张图片
    </div>
    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>

  </div>

</template>

<script>
import imageChooseModal from 'components/ImageChooseModal.vue'
export default {
  name: 'bussiness',
  components: {
    'image-choose-modal': imageChooseModal
  },
  methods:{
    show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      console.log(src)
      $('#expImage').attr('src', src)
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

</style>
