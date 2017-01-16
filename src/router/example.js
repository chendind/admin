export default {
  path: 'example',
  component:{ template: "<router-view></router-view>"},
  children: [
    {
      path: 'business',
      component(r){
        r(require('pages/example/business.vue'))
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
