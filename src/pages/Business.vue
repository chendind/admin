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
              <img src="~assets/lena.png" class="ui mini rounded image">
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
        <tr><th colspan="4">
          <div class="ui right floated pagination menu">
            <a class="icon item">
              <i class="left chevron icon"></i>
            </a>
            <a class="item">1</a>
            <a class="item">2</a>
            <a class="item">3</a>
            <a class="item">4</a>
            <a class="icon item">
              <i class="right chevron icon"></i>
            </a>
          </div>
        </th>
      </tr></tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'bussiness',
  components: {
  },
  methods:{
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
   
  }
}
</script>

<style>

</style>
