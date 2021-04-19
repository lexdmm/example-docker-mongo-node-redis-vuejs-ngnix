import Vue from 'vue'
import Router from 'vue-router'
import MainExample from '@/components/MainExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainExample',
      component: MainExample
    }
  ]
})
