<template>
<div id="index-visitor">
  <index-header></index-header>
  <index-reg-new v-bind:item="index.app"></index-reg-new>
  <index-sns v-bind:sns="index.sns"></index-sns>
  <index-book v-bind:book="index.book"></index-book>
  <index-footer></index-footer>
</div>
</template>

<script>
import IndexHeader from '../components/index/IndexHeader.vue'
import IndexFooter from '../components/index/IndexFooter.vue'
import IndexRegNew from '../components/index/IndexRegNew.vue'
import IndexSns from '../components/index/IndexSns.vue'
import IndexBook from '../components/index/IndexBook.vue'


function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', '/index/vistor')
}

export default {
  computed: {
    index () {
      return this.$store.state.index
    }
  },
  
  preFetch: fetchItem,

  beforeMount () {
    fetchItem(this.$store)
    document.title = '豆瓣, 请点击[读书]'
  },

  components: {
    IndexHeader,
    IndexRegNew,
    IndexSns,
    IndexBook,
    IndexFooter
  }
}
</script>

<style lang='stylus'>
@import '../assets/main.styl'
</style>
