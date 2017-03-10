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
          <router-link :to="{path: '/example/questionairePreview', query: {form: JSON.stringify(form)}}" target="_blank" class="ui primary button" style="margin-right: 10px;">
            预览
          </router-link>
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
            <a class="item" data-tab="a-second">布局</a>
            <a class="item" data-tab="a-third">Third</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="a-first">
            <div v-for="widget in formWidgets" class="ui secondary segment pd10 widget-item" title="拖拽控件至表单" draggable="true" @dragstart="dragstart($event, widget,'新增')" @dragend="dragend($event)">
              {{widget.label}}
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="a-second">
            <div v-for="layout in formLayouts" class="ui secondary segment pd10 widget-item" title="拖拽布局至表单" draggable="true" @dragstart="dragstart($event, layout,'新增')" @dragend="dragend($event)">
              {{layout.label}}
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="a-third">
            Third
          </div>
        </div>
        <div class="eight wide column form-container">
          <div class="ui segment form-view-wrapper" :style="{'background-image':'url('+form.backgroundImage+')'}">
            <div class="ui large header">{{form.title}}</div>
            <p>{{form.description}}</p>
            <!-- <field id="widget-control" class="widget-control" @dragenter="dragenter()" @dragover.prevent="dragover($event)" @drop="drop()"></field> -->
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
              <div class="field">
                <label>背景图设置</label>
                <div class="ui action input">
                  <input type="text" placeholder="请输入背景图url" v-model="form.backgroundImage">
                  <button class="ui button" @click="show('#questionaire-imageChooseModal', 'form.backgroundImage')">选择图片</button>
                </div>
              </div>
              <!-- <div class="field">
                <div class="inline field">
                  <div class="ui checkbox">
                    <input type="checkbox">
                    <label>背景图x向重复</label>
                  </div>
                  <div class="ui checkbox">
                    <input type="checkbox">
                    <label>背景图y向重复</label>
                  </div>
                </div>
              </div>
              <div class="field">
                <label>背景图对齐方式</label>
                <div class="ui selection dropdown">
                  <input type="hidden">
                  <i class="dropdown icon"></i>
                  <div class="text"></div>
                  <div class="menu">
                    <div class="item selected" data-value="1">中心对齐</div>
                    <div class="item" data-value="1">左上对齐</div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="b-second">
            <div class="ui warning message" v-if="focusIndex < 0">
              <p>请先选择控件</p>
            </div>
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
                <div class="field" v-if="key == 'value' && field.type == 'date'">
                  <label>默认值</label>
                  <input type="date" v-model="field.value">
                </div>
                <div class="field" v-else-if="key == 'value' && field.type == 'time'">
                  <label>默认值</label>
                  <input type="time" v-model="field.value">
                </div>
                <div class="field" v-else-if="key=='value'">
                  <label>默认值</label>
                  <input type="text" v-model="field.value">
                </div>
                <div class="field" v-if="key == 'children'">
                  <label>选项</label>
                  <div class="inline field" v-for="(child, $index) in value">
                    <div class="ui checkbox" :class="{'radio':field.type=='radio'||field.type == 'select'}">
                      <label>{{$index}}</label>
                      <input v-if="field.type == 'checkbox'" type="checkbox" :checked="child.checked" @change="field.callback.change($event,$index,field.children)">
                      <input v-else-if="field.type == 'radio'" type="checkbox" :checked="child.checked" @change="field.callback.change($event,$index,field.children)">
                      <input v-else-if="field.type == 'select'" type="checkbox" :checked="child.checked" @change="field.callback.change($event,$index,field)">
                    </div>
                    <input type="text" v-model="child.label" style="width: 150px;">
                    <input type="text" v-model="child.value" style="width: 60px;">
                    <i class="large plus square outline icon" @click="addChild(value,$index,{label: '选项', value: -1})"></i>
                    <i class="large minus square outline icon" @click="removeChild(value,$index)"></i>
                  </div>
                </div>
                <div class="field" v-if="key == 'orientation'">
                  <label>布局</label>
                  <div class="inline fields">
                    <div class="field">
                      <div class="ui radio checkbox">
                        <input type="radio" value="horizontal" v-model="field.orientation">
                        <label>横排</label>
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui radio checkbox">
                        <input type="radio" value="vertical" v-model="field.orientation">
                        <label>竖排</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field" v-if="key == 'maxLength'">
                  <label>图片数量上限</label>
                  <input type="number" v-model="field.maxLength">
                </div>
              </template>
            </div>
          </div>

        </div>
      </div>
    </div>
    <image-choose-modal id="questionaire-imageChooseModal" v-on:finishChoose="finishChoose" :target="imageChooseModalTarget"></image-choose-modal>
  </div>

</template>

<script>
import Vue from 'vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
// 表单控件工厂函数
const formWidgets = ()=>{
  return {
    input: {
      name: 'input', // 名字，值唯一
      tagName: 'input', // 标签名
      type: 'text',
      label: '文本输入框',//标签题目
      placeholder: '',
      value:'',
      required: true,
      orientation: 'vertical'
    },
    textarea: {
      name: 'textarea',
      tagName: 'textarea',
      type: 'text',
      label: '多行文本框',
      placeholder: '',
      value:'',
      required: true,
      rows: 3
    },
    radio: {
      name: 'radio',
      tagName: 'input',
      type: 'radio',
      label: '单选框',
      required: true,
      orientation: 'vertical',
      children: [
        {label: '选项1',value: '0',checked: false},
        {label: '选项2',value: '1',checked: false},
        {label: '选项3',value: '2',checked: false}
      ],
      callback: {
        change(event,index,children){
          children.map((_value,_index,_array)=>{
            if(_index == index){
              _value.checked = event.target.checked
            }
            else{
              _value.checked = false
            }
          })
        }
      }
    },
    checkbox: {
      name: 'checkbox',
      tagName: 'input',
      type: 'checkbox',
      label: '复选框',
      required: true,
      orientation: 'vertical',
      children: [
        {label: '选项1',value: '0',checked: false},
        {label: '选项2',value: '1',checked: false},
        {label: '选项3',value: '2',checked: false}
      ],
      callback: {
        change(event,index,children){
          children.map((_value,_index,_array)=>{
            if(_index == index){
              _value.checked = event.target.checked
            }
          })
        }
      }
    },
    select: {
      name: 'select',
      tagName: 'select',
      type: 'select',
      label: '下拉菜单',
      placeholder: '',
      value: '',
      required: true,
      orientation: 'vertical',
      children: [
        {label: '选项1',value: '0',checked: false},
        {label: '选项2',value: '1',checked: false},
        {label: '选项3',value: '2',checked: false}
      ],
      checkedIndex: -1,
      callback: {
        change(event,index,select){
          let checked = event.type == 'click' ? true : event.target.checked
          if(checked){
            select.checkedIndex = index
          }
          else{
            select.checkedIndex = -1
          }
          select.children.map((_value,_index,_array)=>{
            if(_index == index){
              _value.checked = checked
            }
            else{
              _value.checked = false
            }
          })
        }
      }
    },
    date: {
      name: 'date',
      tagName: 'input',
      type: 'date',
      label: '日期选择',
      placeholder: '',
      value:'',
      required: true,
      orientation: 'vertical'
    },
    time: {
      name: 'time',
      tagName: 'input',
      type: 'time',
      label: '时间选择',
      placeholder: '',
      value:'',
      required: true,
      orientation: 'vertical'
    },
    image: {
      name: 'image',
      tagName: 'input',
      type: 'file',
      label: '图片选择',
      value:[],
      required: true,
      api: '',//上传图片url地址
      maxLength: 1,
      callback: {
        click(event, field){
          var input = document.createElement("input")
          input.type = "file"
          input.accept="image/gif,image/jpeg,image/jpg,image/png,image/svg,image/tiff,image/bmp"
          if(field.maxLength>1){
            input.mutiple = "mutiple"
          }
          input.click()
          input.onchange = function(e){
            var file = this.files[0]
            var formData = new FormData()
            formData.append("file",file)

          }
        }
      }
    },
  }
};
// 表单布局工厂函数
const formLayouts = ()=>{
  return {
    'row-with-2-col':{
      name: 'row-with-2-col',
      label: '一行两列布局',
      size: 2,
      children: []
    },
    'row-with-3-col':{
      name: 'row-with-3-col',
      label: '一行三列布局',
      size: 3,
      children: []
    }
  }
}
export default {
  name: 'questionaire',
  components: {
    imageChooseModal,
    field: {
      data(){
        return {
          id: "example"
        }
      },
      render(h){
        return (<div class="ui form">
              <div class={{'focus': $index == focusIndex}} v-for="(field, $index) in form.fields" click="startEditField($index)" draggable="true" @dragstart="dragstart($event,field,'移动位置')">
                <div class="field widget slot" v-if="field.name == 'slot'" :data-name="field.name"></div>
                <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'input'" :data-name="field.name">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <input type="text" v-model="field.value" :placeholder="field.placeholder">
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="field widget" v-if="field.name == 'textarea'" :data-name="field.name">
                  <label>{{field.label}}</label>
                  <textarea :placeholder="field.placeholder" :rows="field.rows" v-model="field.value"></textarea>
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="fields widget" :class="{'grouped':field.orientation == 'vertical','inline':field.orientation == 'horizontal'}" v-if="field.name == 'checkbox'" :data-name="field.name">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="(child, $index) in field.children">
                    <div class="ui checkbox">
                      <input type="checkbox" class="hidden" :checked="child.checked" @change="field.callback.change($event,$index,field.children)">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="fields widget" :class="{'grouped':field.orientation == 'vertical','inline':field.orientation == 'horizontal'}" v-if="field.name == 'radio'" :data-name="field.name">
                  <label>{{field.label}}</label>
                  <div class="field" v-for="(child, $index) in field.children">
                    <div class="ui radio checkbox">
                      <input type="radio" class="hidden" :checked="child.checked" @change="field.callback.change($event,$index,field.children)">
                      <label>{{child.label}}</label>
                    </div>
                  </div>
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'select'" :data-name="field.name">
                  <label>{{field.label}}</label>
                  <div class="ui selection dropdown" id="selector">

                    <input type="hidden">
                    <i class="dropdown icon"></i>
                    <div class="text" :class="{'default':field.checkedIndex<0}">{{(field.checkedIndex<0)?field.placeholder:field.children[field.checkedIndex].label}}</div>
                    <div class="menu">
                      <template v-for="(child, $index) in field.children">
                        <div class="item" :class="{'active selected':child.checked}" :data-value="child.value" @click="field.callback.change($event,$index,field)">{{child.label}}</div>
                      </template>
                    </div>
                  </div>
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'date'" :data-name="field.name">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <input type="date" v-model="field.value" :placeholder="field.placeholder">
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'time'" :data-name="field.name">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <input type="time" v-model="field.value" :placeholder="field.placeholder">
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
                <div class="field widget" v-if="field.name == 'image'" :data-name="field.name">
                  <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
                  <div class="ui container after mv10">
                    <div class="ui center aligned segment imageUpload" @click="field.callback.click($event,field)">
                      <div style="position: relative;top: 15px;">
                        <i class="big plus icon"></i>
                        <br>
                        上传图片
                      </div>
                    </div>
                  </div>
                  <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
                </div>
              </div>
            </div>)
      }
    }
  },
  data () {
    return {
      dragingWidget: "",
      dragingType: "",
      formWidgets: formWidgets(),
      formLayouts: formLayouts(),
      fieldData: {
      },
      widgetAxes: [],
      form: {
        title: "表单标题",
        description: "表单描述",
        backgroundImage: "",
        model: {},
        fields: [
        ]
      },
      focusIndex: -1,
      slotIndex: -1,
      imageChooseModalTarget: "",
    }
  },
  watch: {
    'form.fields': {
      handler(new_val, old_val){
        Vue.nextTick(()=>{
          $('.ui.checkbox').checkbox()
          $('.ui.dropdown').dropdown("remove selected","")
          // 获得已放入表单中的组建的垂直对称轴y坐标，用于计算插入位置
          let widgets = $("#widget-control>div>.widget:not(.slot)")
          let axes = []
          $.each(widgets,function(index){
            let ceiling = $(this).position().top,
            outerHeight = $(this).outerHeight();
            axes.push({
              name: $(this).data('name'),
              quarterline_1: ceiling + outerHeight*1/4,
              quarterline_2: ceiling + outerHeight*2/4,
              quarterline_3: ceiling + outerHeight*3/4,
              ceiling: ceiling,
              floor: ceiling + outerHeight
            })
          })
          this.widgetAxes = axes
        })
      },
      deep: true
    },
    'slotIndex': function(new_slotIndex,old_slotIndex){
      this.removeSlot()
      // console.log('old:'+old_slotIndex, 'focus:'+this.focusIndex, 'new_slotIndex:'+new_slotIndex)
      // 在slotIndex的位置插入
      // 今日总结： focusIndex没必要这样做。应该用计算属性去做
      if(new_slotIndex > -1){
        let widgetIndex = this.form.fields.indexOf(this.dragingWidget)
        if(this.dragingType == '移动位置' && (widgetIndex == new_slotIndex || widgetIndex == new_slotIndex - 1)){
          // 如果是移动位置，当在自己上下两边移动的时候不出现slot
        }
        else{
          this.form.fields.splice(new_slotIndex, 0, {
            name: 'slot'
          })
        }

        if((old_slotIndex == -1 || old_slotIndex > this.focusIndex) && new_slotIndex <= this.focusIndex){
          this.focusIndex ++
        }
        else if(old_slotIndex != -1 && old_slotIndex < this.focusIndex && new_slotIndex >= this.focusIndex){
          this.focusIndex --
        }
      }
      else{
        if(old_slotIndex < this.focusIndex){
          this.focusIndex --
        }
      }
    }
  },
  computed: {
  },
  methods:{
    dragstart(event, widget, type){
      // event.dataTransfer.setData('dragingWidget', widget)
      // event.dataTransfer.setData('dragingType', type)
      this.dragingWidget = widget
      this.dragingType = type
    },
    dragenter(){

    },
    dragover(event){
      if(this.dragingType == '新增' || this.form.fields.length > 1){
        let y = event.pageY - $("#widget-control").offset().top
        let length = this.widgetAxes.length - 0
        if(!length){
          this.slotIndex = 0
        }
        else{
          for(let _index in this.widgetAxes){
            if(y>this.widgetAxes[length - 1]['quarterline_2']){
              this.slotIndex = length
              break
            }
            else if(y<this.widgetAxes[_index]['quarterline_2']){
              this.slotIndex = _index - 0
              break
            }
          }
        }
      }
    },
    drop(){
      var _slotIndex = this.slotIndex
      // 先移除slot，再插入widget
      this.dragend()

      let field
      if(this.dragingType === '新增'){
        // console.log(this.deepCopy(this.dragingWidget))
        this.form.fields.splice(_slotIndex, 0, this.deepCopy(this.dragingWidget))
      }
      else if(this.dragingType === '移动位置'){
        let _index = this.form.fields.indexOf(this.dragingWidget)
        this.form.fields.splice(_index, 1)
        if(_index < _slotIndex){
          _slotIndex --
        }
        this.form.fields.splice(_slotIndex, 0, this.dragingWidget)
      }
      this.dragingWidget = ""
      this.focusIndex = _slotIndex
    },
    dragend(event){
      if(this.slotIndex != -1){
        this.removeSlot()
        this.slotIndex = -1
      }
    },
    removeSlot(){
      for(let index in this.form.fields){
        if(this.form.fields[index].name == 'slot'){
          this.form.fields.splice(index, 1)
        }
      }
    },
    startEditField(index){
      this.focusIndex = index
    },
    removeField(fieldIndex){
      xy.confirm("您确定要删除这个控件吗？",(index)=>{
        if(index == 1){
          this.form.fields.splice(fieldIndex,1)
          this.focusIndex = -1
        }
      })
    },
    addChild(children,index,child){
      index = index-0+1
      children.splice(index,0,child)
    },
    removeChild(children,index){
      if(children.length > 1){
        children.splice(index,1)
      }
      else{
        xy.toast('再减就没了')
      }
    },
    deepCopy(object){
      return $.extend(true, {}, object)
    },
    show(selector, target){
      this.imageChooseModalTarget = target
      $(selector).modal('show')
    },
    finishChoose(target, src){
      eval('this.'+target+'="'+src+'"')
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
    position: relative;
    margin: 0 -1em !important;
    padding: 1em 2em 1em 1em !important;
    border-width: 1px;
    border-style: dashed;
    border-color: transparent;
    cursor: move;
    &:not(.slot):hover{
      border-color: #aaa !important;
    }
    .remove{
      display: none;
    }
  }
  .focus>.widget:not(.slot){
    border-color: #ddd;
    background-color: #fff8dc;
    .remove{
      display: block;
      cursor: pointer;
    }
  }
  .slot{
    height: 80px;
    border: 2px dashed #DB4040;
  }

}
.form-view-wrapper{
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.imageUpload{
  width: 120px;
  height: 120px;
  margin-right: 15px;
  float: left;
  color: #999;
  cursor: pointer;
  i.icon{
    margin-right: 0;
  }
}

</style>
