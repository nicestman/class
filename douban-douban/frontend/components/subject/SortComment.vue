
<template lang="jade">
#subject-sort-comment.size12
  vmore(title='短评(豆瓣暂时没有评论 API，等爬虫)' link='' subTitle='全部193条')
  .types
    span.type(v-on:click="changeIndex($index)"
       v-for="(type, $index) in types"
       v-bind:class="{active: activeIndex == $index}") {{type}}
  ul(v-for='(n, $index) in 3' v-show='$index == activeIndex')
    li(v-for='n in 10')
      a.name 23333
      span.star.star1
      span.time 2016-07-20
      a.useful 有用
      span.num 19
      span.content 槽太多……显然她的 写作胸怀和赞美她的评论家所举有很大分歧。总之千万不能以她来想象推论80后小说写作者，这几年突起的80后好作者不要太多。
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
      types: ['热门', '最新', '好友'],
      activeIndex: 0
    }
  },
  methods: {
    changeIndex: function(item) {
      this.activeIndex = item
    }
  }
}
</script>

<style lang="stylus">
#subject-sort-comment
  .types
    padding-bottom 10px
    border-bottom 1px dashed lightgray
    .type
      margin-right 5px
      color #37a
      cursor pointer
      height 20px
    .active
      color gray
      background inherit
  ul
    li
      padding 10px 0px
      border-bottom 1px dashed lightgray
      span
        line-height 20px
        margin-right 5px
      a
        margin 3px 0px
        margin-right 5px
      .name
        float left
      .star
        float left
      .time
        float left
      .content
        display block
        clear both
        padding-right 40px
      .num
        float right
      .useful
        float right
</style>