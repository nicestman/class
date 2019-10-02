<template lang="jade">
#market-books.section
  .hd
    span 豆瓣纸书
    a(href='https://book.douban.com/latest?icn=index-latestbook-all') 查看全部»
  .bd.row-5
    .top
      .cover
        a(:href='bookdata.top.link', target='_blank')
          img(:src='bookdata.top.pic', :alt='bookdata.top.title')
      .info
        p.title {{bookdata.top.title}}
          span.price {{bookdata.top.price}}
        p.desc {{bookdata.top.desc}}
    ul
      book-row-5(:bookdata='bookdata.items')
</template>

<script>
import BookView from './BookView.vue'
export default {

  name: 'market-books',

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
#market-books
  .bd
    width 610px
    position relative
    .top
      .cover
        float left
        position relative
        margin-bottom 50px
        margin-right 20px
        img
          width 130px
          height 172px
      .title
        position relative
        font-size 23px
        line-height 32px
        padding-top 20px
        .price
          font-size 17px
          color #E76648
          margin-left 17px
      .desc
        color #9B9B9B
        font-size 14px
        line-height 20px
</style>