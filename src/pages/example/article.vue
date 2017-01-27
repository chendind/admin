<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">例子</a>
        <i class="right angle icon divider"></i>
        <div class="active section">文章发布</div>
      </div>
    </h1>
    <div class="ui form">
      <div class="field">
        <label>文章名称</label>
        <input type="text" placeholder="请输入文章名称">
      </div>
      <div class="fields">
        <div class="six wide field">
          <label>文章图片</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url">
            <button class="ui button" @click="show('#imageChooseModal')">选择图片</button>
          </div>
          <img :src="img.src" v-show="img.src" class="ui image small mv10">
        </div>
      </div>

      <div class="field">
        <label>摘要</label>
        <textarea rows="3"></textarea>
      </div>
      <div class="fields">
        <div class="field">
          <label>发布时间</label>
          <input type="date" value="2017-01-08" placeholder="商品类型">
        </div>
        <div class="field">
          <label>排序权重</label>
          <input type="number" placeholder="越大越靠前">
        </div>
      </div>
      <div class="field">
        <label>正文</label>
        <tinymce height="400">文章正文</tinymce>
      </div>
    </div>
    <h1>左图右输入模式</h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img.src || require('assets/img/default.png')" alt="">
            <div class="ui container center aligned">
              <button class="ui primary button mv10" @click="show('#imageChooseModal')">
                选择一张图片
              </button>
            </div>
        </div>
        <div class="content">
          <form class="ui form">
            <div class="field">
              <label>文章名称</label>
              <input type="text" name="shipping[first-name]" placeholder="请输入商品名称">
            </div>
            <div class="field">
              <label>摘要</label>
              <textarea rows="3"></textarea>
            </div>
            <div class="fields">
              <div class="field">
                <label>时间</label>
                <input type="date" value="2001-10-10" name="date" id="date" placeholder="商品类型">
              </div>
              <div class="field">
                <label>库存</label>
                <input type="text" placeholder="库存">
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>

</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
export default {
  name: '',
  components: {
    tinymce,
    imageChooseModal
  },
  methods:{
    show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      this.img.src=src
    }
  },
  data () {
    return {
      img: {
        src: ""
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
