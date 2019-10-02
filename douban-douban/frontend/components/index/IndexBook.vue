<template lang="jade">
#index-book
  .wapper
    index-side-nav(:side_links='book.book_side_links')
    .side
      index-more(title='热门标签', link='')
      ul.book-cates
        li.size12.book-cates-item(v-for='tags in book.book_tags')
          ul.cate
            li.cate-item(v-for='tag in tags', track-by='$index')
              a.a-link(:href='tag.link') {{tag.title}}
    .main
      .mod(v-for='items in book.books')
        index-more(title='新书速递', link='')
        ul
          li(v-for='item in items', track-by='$index')
            img.pic(:src='item.pic')
            a.title.size14(:href='item.link') {{item.title}}
            p.author.size12 {{item.author}}
            a.bn-link.size12(:href='item.reader') 免费试读
</template>

<script>
import IndexSideNav from './IndexSideNav.vue'
import IndexMore from './IndexMore.vue'

export default {

  name: 'index-book',

  components: {
    'index-side-nav': IndexSideNav,
    'index-more': IndexMore
  },

  props: ['book']

}
</script>

<style lang="stylus">
#index-book
  background #f7f7f7
  padding 40px 0 20px

  .main
    display inline-block
    width calc(950px - 425px)

  .main .mod
    width 100%
    display inline-block

  .mod ul
    position relative

  .main .mod ul li
    position relative
    float:left
    margin-left 10px
    width calc((100% - 40px) / 4)
    text-align center

  .pic
    position relative
    margin-bottom 15px
    width 100px
    height 148px
    border-width 0
    vertical-align middle
          
  .title
    text-overflow -o-ellipsis-lastline
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 1
    -webkit-box-orient vertical
    display inline-block

  .author
    position relative
    top 8px
    text-overflow -o-ellipsis-lastline
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 1
    -webkit-box-orient vertical

  .bn-link
    background-color #999a95
    color white
    position relative
    display inline-block
    padding 5px 10px
    border-radius 2px
    margin-top 10px
    
  .side
    width 265px
    margin-left 30px
    float right
    height 200px

  .side .cate
    margin -1px 0 10px 0
    padding-bottom 8px
    border-bottom 1px solid #eaeaea

  .side .cate li:first-child
    a
      color lightgray
      cursor auto
    a:hover
      background-color:inherit
      color lightgray

  .side .cate-item
    display inline-block
    position relative
    margin-right 10px
    line-height 20px
</style>