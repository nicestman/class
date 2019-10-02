<template lang="jade">
#index-sidenav
  .mod
    a.section-title.size25.a-link 读书
    .side-links
      ul.size14(v-for='item in side_links')
        li
          a.a-link(:href='item.link') {{item.title}}
  .apps-list
    ul.size12
      li
        .app-icon
          a
        a.app-name.a-link 豆瓣阅读
</template>

<script>
export default {

  name: 'index-sidenav',

  props: ['side_links'],

  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
#index-sidenav
  width 100px
  float left
  margin-right 20px
  
  a
    color #614e3c
    position relative
    display inline-block

  a:hover
    color white

  .side-links
    margin-bottom 40px
    ul
      position relative
      top 12px
      li
        margin-top 5px
        height 20px

  .apps-list li
    margin-top 15px

  .app-name
    position relative
    top 2px

  .app-icon
    width 100%
    a
      background url('/app_icons_50_10.png')
      background-position 0 0
      width 50px
      height 50px
      border-radius 10px
      -webkit-box-shadow 1px 1px 2px #999
      -moz-box-shadow 1px 1px 2px #999
      box-shadow 1px 1px 2px #999
</style>