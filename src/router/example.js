export default {
  path: 'example',
  component:{ template: "<router-view></router-view>"},
  children: [
    {
      path: 'table',
      component(r){
        r(require('pages/example/table.vue'))
      }
    },
    {
      path: 'vuetable',
      component(r){
        r(require('pages/example/vuetable.vue'))
      }
    },
    {
      path: 'form',
      component(r){
        r(require('pages/example/form.vue'))
      }
    },
    {
      path: 'formImageUpload',
      component(r){
        r(require('pages/example/formImageUpload.vue'))
      }
    },
    {
      path: 'article',
      component(r){
        r(require('pages/example/article.vue'))
      }
    }
  ]
}
