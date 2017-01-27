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
    <div :class="[{'vuetable-wrapper ui': true}, loading]">
      <vuetable  ref="vuetable"
          api-url="static/api/user.json"
          :fields="fields"
          pagination-path="pagination"
          :sort-order="sortOrder"
          :multi-sort="multiSort"
          :per-page="perPage"
          :append-params="moreParams"
          detail-row-component="my-detail-row"
          detail-row-id="id"
          detail-row-transition="expand"
          row-class-callback="rowClassCB"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:load-success="onLoadSuccess"
          @vuetable:loading="showLoader"
          @vuetable:loaded="hideLoader"
          @vuetable:cell-clicked="onCellClicked"
      ></vuetable>
      <div class="vuetable-pagination ui bottom attached segment grid">
        <vuetable-pagination-info ref="paginationInfo"
          :pagination-info-template="paginationInfoTemplate"
        ></vuetable-pagination-info>
        <component :is="paginationComponent" ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'components/vue-table/Vuetable.vue';
import VuetablePagination from 'components/vue-table/VuetablePagination.vue';
import VuetablePaginationDropdown  from 'components/vue-table/VuetablePaginationDropdown.vue';
import VuetablePaginationInfo from 'components/vue-table/VuetablePaginationInfo.vue'
Vue.component('custom-actions', {
  template: [
    '<div>',
      '<button class="ui red button mini" @click="onClick(\'view-item\', rowData)">查看</button>',
      '<button class="ui blue button mini" @click="onClick(\'edit-item\', rowData)">编辑</button>',
      '<button class="ui green button mini" @click="onClick(\'delete-item\', rowData)">删除</button>',
    '</div>'
  ].join(''),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick: function(action, data) {
      console.log('actions: on-click', data.name)
    }
  }
})
Vue.component('my-detail-row', {
  template: [
    '<div @click="onClick">',
      '<div class="inline field">',
        '<label>Name: </label>',
        '<span>{{rowData.name}}</span>',
      '</div>',
      '<div class="inline field">',
        '<label>Email: </label>',
        '<span>{{rowData.email}}</span>',
      '</div>',
      '<div class="inline field">',
        '<label>Nickname: </label>',
        '<span>{{rowData.nickname}}</span>',
      '</div>',
      '<div class="inline field">',
        '<label>Birthdate: </label>',
        '<span>{{rowData.birthdate}}</span>',
      '</div>',
      '<div class="inline field">',
        '<label>Gender: </label>',
        '<span>{{rowData.gender}}</span>',
      '</div>',
    '</div>'
  ].join(''),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick: function(event) {
      console.log('my-detail-row: on-click', event.target)
    }
  },
})
export default {
  name: 'bussiness',
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo,
  },
  data () {
    return {
      loading: '',
      searchFor: '',
      moreParams: {},
      fields: [
          '__sequence',
          '__checkbox:id',
          {
            name: 'id',
            title: '',
            dataClass: 'center aligned',
            callback: 'showDetailRow'
          },
          {
            name: 'name',
            title: 'Full Name',
            sortField: 'name'
          },
          {
            name: 'email',
            sortField: 'email',
            visible: true
          },
          {
            name: 'nickname',
            sortField: 'nickname',
            callback: 'allCap'
          },
          {
            name: 'birthdate',
            sortField: 'birthdate',
            callback: 'formatDate|D/MM/Y'
          },
          {
            name: 'gender',
            sortField: 'gender',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
            callback: 'gender'
          },
          {
            name: '__component:custom-actions',
            dataClass: 'center aligned'
          }
      ],
      sortOrder: [{
        field: 'name',
        direction: 'asc',
      }],
      multiSort: true,
      paginationComponent: 'vuetable-pagination',
      perPage: 10,
      paginationInfoTemplate: 'Showing record: {from} to {to} from {total} item(s)',
    }
  },
  watch: {
    'perPage' (val, oldVal) {
      this.$nextTick(function() {
        this.$refs.vuetable.refresh()
      })
    },
    'paginationComponent' (val, oldVal) {
      this.$nextTick(function() {
        this.$refs.pagination.setPaginationData(this.$refs.vuetable.tablePagination)
      })
    }
  },
  methods:{
    transform: function(data) {
      let transformed = {}
      let length = data.data.length
      transformed.pagination = {
        total: data.total,
        total: 200,
        per_page: data.per_page,
        per_page: length,
        current_page: 10,
        last_page: 20,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: (data.current_page-1)*length+1,
        to: (data.current_page)*length
      }

      transformed.data = []
      data = data.data
      for (let i = 0; i < data.length; i++) {
        transformed['data'].push({
          id: data[i].id,
          name: data[i].name,
          nickname: data[i].nickname,
          email: data[i].email,
          age: data[i].age,
          birthdate: data[i].birthdate,
          gender: data[i].gender,
          address: data[i].address.line1 + ' ' + data[i].address.line2 + ' ' + data[i].address.zipcode
        })
      }

      return transformed
    },
    showSettingsModal () {
      $('#settingsModal').modal({
        detachable: false,
        onVisible: function() {
          $('.ui.checkbox').checkbox()
        }
      }).modal('show')
    },
    showLoader: function() {
      this.loading = 'loading'
    },
    hideLoader: function() {
      this.loading = ''
    },
    getFieldTitle: function(field) {
      if (field.title !== '') return field.title

      if (field.name.slice(0, 2) === '__') {
        return field.name.indexOf(':') >= 0
          ? field.name.split(':')[1]
          : field.name.replace('__', '')
      }
    },
    allCap (value) {
      return value.toUpperCase()
    },
    formatDate (value, fmt) {
      if (value === null) return ''
      // fmt = (typeof(fmt) === 'undefined') ? 'D MMM YYYY' : fmt
      // return moment(value, 'YYYY-MM-DD').format(fmt)
      return 123
    },
    gender (value) {
      return value === 'M'
        ? '<span class="ui teal label"><i class="male icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="female icon"></i>Female</span>'
    },
    showDetailRow: function(value) {
      let icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'down' : 'right'
      return [
        '<a class="show-detail-row">',
            '<i class="chevron circle ' + icon + ' icon"></i>',
        '</a>'
      ].join('')
    },
    setFilter: function() {
      this.moreParams = {
        'filter': this.searchFor
      }
      this.$nextTick(function() {
        this.$refs.vuetable.refresh()
      })
    },
    resetFilter: function() {
      this.searchFor = ''
      this.setFilter()
    },
    preg_quote: function( str ) {
      // http://kevin.vanzonneveld.net
      // +   original by: booeyOH
      // +   improved by: Ates Goral (http://magnetiq.com)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   bugfixed by: Onno Marsman
      // *     example 1: preg_quote("$40");
      // *     returns 1: '\$40'
      // *     example 2: preg_quote("*RRRING* Hello?");
      // *     returns 2: '\*RRRING\* Hello\?'
      // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
      // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

      return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    },
    highlight: function(needle, haystack) {
      return haystack.replace(
        new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
        '<span class="highlight">$1</span>'
      )
    },
    rowClassCB: function(data, index) {
      return (index % 2) === 0 ? 'odd' : 'even'
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked', field.name)
      if (field.name !== '__actions') {
        this.$refs.vuetable.toggleDetailRow(data.id)
      }
    },
    onCellDoubleClicked (data, field, event) {
      console.log('cellDoubleClicked:', field.name)
    },
    onLoadSuccess (response) {
      // set pagination data to pagination-info component
      this.$refs.paginationInfo.setPaginationData(response.data)

      let data = response.data.data
      if (this.searchFor !== '') {
        for (let n in data) {
          data[n].name = this.highlight(this.searchFor, data[n].name)
          data[n].email = this.highlight(this.searchFor, data[n].email)
        }
      }
    },
    onLoadError (response) {
      if (response.status == 400) {
        sweetAlert('Something\'s Wrong!', response.data.message, 'error')
      } else {
        sweetAlert('Oops', E_SERVER_ERROR, 'error')
      }
    },
    onPaginationData (tablePagination) {
      this.$refs.paginationInfo.setPaginationData(tablePagination)
      this.$refs.pagination.setPaginationData(tablePagination)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
  },
  events: {
      'vuetable:action': function(action, data) {
          console.log('vuetable:action', action, data)
          if (action == 'view-item') {
              this.viewProfile(data.id)
          }
      },
      'vuetable:load-error': function(response) {
          console.log('Load Error: ', response)
      }
  },
  mounted(){

  }
}
</script>

<style>

</style>
