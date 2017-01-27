<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">用户</a>
        <i class="right angle icon divider"></i>
        <div class="active section">代理商管理</div>
      </div>
    </h1>
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Keywords Here...">
        <i class="search icon"></i>
      </div>
    </div>
    <table class="ui celled table">
      <thead>
        <tr><th>订单ID</th>
        <th>用户</th>
        <th>状态</th>
        <th>操作</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>
            10000000001
          </td>
          <td>
            <h4 class="ui image header">
              <img src="~assets/img/lena.png" class="ui mini rounded image">
              <div class="content">
                Lena
                <div class="sub header">id: 10001</div>
              </div>
            </h4>
          </td>
          <td>
            <span class="ui teal label">正常</span>
          </td>
          <td>
            <button class="ui red button toggle mini">禁用</button>
            <button class="ui blue button mini">详情</button>
          </td>
        </tr>
        <tr>
          <td>Cell</td>
          <td>Cell</td>
          <td>
            <span class="ui yellow label">过期</span>
          </td>
          <td>
            <button class="ui green button toggle mini">启用</button>
            <button class="ui blue button mini">详情</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">
            <pagination id="pagination" current="1" total="1000" show="10" v-on:pageChange="pageChange"></pagination>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Pagination from 'components/pagination/Pagination.vue'

export default {
  name: 'bussiness',
  components: {
    Pagination,
  },
  data () {
    return {

    }
  },
  methods:{
    pageChange(page){
      console.log(page)
    },

  },
  events: {
      'pageChange': function(page){
        console.log(page)
      }
  },
  mounted(){

  }
}
</script>

<style>

</style>
