import Vue from 'vue'
import Vuex from 'vuex'
import {fetchItem, fetchSearchItems, fetchSearchItem} from './api.js'
import {_index, _book, _tags} from './mock.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    index: _index, // 首页数据
    book: _book, // 读书首页数据
    tags: _tags, // 标签页面数据
    items: [], // items
    item: {},
    expressBookIndex: 1, // 新书速递索引
    bookBubble:{ // 气泡
      left: '',
      top: '',
      data: {
        title: '',
        author: '',
        year: '',
        publisher: '',
        abstract: ''
      }
    }
  },

  actions: {
    FETCH_ITEMS: ({ commit, state },  url) => {
      return fetchItem(url).then((items) => commit('SET_ITEMS', { items, url}))
    },
    FETCH_LIST_DATA: ({commit, state}, type) => {
      return fetchSearchItems(type).then((items) =>  commit('SET_LIST_DATA', items))
    },
    FETCH_ITEM_DATA: ({commit, state}, id) => {
      return fetchSearchItem(id).then((item) =>  commit('SET_ITEM_DATA', item))
    },
    EXPRESS_BOOK_INDEX: ({commit, state}, index) => {
      commit('SET_EXPRESS_BOOK', index)
    },
    MODIFY_BOOK_BUBBLE: ({commit, state}, data) => {
      commit('SET_BOOK_BUBBLE', data)
    },
  },

  mutations: {
    SET_ITEMS: (state, { items, url}) => {
      switch (url) {
        case '/index/vistor': {
          state.index = items
        }
        break
        case '/tags': {
          state.tags = items
        }
        break
        case '/book': {
          // 需要复制两个参数
          let temp = items.booksExpress
          temp.push(temp[0])
          temp.unshift(temp[temp.length - 1])
          items.booksExpress = temp
          state.book = items
        }
        break
      }
    },
    SET_EXPRESS_BOOK: (state, index) => {
      state.expressBookIndex = index
    },
    SET_BOOK_BUBBLE: (state, data) => {
      state.bookBubble = data
    },
    SET_LIST_DATA: (state, data) => {
      state.items = data
    },
    SET_ITEM_DATA: (state, data) => {
      state.item = data
    }
  },

  getters: {
  }
})

export default store
