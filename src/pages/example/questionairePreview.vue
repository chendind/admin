<template>

  <div>
    <div class="ui segment form-view-wrapper" :style="{'background-image':'url('+form.backgroundImage+')'}">
      <div class="ui large header">{{form.title}}</div>
      <p>{{form.description}}</p>
      <div id="widget-control" class="ui form widget-control">
        <div v-for="(field, $index) in form.fields">
          <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'input'" :data-name="field.name">
            <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
            <input type="text" v-model="field.value" :placeholder="field.placeholder">
          </div>
          <div class="field widget" v-if="field.name == 'textarea'" :data-name="field.name">
            <label>{{field.label}}</label>
            <textarea :placeholder="field.placeholder" :rows="field.rows" v-model="field.value"></textarea>
          </div>
          <div class="fields widget" :class="{'grouped':field.orientation == 'vertical','inline':field.orientation == 'horizontal'}" v-if="field.name == 'checkbox'" :data-name="field.name">
            <label>{{field.label}}</label>
            <div class="field" v-for="(child, $index) in field.children">
              <div class="ui checkbox">
                <input type="checkbox" class="hidden" :checked="child.checked">
                <label>{{child.label}}</label>
              </div>
            </div>
          </div>
          <div class="fields widget" :class="{'grouped':field.orientation == 'vertical','inline':field.orientation == 'horizontal'}" v-if="field.name == 'radio'" :data-name="field.name">
            <label>{{field.label}}</label>
            <div class="field" v-for="(child, $index) in field.children">
              <div class="ui radio checkbox">
                <input type="radio" class="hidden" :checked="child.checked">
                <label>{{child.label}}</label>
              </div>
            </div>
          </div>
          <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'select'" :data-name="field.name">
            <label>{{field.label}}</label>
            <div class="ui selection dropdown">
              <input type="hidden">
              <i class="dropdown icon"></i>
              <div class="text" :class="{'default':field.checkedIndex<0}">{{field.checkedIndex<0?field.placeholder:field.children[field.checkedIndex].label}}</div>
              <div class="menu">
                <template v-for="(child, $index) in field.children">
                  <div class="item" :class="{'active selected':child.checked}" :data-value="child.value">{{child.label}}</div>
                </template>
              </div>
            </div>
          </div>
          <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'date'" :data-name="field.name">
            <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
            <input type="date" v-model="field.value" :placeholder="field.placeholder">
          </div>
          <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'time'" :data-name="field.name">
            <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
            <input type="time" v-model="field.value" :placeholder="field.placeholder">
          </div>
          <div class="field widget" v-if="field.name == 'image'" :data-name="field.name">
            <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
            <div class="ui container after mv10">
              <div class="ui center aligned segment imageUpload">
                <div style="position: relative;top: 15px;">
                  <i class="big plus icon"></i>
                  <br>
                  上传图片
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
export default {
  name: 'quetionairePreview',
  components: {
  },
  methods:{
  },
  data () {
    return {
      form: {
        title: "",
        description: "",
        backgroundImage: "",
        model: {},
        fields: [
        ]
      }
    }
  },
  mounted(){
    this.$data.form = JSON.parse(this.$route.query.form)
    Vue.nextTick(()=>{
      $('.ui.checkbox').checkbox()
      $('.ui.dropdown').dropdown()
    })

  }
}
</script>

<style scoped>
.form-view-wrapper{
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
