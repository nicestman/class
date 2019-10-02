<template lang="jade">
#popular-books.section
  .hd
    span 最受关注图书榜
    a(href='https://book.douban.com/latest?icn=index-latestbook-all') 虚构类»
    a(href='https://book.douban.com/latest?icn=index-latestbook-all') 非虚构类»
  .bd.row-2
    ul.size12
      li(v-for='book in bookdata')
        .cover
          a(:href='book.link', target='_blank')
            img(:src='book.pic', :alt='book.title')
        a.title.size15(:href='book.link', target='_blank') {{book.title}}
        p.star
          span.img
          span.score {{book.score}}
        p.author {{book.author}}
        p.type {{book.type}}
        p.reviews {{book.reviews}} (
          a.comment(:href='book.link', target='_blank') {{book.commenter}}
</template>

<script>
export default {

  name: 'polularbooks',

  props: ['bookdata'],

  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">

@import "../../assets/book.styl";

#popular-books ul li 
  .cover
    margin-right 18px
    float left

  .title
    display inline-block
    margin-top 5px

  p
    position relative
    margin-top 7px

  .star .score
    color #e09015
    font-size 10px

  .star .img
    width 55px
    height 11px
    display inline-block
    margin 0 3px 0 0
    background url('/ic_rating_s.png') no-repeat

  .reviews
    color #666
    clear both
    padding-top 15px
    word-wrap word-break
    line-height 20px
</style>