<template lang="jade">
#index-sns
  .wapper
    a.homepage-top(href='#')
    index-more(title='热点内容', link='#')
    .side.index-side-w
      .yike.cover
        a(target='_blank', :target='sns.yike.link')
          img(style='width:265px', :src='sns.yike.pic')
      index-more(title='线上活动', link='#')
      .online
        ul
          li.size12(v-for='online in sns.onlines')
            a.title.a-link(:href='sns.link', target='_blank') {{online.title}}
            p.time {{online.time}}
            p.num {{online.desc}}
    .main
      .albums
        ul
          li.size12(v-for='album in sns.albums')
            .pic.cover
              a(:href='album.link', target='_blank')
                img(:src='album.pic', :alt='album.title')
            a.a-link {{album.title}}
            span.num {{album.num}}
      .notes
        ul
          li.size12(v-for='note in sns.notes')
            a.a-link(:href='note.link') {{note.title}}
            p.author(v-if='note.author') {{note.author}}
            p.desc(v-if='note.author') {{note.desc}}

</template>

<script>
import IndexMore from './IndexMore.vue'
export default {

  name: 'index-sns',

  components: {
    'index-more': IndexMore
  },

  props: ['sns']
}
</script>

<style lang='stylus'>
#index-sns
  color #999
  .homepage-top
    display block
    background-image url('/index-homepage-top.png')
    height 90px
    width 100%

  .main
    display block
    position relative
    top -10px
    width calc(100% - 270px)
    min-height 400px
    margin-top 10px

  .albums
    float left
    width 370px
    font-size 0
    letter-spacing -0.31em


  .albums ul
    margin 0 10px 0 0px

  .albums ul li
    display inline-block
    zoom 1
    letter-spacing normal
    word-spacing normal
    width 170px
    vertical-align top
    margin-right 10px
    margin-bottom 10px
            
  .pic
    img
      width 170px

    .num
      position relative
      left 5px


  .notes ul
    overflow hidden

  .notes .desc
    color gray

  .notes li
    line-height 20px
    margin-bottom 10px

  .side
    position relative
    float right
    width 265px
    margin-left 30px
    height 200px
      
  .side ul
    position relative

  .side li
    line-height 20px
    margin-bottom 10px
</style>