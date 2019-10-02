<template lang="jade">
#book_rec.section
  .hd
    span 豆瓣图书250 
    a(href='https://book.douban.com/latest?icn=index-latestbook-all') 更多»
  .bd.size12
    ul
      template(v-for='(book, $index) in bookdata')
        li
          .cover
            a(:href='book.link', target='_blank')
              img(:src='book.pic', :alt='book.title')
          a.title(:href='book.link', target='_blank') {{book.title}}
        .clear(v-show='!(($index+1)%3)')
</template>

<script>
export default {

  name: 'book-rec',

  props: ['bookdata'],

  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">

@import "../../assets/book.styl"

#book_rec
  .title
    word-wrap break-word
  .clear
    width 100%
    display block
    clear both
  ul li
    float:left
    margin-right 30px
    margin-bottom 10px
    width calc(33.3% - 30px)
    overflow hidden
  img
    width 80px
    height 100px
</style>