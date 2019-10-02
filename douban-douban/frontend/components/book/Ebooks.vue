<template lang="jade">
#ebook-area.section
  .hd
    span 电子图书
    a(href='https://book.douban.com/latest?icn=index-latestbook-all') 查看全部»
  .bd.row-5
    ul
      book-row-5(:bookdata='bookdata')
</template>

<script>
import BookView from './BookView.vue'
export default {

  name: 'ebooks',

  components: {
    'book-row-5': BookView
  },

  props: ['bookdata'],

  data () {
    return {

    }
  }
}

</script>
<style lang="stylus">
@import "../../assets/book.styl"
#ebook-area
  .bd
    width 610px
    position relative
</style>