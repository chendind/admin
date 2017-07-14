<template>

  <div>
    <div class="field widget" :class="{'inline':field.orientation == 'horizontal'}" v-if="field.name == 'input'" :data-name="field.name">
      <label>{{field.label}}<span v-if="!field.required">(选填)</span></label>
      <input type="text" v-model="field.value" :placeholder="field.placeholder">
      <i class="remove circle red icon absolute vertical" @click="removeField($index)"></i>
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

  }
}
</script>

<style scoped>

</style>
