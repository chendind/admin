<template>

  <div>
    <div class="ui fixed menu">
      <div class="ui fluid container">
        <div class="item">
          <a class="ui logo icon image">
            <img style="width: 30px;" src="~assets/img/logo.png" alt="">
          </a>
          西柚表单生成器
        </div>
        <div class="right item">
          <button class="ui primary button" style="margin-right: 10px;">
            预览
          </button>
          <button class="ui positive button">
            保存并发布
          </button>
        </div>
      </div>
    </div>
    <div class="x-main-content">
      <div class="ui grid">
        <div class="three wide column">
          <div class="ui top attached tabular menu">
            <a class="item active" data-tab="a-first">控件</a>
            <a class="item" data-tab="a-second">Second</a>
            <a class="item" data-tab="a-third">Third</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="a-first">
            <div v-for="widget in formWidgets" class="ui secondary segment pd10 widget-item" title="拖拽控件至表单空白处" draggable="true" @dragstart="dragstart(widget.name)">
              {{widget.label}}
            </div>
            <!-- <div class="ui secondary segment pd10 widget-item" title="拖拽控件至表单空白处" draggable="true" @dragstart="dragstart()" >
              多行文本框
            </div> -->
          </div>
          <div class="ui bottom attached tab segment" data-tab="a-second">
            Second
          </div>
          <div class="ui bottom attached tab segment" data-tab="a-third">
            Third
          </div>
        </div>
        <div class="eight wide column form-container">
          <div class="ui segment form-view-wrapper">
            <div class="ui large header">{{form.title}}</div>
            <p>{{form.description}}</p>
            <div class="ui form widget-control" @dragenter="dragenter()" @dragover.prevent="dragover()" @drop="drop()">
              <div :class="{'focus': $index == focusIndex}" v-for="(field, $index) in form.fields" @click="startEditField($index)">
                <div class="field widget" v-if="field.name == 'input'">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <input type="text" v-model="field.value" :placeholder="field.placeholder">
                </div>
                <div class="field widget" v-if="field.name == 'textarea'">
                  <label>{{field.label}}</label>
                  <textarea :placeholder="field.placeholder" :rows="field.rows">{{field.value}}</textarea>
                </div>
                <div class="inline fields widget" v-if="field.name == 'checkbox'">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="child in field.children">
                    <div class="ui checkbox">
                      <input type="checkbox" :value="child.value" v-model="field.value" class="hidden">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                </div>
                <div class="inline fields widget" v-if="field.name == 'radio'">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="child in field.children">
                    <div class="ui radio checkbox">
                      <input type="radio" :value="child.value" v-model="field.value" class="hidden">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <template v-for="(field, $index) in form.fields">
                <div class="field" v-if="field.name == 'input'" @click="startEditField($index)">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <input type="text" v-model="field.value" :placeholder="field.placeholder">
                </div>
                <div class="field" v-if="field.name == 'textarea'" @click="startEditField($index)">
                  <label>{{field.label}}</label>
                  <textarea :placeholder="field.placeholder" :rows="field.rows">{{field.value}}</textarea>
                </div>
                <div class="inline fields" v-if="field.name == 'checkbox'" @click="startEditField($index)">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="child in field.children">
                    <div class="ui checkbox">
                      <input type="checkbox" :value="child.value" v-model="field.value" class="hidden">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                </div>
                <div class="inline fields" v-if="field.name == 'radio'" @click="startEditField($index)">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="child in field.children">
                    <div class="ui radio checkbox">
                      <input type="radio" :value="child.value" v-model="field.value" class="hidden">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                </div>
              </template> -->
            </div>
          </div>
        </div>
        <div class="five wide column">
          <div class="ui top attached tabular menu">
            <a class="item active" data-tab="b-first">表单设置</a>
            <a class="item" data-tab="b-second">控件设置</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="b-first">
            <div class="ui form">
              <div class="field">
                <label>表单标题</label>
                <input type="text" v-model="form.title" placeholder="请输入表单标题">
              </div>
              <div class="field">
                <label>表单描述</label>
                <textarea rows="3" v-model="form.description" placeholder="请输入表单描述"></textarea>
              </div>
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="b-second">
            <div class="ui form" v-for="(field,$index) in form.fields" v-show="$index == focusIndex">
                <template v-for="(value,key) in field">
                  <div class="field" v-if="key=='label'">
                    <label>标题</label>
                    <input type="text" v-model="field.label">
                  </div>
                  <div class="field" v-if="key=='placeholder'">
                    <label>提示语</label>
                    <input type="text" v-model="field.placeholder">
                  </div>
                  <div class="field" v-if="key=='required'">
                      <label>必填项目</label>
                      <div class="field">
                        <div class="ui checkbox">
                          <label>这个是必填项</label>
                          <input type="checkbox" v-model="field.required">
                        </div>
                      </div>
                  </div>
                  <div class="field" v-if="key == 'rows'">
                    <label>行数</label>
                    <input type="number" v-model="field.rows">
                  </div>
                  <div class="field" v-if="key=='value'">
                    <label>默认值</label>
                    <input type="text" v-model="field.value">
                  </div>
                  <div class="field" v-if="key == 'children'">
                    <label>选项</label>
                    <div class="inline field" v-for="(child,$index) in value">
                      <div class="ui checkbox" :class="{'radio':field.type=='radio'}">
                        <label>{{$index}}</label>
                        <input v-if="field.type == 'radio'" type="radio" v-bind:value="child.value" v-model="field.value">
                        <input v-if="field.type == 'checkbox'" type="checkbox" :value="child.value" v-model="field.value">
                      </div>
                      <input type="text" v-model="child.label" style="width: 120px;">
                      <input type="text" v-model="child.value" style="width: 60px;">
                      <i class="large plus square outline icon" @click="addChild(value,$index,{label: '选项', value: -1})"></i>
                      <i class="large minus square outline icon" @click="removeChild(value,$index,{label: '选项', value: -1})"></i>
                    </div>
                  </div>
                </template>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Vue from 'vue'
const formWidgets = ()=>{
  return {
    input: {
      name: 'input', //标签
      tagName: 'input',
      type: 'text',
      label: '文本输入框',//标签题目
      placeholder: '',
      value:'',
      required: true,
      callback: {
        input: "",
        focus: "",
        validate: ""
      }
    },
    textarea: {
      name: 'textarea', //标签
      tagName: 'textarea',
      type: 'text',
      label: '多行文本框',//标签题目
      placeholder: '',
      value:'',
      required: true,
      callback: {
        input: "",
        focus: "",
        validate: ""
      },
      rows: 3
    },
    radio: {
      name: 'radio', //标签
      tagName: 'input',
      type: 'radio',
      label: '单选框',//标签题目
      value:'0',
      required: true,
      callback: {
        input: "",
        focus: "",
        validate: ""
      },
      children: [
        {label: '选项1',value: '0'},
        {label: '选项2',value: '1'},
        {label: '选项3',value: '2'}
      ]
    },
    checkbox: {
      name: 'checkbox', //标签
      tagName: 'input',
      type: 'checkbox',
      label: '复选框',//标签题目
      value:["0","1"],
      required: true,
      callback: {
        input: "",
        focus: "",
        validate: ""
      },
      children: [
        {label: '选项1',value: '0'},
        {label: '选项2',value: '1'},
        {label: '选项3',value: '2'}
      ]
    }
  }
};


export default {
  name: 'questionaire',
  components: {
  },
  methods:{
    dragstart(name){
      this.dragingWidget = name;
    },
    dragenter(){

    },
    dragover(){
      console.log("dragover")
    },
    drop(){
      let field = Object.assign({},formWidgets()[this.dragingWidget])
      this.form.fields.push(field)
      Vue.nextTick(()=>{
        $('.ui.checkbox').checkbox()
      })
      this.dragingWidget = ""
      this.focusIndex = this.form.fields.length - 1
    },
    startEditField(index){
      this.focusIndex = index
    },
    addChild(children,index,child){
      index = index-0+1
      children.splice(index,0,child);
    }
  },
  data () {
    return {
      dragingWidget: "",
      formWidgets: formWidgets(),
      fieldData: {
      },
      form: {
        title: "",
        description: "",
        model: {},
        fields: [
        ]
      },
      focusIndex: -1
    }
  },
  mounted(){
    $('.tabular.menu .item').tab()
  }
}
</script>

<style lang='less' scoped>
.x-main-content{
  margin-top: 56px;
  padding: 15px;
}
.widget-item{
  border-style: dashed;
  box-shadow: none;
  cursor: move;
}
.widget-control{
  min-height: 300px;
  .widget{
    margin: 0 -1em !important;
    padding: 1em !important;
    border-width: 1px;
    border-style: dashed;
    border-color: transparent;
    &:hover{
      border-color: #aaa !important;
    }
  }
  .focus>.widget{
    border-color: #ddd;
    background-color: #fff8dc;
  }
}

</style>
