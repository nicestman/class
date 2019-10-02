<!-- 公用 bookview 组件 -->
<template lang="jade">
  .bookview
    li(v-for='book in bookdata')
      .cover(@mouseover='mouseover($event.target, book)', @mouseout='mouseout($event.target)')
        //- router-link(:to="'/' + book.link")
        a(:href='book.link', target='_blank')
          img(:src='book.pic', :alt='book.title')
      .intervenor-info(v-if='index')
        img(src='/jd_recommend.png')
        span.size13 推荐
      a.title.size13(:href='book.link', target='_blank') {{book.title}}
      p.author.size12 {{book.price || book.author}} 
</template>

<script>
export default {

  name: 'bookview',

  props: ['index', 'bookdata'],

  methods: {
    mouseover: function (el, book) {
      if (el.tagName === 'IMG') {
        el = el.parentNode.parentNode // 传递给父元素
      }
      var parentEl = el.parentNode.parentNode.parentNode.parentNode
      var left = el.offsetLeft // 第一个需要减去偏移
      var top = el.offsetTop + parentEl.offsetTop - 150
      if (this.index !== undefined) { // 如果为定义 说明是单页
        left -= 507 * this.index - 20 + (this.index - 1) * 99
      } else {
        left += 120 // 增加偏移
       
      }
      // console.log(book)
      if (book.abstract === undefined) {
        return
      }
      this.$store.dispatch('MODIFY_BOOK_BUBBLE',{
        left: left,
        top: top,
        data: book
      })
    },
    mouseout: function (el) {
      this.$store.dispatch('MODIFY_BOOK_BUBBLE',{
        left: 0,
        top: 0,
        data: {}
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/book.styl"

</style>