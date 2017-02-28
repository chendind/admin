<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">例子</a>
        <i class="right angle icon divider"></i>
        <div class="active section">表单：图片选择器</div>
      </div>
    </h1>
    <div class="ui form">
      <div class="fields">
        <div class="six wide field">
          <label>文章图片</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="img1">
            <button class="ui button" @click="show('#imageChooseModal', 'img1')">选择图片</button>
          </div>
          <img :src="img1" v-show="img1" class="ui image small mv10">
        </div>
      </div>
    </div>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img2 || require('assets/img/default.png')">
            <div class="ui container center aligned">
              <button class="ui primary button mv10" @click="show('#imageChooseModal','img2')">
                选择一张图片
              </button>
            </div>
        </div>
        <div class="content">
        </div>
      </div>
    </div>

    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose" :target="target"></image-choose-modal>

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
    show(selector, target){
      this.target = target
      $(selector).modal('show')
    },
    finishChoose(target, src){
      eval('this.'+target+'="'+src+'"')
    }
  },
  data () {
    return {
      target: "",
      img1: "",
      img2: ""
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
