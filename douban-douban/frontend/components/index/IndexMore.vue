<template lang="jade">
.index-more
  h2.size15
    | {{title}}
    span.point  · · · · · ·
    span.wapper.size12(v-if='link')
      | ( 
      a(target='_blank', :href='link' v-if='link') {{ desc }}
    span.wapper.size12(v-if='link')  )
</template>

<script>
export default {

  name: 'indexMore',
  props: ['title', 'link','subTitle'],
  data () {
    return {
      desc: '更多'
    }
  },
  beforeMount() { 
    if (this.subTitle) {
      this.desc = this.subTitle
    }
  }
}
</script>

<style lang="stylus">
.index-more
  width 100%
  height 30px
  position relative
  display block
  margin-top 10px
  h2
    color #072
  .point
    letter-spacing -5px
    position relative
    margin 0 5px
  .wapper
    color black
  a
    color #669
</style>