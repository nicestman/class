<template lang="jade">
#index-reg-new
  .wapper
    .app
      .summary
        p.app-title
          | {{item.title}}
          span.version {{item.version}} 
        p.app-slogan {{item.slogan}}
        a.download-app.size12(:href='item.lnk_app') 下载豆瓣App
        img.download-qr(:src='item.expand_qr', @mouseover='mouseover()')
        .download(@mouseout='mouseout()', @mouseover='mouseover()')
          img.download-qr-h(:src='item.qr_expand')
          label iOS/Android扫码直接下载
    .login.index-side-w
      form
        input.inp-email.inp(type='text', placeholder='邮箱/手机号')
        input.inp-pass.inp(type='text', placeholder='密码')
        button.btn-login.btn 登陆豆瓣
        button.btn-logup.btn 注册账号
        .action
          input#box-remb(type='checkbox', value='remb')
          label.remb-label(for='box-remb') 记住我
          ul.other-login
            li
              a.weibo(title='微博登陆', target='_blank')
            li
              a.wechat(title='微信登陆', target='_blank')
</template>

<script>
export default {
  name: 'index-reg-new',
  props: ['item'],
  methods: {
    mouseover: function () {
      document.querySelector('.download').style.display = 'block'
    },
    mouseout: function () {
      document.querySelector('.download').style.display = 'none'
    }
  }
}
</script>

<style lang="stylus">
#index-reg-new
  background-image url('/doubanapp4_bg.png');
  height 180px
  width 100%
  background-position top right
  background-repeat no-repeat
  background-color #f1faf1
  margin-bottom 30px

  .wapper .app
    height inherit
    width 630px
    position  absolute
    background url('/doubanapp4.png')

  .summary
    float right
    width 200px
    height 100%

  .app-title
    position relative
    font-size 25px
    top 35px
    font-weight bold
    line-height 24px
    -webkit-font-smoothing antialiased
    text-rendering optimizelegibility

  .version
    position relative
    left 10px
    font-weight 100

  .app-slogan
    position relative
    top 43px
    letter-spacing 12px
    font-size 10px

  .download-app
    display inline-block
    height 30px
    width 110px
    background-color #00B51D
    color #FFF
    line-height 30px
    text-align center
    border-radius 2px
    position relative
    top 55px
    clear both

  .download-qr
    width 28px
    height 28px
    clear both
    position relative
    top 66px
    left 5px
    border 1px solid #00B51D

  .download
    background-color:white
    position relative
    left 115px
    top 25px
    display none
    width 200px
    height 230px
    z-index 2
    border 1px solid black

  .download img
    margin 20px
    width 160px
    height 160px

  .download label
    position relative
    left 20px
    top -5px
    width 160px
    font-size:13.5px
    text-align:center

  .login
    height calc(100% - 60px)
    position relative
    top 30px
    float right

  .inp
    width calc(100% - 21px)
    height 28px
    padding 0 7px
    position relative
    margin-bottom 4px

  .btn
    position relative
    width calc(50% - 6px)
    height 30px
    background-color rgba(1,1,1,0)
    border none

  .btn-login
    background-color #30A080
    color white
    margin-right 5px
        
  .btn-logup
    border 1px solid #30A080
    color #30A080

  .action
    position relative
    top 10px

  #box-remb
    display inline-block

  .remb-label
    position relative
    font-size 10px

  .other-login
    float right
    height 20px

    li
      position relative
      float right
      top -5px
      a
        display inline-block
        width 20px
        height 20px
        cursor pointer

    .wechat
      background url('/wechat.png')  no-repeat 100% 100%

    .weibo
      background url('/weibo.png')  no-repeat 100% 100%
</style>