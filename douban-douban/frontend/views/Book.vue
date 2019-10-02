
<template lang="jade">
#book
  vheader
  vnav
  .wapper
    #book_home_top_banner.no-bg  <!-- 广告位1 -->
      a(href='#')
        img(src='/book-top.jpg')
    .content <!-- 广告位2 -->
      .bubble <!-- 气泡 -->
        .small-bubble
        p.title.size14 {{bubbledata.title}}
        br
        p.sub-title.size12 {{bubbledata.author}} '/' {{bubbledata.year}} '/' {{bubbledata.publisher}}
        br
        p.desc.size12 {{bubbledata.abstract}}
      #book_home_middle_banner.section.no-bg <!-- 广告位2 -->
        a(href='#')
          img(src='/book-middle.jpg')
      express-books(:bookdata='bookdata.booksExpress') <!-- 新书速递 -->
      popular-books(:bookdata='bookdata.popularBooks') <!-- 最受关注图书榜 -->
      market-books(:bookdata='bookdata.marketBooks') <!-- 豆瓣纸书 -->
      ebooks(:bookdata='bookdata.ebooks') <!-- 电子书 -->
      popular-authors(:authordata='bookdata.popularAuthors') <!-- 书评人 -->
      #book_home_bottom_banner.section.no-bg <!-- 广告位4 -->
        a(href='#')
          img(src='/book-bottom.jpg')
    .book-side <!-- 侧边栏 -->
      #home-top-right.cover <!-- 广告位5 -->
        a
          img(src='/book-top-right.jpg')
      hot-tags(:tagdata='bookdata.hotTags') <!-- 热门标签-->
      weekly-top(:bookdata='bookdata.weeklyTop') <!-- 周榜 -->
      book-rec(:bookdata='bookdata.bookRec') <!-- 推荐 -->
      .apply-links.section.size14
        ul
          li
            a 编辑申请
          li
            a 出版社申请 <!-- 回复 -->
      .contact.size12
        .hd
            span 关注我们
        .bd
          ul
            li
              .cover
                a
                  img(src='/home_site.jpg')
              a 豆瓣小站
            li
              .cover
                a
                  img(src='/home_site.jpg')
              a 豆瓣小站 <!-- 联系我们 -->
  vfooter
</template>

<script>
import Vheader from '../components/pub/Vheader.vue'
import Vfooter from '../components/pub/Vfooter.vue'
import Vnav from '../components/pub/Vnav.vue'
import ExpressBooks from '../components/book/ExpressBooks.vue'
import Ebooks from '../components/book/Ebooks.vue'
import MarketBooks from '../components/book/MarketBooks.vue'
import PopularBooks from '../components/book/PopularBooks.vue'
import PopularAuthors from '../components/book/PopularAuthors.vue'
import HotTags from '../components/book/HotTags.vue'
import WeeklyTop from '../components/book/WeeklyTop.vue'
import BookRec from '../components/book/BookRec.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', '/book')
}

export default {

  name: 'book',

  components: {
    'vheader': Vheader,
    'vnav': Vnav,
    'vfooter': Vfooter,
    'express-books': ExpressBooks,
    'ebooks': Ebooks,
    'market-books': MarketBooks,
    'popular-books': PopularBooks,
    'popular-authors': PopularAuthors,
    'hot-tags': HotTags,
    'weekly-top': WeeklyTop,
    'book-rec': BookRec
  },

  computed: {
    bookdata () {
      return this.$store.state.book
    },
    bubbledata () {
      if (typeof window !== 'undefined' && document.querySelector('.wapper .content .bubble')) {
        var bubble = document.querySelector('.wapper .content .bubble')

        bubble.style.display = this.$store.state.bookBubble.top ? 'block' : 'none'
        bubble.style.marginTop = this.$store.state.bookBubble.top + 'px'
        bubble.style.marginLeft = this .$store.state.bookBubble.left + 'px'
      }
      return this.$store.state.bookBubble.data
    },
  },
  
  preFetch: fetchItem,

  beforeMount () {
    fetchItem(this.$store)
  },

  data () {
    return {
      bookBubble: {}
    }
  }
}
</script>

<style lang="stylus">
#book
  #book_home_top_banner 
    position relative
    margin 20px 0px

  .content 
    float left
    width 590px
    padding-right 40px
    margin-top 30px

  .book-side 
    float right
    width 310px

  .apply-links li 
    display inline-block
    margin-right 30px

  .contact li 
    display inline-block
    margin-right 30px

  .bubble 
    width 300px
    min-height 200px
    background-color green
    position absolute
    padding 20px
    line-height 20px
    border 1px solid black
    border-radius 4px
    background-color #F5FFF7
    z-index 10
    display none

  .small-bubble 
    content ""
    display block /* reduce the damage in FF3.0 */
    position absolute
    border-top 10px solid transparent
    border-right 10px solid black
    border-bottom 10px solid transparent
    left -10px
    top 110px

  .small-bubble:before // 黑线
    content ""
    display block /* reduce the damage in FF3.0 */
    position absolute
    border-top 9px solid transparent
    border-right 9px solid #ffffff
    border-bottom 9px solid transparent
    top -9px
    margin-left 1px

</style>