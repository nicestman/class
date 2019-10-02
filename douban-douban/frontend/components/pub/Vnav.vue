<template lang="jade">
#vnav
  .nav-primary
    .wapper
      router-link(:to="'/book'")
        .nav-logo
      .nav-search
        form(action='/search', method='get', enctype='text/plain')
          .inp
            input(type='text', name='search_text', placeholder='书名、作者、ISBN', :value='$route.query.search_text')
          .inp-btn
            input(type='submit', value='搜索')
  .nav-secondary
    ul.wapper.size13
      li(v-for='item in navItems', :class='item.class')
        a(target='_blank', :href='item.link') {{item.title}}
  
</template>

<script>
export default {

  name: 'vnav',

  data () {
    return {
      navItems: [
      // {
      //   class: null,
      //   title: '我读',
      //   link: 'https://book.douban.com/mine?icn=index-nav'
      // },
      // {
      //   class: null,
      //   title: '动态',
      //   link: 'https://book.douban.com/updates?icn=index-nav'
      // },
      // {
      //   class: null,
      //   title: '豆瓣猜',
      //   link: 'https://book.douban.com/recommended?icn=index-nav'
      // },
      {
        class: null,
        title: '分类浏览',
        link: '/tags'
      },
      {
        class: 'book-cart',
        title: '购书单',
        link: 'https://book.douban.com/cart?icn=index-nav'
      },
      {
        class: null,
        title: '电子图书',
        link: 'https://read.douban.com/ebooks/?dcs=book-nav&dcm=douban'
      },
      {
        class: null,
        title: '纸书',
        link: 'https://market.douban.com/book?platform=web&channel=book_nav'
      }]
    }
  }
}
</script>

<style lang="stylus">
#vnav
  background-color #f6f6f1
  .nav-primary
    position relative
    height 75px
    border-bottom 1px solid #e5ebe4

  .nav-logo
    background url('/lg_book_a11_1.png') no-repeat 0 12px
    float left
    height 56px
    width 145px
    position relative
    margin-top 10px

  .nav-search
    position relative
    float left
    margin-left 15px
    margin-top 20px

  .inp
    width 470px
    height 34px
    background url('/nav_bg_a1.png') no-repeat 0 0
    float left

  .inp input
    width 100%
    height 29px
    padding-left 15px
    border-width 0px

  .inp-btn
    float left

  .inp-btn input
   width 37px
   height 34px
   border 0px
   font-size 0px
   background:url('/nav_bg_a1.png') no-repeat 0 -40px

  .nav-secondary
    height 26px
    margin-top 13px

  .nav-secondary ul li
    display inline
    margin-right 32px

  a
    color #614e3c

  a:hover
    background-color #614e3c
    color white

  .book-cart
    position relative
    padding-left 26px
    background url('/icon-cart.png') no-repeat
</style>