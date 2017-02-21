<!--
usage
<pagination v-if="total" id="pagination" :current="1" :total="total" :show="show" v-on:pageChange="pageChange"></pagination>
-->
<template>
    <div :id="id" :class="css"></div>
</template>

<script>
import './pagination.js'
export default {
  name: 'pagination',
  props: {
    css: {
      type: String,
      default: 'ui right floated pagination menu',
      required: false
    },
    id: {
      type: String,
      default: 'pagination',
      required: true
    },
    current: {
      default: 1,
      required: false
    },
    total: {
      default: 50,
      required: true
    },
    show: {
      default: 10,
      required: false
    }
  },
  methods: {

  },
  data () {
    return {
    }
  },
  mounted(){
    // debugger
    $("#"+this.id).pagination({
      totalData: this.total-0,
      showData: this.show-0,
      current: this.current-0,
      count:2,
      jump:true,
      coping:true,
      callback:(pagination)=>{
        this.$emit('pageChange', pagination.getCurrent())
      }
    })
  }
}
</script>

<style scoped>

</style>
