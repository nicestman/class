
<template lang="jade">
  #vheader
    .bd.size12.no-bg
      ul.nav-links
        li(v-for='item in navLinks')
          a(class='item.class', target='_blank', :href='item.link') {{item.title}}
        li
          a.bn-more(@click='more()', href='#') 更多
          .more-items
            ul
              li
                a 一刻
              li
                a 一拍一
      .nav-info
        a 登录
        a 注册
      .nav-doubanapp
        a 下载豆瓣客户端
</template>

<script>
export default {

  name: 'vheader',

  ready () {
  },
  methods: {
    more: function () {
      var el = document.querySelector('.more-items')
      el.style.display = el.style.display === 'block' ? 'none' : 'block'
    }
  },

  data () {
    return {
      navLinks: [
        {
          link: 'https://douban.com',
          class: 'lnk-douban',
          title: '豆瓣'
        },
        {
          link: '/book',
          class: 'lnk-book',
          title: '读书'
        },
        {
          link: 'https://movie.douban.com',
          class: 'lnk-movie',
          title: '电影'
        },
        {
          link: 'https://music.douban.com',
          class: 'lnk-music',
          title: '音乐'
        },
        {
          link: 'https://events.douban.com',
          class: 'lnk-events',
          title: '同城'
        },
        {
          link: 'https://group.douban.com',
          class: 'lnk-group',
          title: '小组'
        },
        {
          link: 'https://read.douban.com/?dcs=top-nav&dcm=douban',
          class: 'lnk-read',
          title: '读书'
        },
        {
          link: 'https://fm.douban.com',
          class: 'lnk-fm',
          title: 'FM'
        },
        {
          link: 'https://dognxi.douban.com',
          class: 'lnk-dongxi',
          title: '东西'
        },
        {
          link: 'https://market.douban.com',
          class: 'lnk-market',
          title: '市集'
        },
        {
          link: 'https://github.com/jiakeqi/douban',
          class: 'lnk-github',
          title: '开源在 Github'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
#vheader 
  height 28px
  background-color pink
  background-color #545652

  .nav-links 
    display inline-block

  .nav-links li 
    display inline-block

  .more-items 
    position absolute
    background-color white
    display none
    padding 10px 3px

  .more-items li 
    display block
    padding 0 5px
    height 30px
    
  .more-items li a 
    color gray
    line-height 30px
    height 100%

  .more-items li:hover 
    background-color rgb(233, 233, 233)

  .nav-info 
    display inline-block
    float right
    margin-right 15px

  .nav-doubanapp 
    display inline-block
    float right

  a 
    padding 0 12px
    height 28px
    line-height 28px
    color #d5d5d5

  a:hover 
    color white
</style>