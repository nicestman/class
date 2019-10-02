<template lang="jade">
#itemlist
  vheader
  vnav
  .wapper.size12
    .top
      h1.title {{title}}{{$route.params.id || $route.query.search_text}} 
    .main
      ul
        li(v-for='item in items.books')
          .cover
            a(:href='createHref(item.id)')
              img(:src='item.images.medium')
          .info
            a.title(:href='createHref(item.id)') {{item.title}}
            .more
              span.author {{item.author[0]}} &nbsp/&nbsp
              span.translator(v-if='item.translator === []') {{item.translator}} &nbsp/&nbsp
              span.publisher {{item.publisher}} &nbsp/&nbsp
              span.pubdate {{item.pubdate}} &nbsp/&nbsp
              span.price {{item.price}} 
            .rating
              span.star.star1
              span.average {{item.rating.average}} &nbsp 
              a.num ({{item.rating.numRaters}}
              span.num 评价)
            span.summary.line2 {{item.summary}}
  vfooter
</template>

<script>
import Vheader from './Vheader.vue'
import Vfooter from './Vfooter.vue'
import Vnav from './Vnav.vue'

export default {

  components: {
    'vheader': Vheader,
    'vnav': Vnav,
    'vfooter': Vfooter,
  },

  computed: {
    items () {
      return this.$store.state.items
    }
  },

  props: {
    title: String
  },

  beforeMount: function () {
    let title = this.$route.params.id || this.$route.query.search_text
    document.title = this.title + title
  },

  methods: {
    createHref: function (id) {
      return '/subject/' + id
    }
  }
}
</script>

<style lang="stylus" scoped>
#itemlist
  .top
    padding 30px 0px
    .title
      font-size 25px
  .main
    width 600px
    ul
      li
        clear both
        padding 20px 0px  
        border-top 1px dashed lightgray
        .cover
          float left
          margin-bottom 15px
          margin-right 20px
          img
            width 102px
            height 144px
        .info
          float left
          width 450px
          span
            line-height 18px
          .title
            display inline-block
          .title, .more, .rating, .summary
            margin-bottom 5px
          .average
            color red
          
</style>