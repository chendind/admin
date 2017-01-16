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
        <div class="nine wide column form-container">
          <div class="ui padded segment form-view-wrapper">
            <div class="ui large header">Second header</div>
            <p>这是表单描述</p>
            <div class="ui form widget-control" @dragenter="dragenter()" @dragover.prevent="dragover()" @drop="drop()">
              <field v-for="(field, $index) in form.fields" :field="field" :startEditField="()=>{startEditField(field)}"></field>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui top attached tabular menu">
            <a class="item active" data-tab="b-first">控件设置</a>
            <a class="item" data-tab="b-second">表单设置</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="b-first">
            <!-- <div class="ui form"> -->
              <!-- <field-setting :field="fieldData"></field-setting> -->
              <!-- <div class="field" v-for="key in fieldData">

                <label>标题</label>
                <input type="text">
              </div> -->
            <!-- </div> -->
            <div class="ui form" v-for="field in form.fields">
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
                </template>
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="b-second">
            Second
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Vue from 'vue'
const formWidgets = {
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
    placeholder: '',
    value:'',
    required: true,
    callback: {
      input: "",
      focus: "",
      validate: ""
    },
    children: [
      {label: '选项1',value: '选项1'},
      {label: '选项2',value: '选项2'},
      {label: '选项3',value: '选项3'}
    ]
  },
  checkbox: {
    name: 'checkbox', //标签
    tagName: 'input',
    type: 'checkbox',
    label: '复选框',//标签题目
    placeholder: '',
    value:'',
    required: true,
    callback: {
      input: "",
      focus: "",
      validate: ""
    },
    children: [
      {label: '选项1',value: '选项1'},
      {label: '选项2',value: '选项2'},
      {label: '选项3',value: '选项3'}
    ]
  }
}
export default {
  name: 'questionaire',
  components: {
    field: {
      render: function(h){
        var self = this
        var Field = self.field
        var childNodes = []
        if(Field.name == "textarea"){
          childNodes.push(h('label',Field.label+(Field.required==false?"(选填)":"")))
          childNodes.push(
            h(Field.tagName,
              {attrs:{type: Field.type, placeholder: Field.placeholder, rows: Field.rows}},
              Field.value
          ))
        }
        else if(Field.name == "radio" || Field.name == "checkbox"){
          var children = []
          children.push(h('label',Field.label+(Field.required==false?"(选填)":"")))
          for(var i in Field.children){
            children.push(
              h('div',{'class':{field: true}},[
                h('div',{'class':{ui: true, radio: (Field.type == "radio"), checkbox: true}},[
                    h('input',{attrs:{class: 'hidden',name:new Date()-0, type: Field.type, value: Field.children[i].value}}),
                    h('label',Field.children[i].label)
                  ])
              ]))
          }
          childNodes.push(h('div',{'class': {inline:true, fields:true}},children))
        }
        else{
          childNodes.push(h('label',Field.label+(Field.required==false?"(选填)":"")))
          childNodes.push(h(Field.tagName,{attrs:{type: Field.type, placeholder: Field.placeholder, value: Field.value}}))
        }
        return h(
          'div',
          {
            'class': {
              field: true
            },
            on: {
              click: self.startEditField
            },
          },
          childNodes
        )
      },
      props:{
        field: {
          type: Object,
          required: true
        },
        state: {
          type: String,
          required: false,
          default: 'build'
        },
        startEditField: {
          type: Function,
          required: false
        }
      }
    }
  },
  methods:{
    dragstart: function(name){
      this.dragingWidget = name;
    },
    dragenter: ()=>{

    },
    dragover: ()=>{
      console.log("dragover")
    },
    drop: function(){
      let field = Object.assign({},formWidgets[this.dragingWidget])
      this.form.fields.push(field)
      Vue.nextTick(function () {
        $('.ui.checkbox').checkbox()
      })
      this.dragingWidget = "";
    },
    startEditField: function(field){
      this.fieldData = field;

    }
  },
  data () {
    return {
      dragingWidget: "",
      formWidgets: formWidgets,
      fieldData: {
      },
      form: {
        model: {},
        fields: [
        ]
      }
    }
  },
  mounted(){
    $('.tabular.menu .item').tab()
  }
}
</script>

<style scoped>
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
}
</style>
