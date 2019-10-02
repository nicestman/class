<template lang="jade">
#index-header.wapper
  .cover
    router-link(:to="'/book'")
      img.logo(src='logo_db.png')
  .anony-srh
    form(action='', method='post')
      input.inp(type='text', placeholder='书籍、电影、音乐、小组、小站、成员')
      input.bn(type='submit', value='')
  .anony-nav-links
    ul
      li(v-for='item in navLinks')
        a(v-bind:class='item.class', target='_blank', :href='item.link')
</template>

<script>
export default {

  name: 'index-header',

  data () {
    return {
      navLinks: [
        {
          link: '/book',
          class: 'lnk-book'
        },
        {
          link: 'https://movie.douban.com',
          class: 'lnk-movie'
        },
        {
          link: 'https://music.douban.com',
          class: 'lnk-music'
        },
        {
          link: 'https://group.douban.com',
          class: 'lnk-group'
        },
        {
          link: 'https://events.douban.com',
          class: 'lnk-events'
        },
        {
          link: 'https://fm.douban.com',
          class: 'lnk-fm'
        },
        {
          link: 'https://dognxi.douban.com',
          class: 'lnk-dongxi'
        },
        {
          link: 'https://market.douban.com',
          class: 'lnk-market'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">

#index-header
  margin 0px auto 7px
  height 50px
  margin-top 30px

  .logo
    float left

  .anony-srh
    width 270px
    height 30px
    margin-left 30px
    float left
    display inline-block
    position relative
    vertical-align middle
    zoom 1
    border 1px solid #c3c3c3

  .bn
    background url('/bn_srh_1.png') 50% 50% no-repeat
    position absolute
    right 0
    top 0
    width 30px
    height 30px
    cursor pointer

  input
    width 240px
    height 20px
    font-size 13px
    padding 5px
    border none

.anony-nav-links
  position relative
  margin-left 10px
  top 5px
  ul 
    li
      position relative
      float left
      margin 0 0 0 20px
      a
        background url('/anony_nav_logo.png') no-repeat 100% 100%
        width 40px
        height 20px
        zoom 1
        overflow hidden
        outline none
        ertical-align middle
        line-height 20em
        display inline-block
      .lnk-book
        background-position 0px 0px
        border 2px solid green
      .lnk-movie
        background-position -60px 0px
      .lnk-music
        background-position -120px 0px
      .lnk-group
        background-position -180px 0px
      .lnk-fm
        background-position -241px 0px
      .lnk-events
        background-position -299px 0px
      .lnk-dongxi
        background-position -359px 0px
      .lnk-market
        width 42px
        background-position -421px 0px

</style>