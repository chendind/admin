<template>
    <div :id="id" class="ui right floated pagination menu"></div>  
</template>

<script>
import '../../static/pagination/pagination.js'
export default {
  name: 'pagination',
  props: ['id','current','total','show'],
  methods: {
    
  },
  data () {
    return {
    }
  },
  created: function(){
    
  },
  mounted: function(){
    var self = this;
    $("#"+this.id).pagination({
      totalData: self.total-0,
      showData: self.show-0,
      current: self.current-0,
      count:2,
      jump:true,
      coping:true,
      callback:function(pagination){
        self.$emit('pageChange', pagination.getCurrent())
      }
    })
  }
}
</script>

<style scoped>

</style>
