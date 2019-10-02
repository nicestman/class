<template lang="jade">
#subject-info.size12
  .cover
    a(:href='info.alt')
      img(:src='info.image')
  .more
    span
      label 作者：
      a(href='#') {{info.author[0]}}
      br
    span 出版社: {{info.publisher}}
      br
    span(v-if='info.alt_title')
      label 原作名：{{info.alt_title}}
      br
    span(v-if='info.translator')
      label 译者：
      a(href='#') {{info.translator[0]}}
      br
    span 出版年: {{info.pubdate}}
      br
    span 页数: {{info.pages}}
      br
    span 定价: {{info.price}}
      br
    span 装帧: {{info.binding}}
      br
    span(v-if='info.series')
      span 丛书:
      a(href='#') {{info.series.title}}
      br
    span ISBN: {{info.isbn13}}
  .interest
    .rating_logo 豆瓣评分
    .rating_self
      strong {{info.rating.average}}
      .rating_right
        .star
        a.num(href='http://1.com/') {{info.rating.numRaters}}人评价
    .clearfix
    span.starstop 5星
    .power(style='width:52px')
    span.rating_per 33%
    .clearfix
    span.starstop 4星
    .power(style='width:70px')
    span.rating_per 33%
    .clearfix
    span.starstop 3星
    .power(style='width:60px')
    span.rating_per 33%
    .clearfix
    span.starstop 2星
    .power(style='width:10px')
    span.rating_per 33%
    .clearfix
    span.starstop 1星
    .power(style='width:10px')
    span.rating_per 33%
  .clearfix
  .interest_sect_level
    a.colbutt 想读
    a.colbutt 在读
    a.colbutt 读过
    span 评价:
    .rating.no-bg
      a.star(v-for='n in 5' href='#')
        img(v-bind:id='n' v-bind:src='hoverImg'  @mouseover='mouseover($event.target)' @mouseout='mouseout($event.target)')
    span(v-show='levelName') {{levelName}}
  .clearfix
  .gtleft
    ul
      li
        img(src='https://img3.doubanio.com/f/shire/5bbf02b7b5ec12b23e214a580b6f9e481108488c/pics/add-review.gif')
        a(href='33') 写笔记
      li
        img(src='https://img3.doubanio.com/f/shire/5bbf02b7b5ec12b23e214a580b6f9e481108488c/pics/add-review.gif')
        a(href='33') 写书评
      li
        img(src='https://img3.doubanio.com/pics/add-cart.gif')
        a(href='33') 加入购书单
      li
        a 分享到
  a.rec 推荐
</template>

<script>
export default {

  name: 'info',

  data () {
    return {
      hoverImg: '/star_hollow_hover.png',
      onMouseOver: '/star_onmouseover.png',
      level: 0,
      info: this.$store.state.item
    }
  },

  computed: {
    levelName () {
      const temp = ['', '很差', '较差', '还行', '推荐', '力荐']
      return temp[this.level]
    }
  },

  methods: {
    mouseout: function (el) {
      let els = document.querySelectorAll('#subject-info .interest_sect_level .rating a img')
      for (var i = 0; i < el.id; i++) {
        els[i].src = this.hoverImg
      }
      this.level = 0
    },
    mouseover: function (el) {
      let els = document.querySelectorAll('#subject-info .interest_sect_level .rating a img')
      for (var i = 0; i < el.id; i++) {
        els[i].src = this.onMouseOver
      }
      this.level = el.id
    }
  }
}
</script>

<style lang="stylus">
#subject-info
  .cover
    float left
    margin-right 10px
    text-align center
    a
      img
        width 107px
  .more
    float left
    span
      line-height 18px
  .interest
    float right
    min-width 180px
    padding-left 15px
    border-left 1px solid lightgray
    color gray
    .rating_self
      margin 10px 0px
      strong
        float left
        font-size 25px
        color black
      .rating_right
        float left
        margin-left 15px
        margin-bottom 10px
        .star
          width 75px
          height 15px
          background-image url('/ic_rating_m.png')
          background-position 0 -30px
        .num
          line-height 20px
    .starstop
      float left
    .power
      height 10px
      float left
      margin 1px 4px
      background #ffd596 none repeat scroll 0 0
  .interest_sect_level
    margin 20px 0px
    .colbutt
      float left
      padding 3px 10px
      color black
      background rgb(251, 230, 215)
      border 1px solid lightgray
      margin-right 10px
    .colbutt:hover
      background rgb(251, 230, 215)
      color black
    span
      float left
    .rating
      float left
      .star img
        width 16px
        height 16px
  .gtleft
    margin-top 20px
    ul
      li
        display inline-block
        margin-right 20px
  .rec
    float right
    padding 3px 5px
    border 1px solid #e3f1ed
    background-color #f2f8f2
    color #4f946e
</style>