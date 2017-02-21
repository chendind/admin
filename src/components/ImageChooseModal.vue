<!--
ImageChooseModal 图片选择器使用介绍
1 完成选择：完成图片选择，点击确定后，发送事件`finishChoose`，并传入2个参数target和src，target为父组件中图片路径存储的变量路径，如imgage或image.url
 -->
<template>
  <div class="ui modal">
    <div class="ui inverted dimmer frontest" :class="{active: !uploaded}">
      <div class="ui text loader">图片上传中</div>
    </div>
      <i class="close icon"></i>
      <div class="header">
        选择图片
      </div>
      <div class="content">
        <div class="ui tiny images">
          <div v-for="(image, index) in images" class="ui small image" :class="{'disabled': index != checkedIndex}" :style="{backgroundImage: 'url('+image.src+')'}" @click="toggle(index)">

          </div>
        </div>
      </div>
      <div class="actions">
        <pagination v-if="total" :id="paginationId" css="ui floated pagination menu" :current="1" :total="total" :show="show" v-on:pageChange="pageChange"></pagination>
        <div class="ui deny button">
          取消
        </div>
        <div class="ui teal right labeled icon button" @click="uploadNewImage()">
          上传一张新图片
          <i class="plus icon"></i>
        </div>
        <div class="ui positive right labeled icon button" @click="finishChoose()">
          确定
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>
</template>

<script>
var __src = "http://www.xiyoukeji.com/images/logo_xs.gif"
var paginationId = 0
export default {
  name: 'image-choose-modal',
  props: {
    target: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      paginationId: `image-choose-modal-pagination-${paginationId++}`,
      images: [],
      checkedIndex: -1,
      uploaded: true,
      total: 0,
      show: 20,
    }
  },
  methods: {
    toggle(index){
      this.checkedIndex = index;
    },
    finishChoose(){
      if(this.checkedIndex == -1 || !this.target){
        return;
      }
      this.$emit('finishChoose', this.target, this.images[this.checkedIndex].src)
    },
    uploadNewImage(){
      var self = this;
      var input = document.createElement("input")
      input.type = "file"
      input.accept="image/*"
      // input.mutiple = "mutiple"
      input.click()
      input.onchange = function(e){
        var file = this.files[0]
        var formData = new FormData()
        formData.append("file",file)
        console.log(file)
        self.uploaded = false
        setTimeout(()=>{
          self.uploaded = true
          self.images.push({
            "src": __src
          });
          self.checkedIndex = 0;
        },500)
      }
    },
    pageChange(index){
      console.log(idnex)
    }
  },
  mounted(){
    setTimeout(()=>{
      this.images = [
        {
          "src": __src
        },
        {
          "src": __src
        },
        {
          "src": __src
        },
        {
          "src": __src
        }
      ]
    },500)
  }
}
</script>

<style scoped>
.images .image{
  cursor: pointer;
  background-position: center;
  background-size: contain;
  height: 80px !important;
  width: 80px !important;
}

img.ui.bordered.image{
  border-color: #21BA45;
}
</style>
