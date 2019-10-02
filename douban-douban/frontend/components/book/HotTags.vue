<template lang="jade">
#hot-tags.section
  .hd
    span 热门标签
    a(href='/tags') 所有热门标签»
  .bd
    ul
      li(v-for='tags in tagdata')
        ul.section
          li(v-for='tag in tags')
            a(:href='createHref(tag.title)', target='_blank') {{tag.title}}
</template>

<script>
export default {

  name: 'hot-tags',

  props: ['tagdata'],

  data () {
    return {

    }
  },
  methods: {
    createHref:  function (title){
      return '/tag/' + title
    }
  }
}
</script>

<style lang="stylus">

@import "../../assets/book.styl"

#hot-tags 
  margin-top 30px
  .bd 
    .section
      margin-bottom 15px
      li
        display inline-block
        padding 2px 11px 0
        margin 0 3px 5px 0
        line-height 20px
        font-size 13px
        background-color #f5f5f5
      li:first-child a
        color black
        cursor text

      li:first-child
        display block
        background-color white

      li:first-child:hover
        background-color white

      li:hover
        background-color #E4E4E4

      li:last-child a
        color gray
        padding-right 10px

      a:hover
        background-color inherit
        color inherit
</style>