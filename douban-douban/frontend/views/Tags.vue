<template lang="jade">
#tags
  vheader
  vnav
  .wapper.size14
    .main
      .top
        h1.title 豆瓣图书标签
        a(v-bind:class='{active: activeIndex === 1}' v-on:click='changeIndex(1)') 所有热门标签
        span &nbsp / &nbsp
        a(v-bind:class='{active: activeIndex === 0}' v-on:click='changeIndex(0)') 分类浏览
      .tags(v-for='items in tags' v-if='activeIndex === 0')
        ul

          div.class {{items[0].tag}}  · · · · · ·
          template(v-for='(item, $index) in items')
            li
              a.title(:href='createHref(item.title)') {{item.title}}
              span.num {{item.num}}
            .clearfix(v-if='!(($index+1)%4)')
      .tags(v-if='activeIndex === 1')
        ul
          template(v-for='(item, $index) in tags')
            li
              a.title(:href='createHref(item.title)') {{item.title}}
              span.num {{item.num}}
            .clearfix(v-if='!(($index+1)%4)')


  vfooter
</template>

<script>
import Vheader from '../components/pub/Vheader.vue'
import Vfooter from '../components/pub/Vfooter.vue'
import Vnav from '../components/pub/Vnav.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', '/tags')
}

export default {

  name: 'tag',

  components: {
    'vheader': Vheader,
    'vnav': Vnav,
    'vfooter': Vfooter,
  },

  computed: {
    tags () {
      if (this.activeIndex === 0) {
        return this.$store.state.tags
      }
      let tags = this.$store.state.tags
      let temp = []
      for (let i = 0; i < tags.length; i++) {
        let arr = tags[i]
        temp = temp.concat(arr)
      }
      return temp
    }
  },
  
  preFetch: fetchItem,

  beforeMount () {
    fetchItem(this.$store)
    document.title = '所有图书标签'
  },

  data () {
    return {
      activeIndex: 0
    }
  },

  methods: {
    changeIndex: function(item) {
      this.activeIndex = item
    },
    createHref: function (title) {
      return '/tag/' + title
    }
  }
}
</script>

<style lang="stylus">
#tags .wapper
    .main
      width 600px
      .top
        margin-top 30px
        padding-bottom 40px
        border-bottom 2px solid #DBDEDE
        .title
          font-size 25px
        a,span
          float right
          line-height 18px
          margin-top 15px
          font-size 12px
        .active
          background transparent
          color gray
          cursor text
      .tags
        ul
          .class
            font-size 15px
            clear both
            padding 20px 0px
          li
            line-height 22px
            float left
            width 25%
            .num
              color gray
</style>