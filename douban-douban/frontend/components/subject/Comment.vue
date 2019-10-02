<template lang="jade">
#subject-comment.size12
  vmore(title='书评(豆瓣暂时没有评论 API，等爬虫)' link='' subTitle='全部193条')
  .types
    span.box(v-on:click="changeIndex($index)"
         v-for="(type, $index) in types"
         v-bind:class="{active: activeIndex == $index}")
      span.type {{type}}
  .comments
    ul(v-for='(n,$index) in 2' v-show='$index == activeIndex')
      li
        a.cover
          img(src='https://img3.doubanio.com/icon/u2237660-5.jpg') 
        .info
          .top
            a.title 青春伤逝背后的那些残酷真相
            //- img.down(src='https://img3.doubanio.com/f/shire/a1fdee122b95748d81cee426d717c05b5174fe96/pics/blank.gif')
          a.name 糟糕
          span.desc (人类救星孙美好)
          span.star.star1
        .clearfix
        span.content 它隐藏在中心花园的尽头，远远看去像是一朵蓬松的云彩，掖在茂密的树木中间。但我总疑心它是一只落难的小象，被坏人施了咒语，流放到此地。我最喜欢它夏天的样子，被茂盛的橡皮树围在当中，白墙上荡着惶惶的树影，像极了一座殖民地时期的官邸，周遭黏黏的热风里有一股颓靡的气息。 这一句很亲切，放到樱桃里也不违和，这样的描述是那个时候喜欢上她的原因之一。这么多年过去了啊。最后一句，想到情人里的夏天。
        p.time 2016-08-01 19:57
</template>

<script>
import More from '../index/IndexMore.vue'
export default {

  name: 'comment',

  components: {
    'vmore': More
  },

  data () {
    return {
      types: ['热门评论', '最新评论'],
      activeIndex: 0
    }
  },
  methods: {
    changeIndex: function (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="stylus">
#subject-comment
  .types
    .box
      padding-bottom 10px
      margin-right 10px
      .type
        color gray
        cursor pointer
      .type:hover
        color white
        background gray
    .active
      border-bottom 2px solid #037a
      .type
        color #037a
      .type:hover
        color #037a
        background inherit
  .comments
    margin-top 10px
    border-top 1px solid lightgray
    ul
      li
        margin-top 20px
        .cover
          float left
          width 60px
          margin-bottom 10px
        .info
          margin-left 60px
          .top
            background #F1FBEE
            font-size 15px
            padding 3px 0px
          .name,.desc
            float left
            line-height 25px
          .star
            float left
            margin-top 3px
        .content, .time
          line-height 20px
</style>