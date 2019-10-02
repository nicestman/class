import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexVisitor from '../views/IndexVisitor.vue'
import Book from '../views/Book.vue'
import Subject from '../views/Subject.vue'
import Tags from '../views/Tags.vue'
import {createListView} from '../views/CreateListView.js'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }), // '/item/:id(\\d+)'
  routes: [
    { path: '/', component: IndexVisitor },
    { path: '/book', component: Book },
    { path: '/subject/:id(\\d+)', component: Subject},
    { path: '/tag/:id', component: createListView('豆瓣图书标签:')},
    { path: '/search', component: createListView('书籍搜索:')},
    { path: '/tags', component: Tags},
    // { path: '*', redirect: '/' },
  ]
})
