<template lang="jade">
#index-footer.wapper.size12
  span.icp
    | © 2005－2016 douban.com, all rights reserved 北京豆网科技有限公司
    br
    a
      | 京ICP证090015号
    | 京ICP备11027288号 网络视听许可证0110418号
    br
    |       京网文[2015]2026-368号  
    img(src='/biaoshi.gif')
    a 京公网安备11010502000728
    |       新出网证(京)字129号 
    br
    |       违法和不良信息举报电话：4008353331
    img(src='/file-1423193113.png')
    br
    img(src='/jubao.png')
    a 中国互联网举报中心 
    |       电话：12377
  span.about
    a 关于豆瓣 
    | · 
    a 在豆瓣工作
    | · 
    a 联系我们
    | · 
    a 免责声明
    | ·
    a 帮助中心
    | ·
    a 移动应用
    | ·
    a 豆瓣广告
</template>

<script>
export default {

  ready () {
    var tags = document.getElementsByTagName('a')
    for (var i = 0; i < tags.length; i++) {
      tags[i].className += ' a-link'
    }
  },

  name: 'index-footer',

  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">

@import '../../assets/main.styl'

#index-footer
  overflow hidden
  zoom 1
  padding 14px 0
  margin-top 30px
  border-top 1px dotted lightgray
  line-height 20px

  .icp 
    float left 

  .about 
    float right 

  img
    height 16px
    align top
    cursor auto

  a
    display inline-block
</style>