<template>
<dir id="vfooter" class="wapper size12">
  <span class="icp">
      © 2005－2016 douban.com, all rights reserved 北京豆网科技有限公司<br/>
    </span>
  <span class="about">
    <a>关于豆瓣 </a>· 
    <a>在豆瓣工作</a>· 
    <a>联系我们</a>· 
    <a>免责声明</a>·
    <a>帮助中心</a>·
    <a>移动应用</a>·
    <a>豆瓣广告</a>
  </span>
</dir>
  
</template>

<script>
export default {

  name: 'vfooter',

  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
#vfooter
  clear both
  display block
  color #999
  padding 12px 0
  position relative
  top 40px
  overflow hidden
  zoom 1
  border-top 1px dashed #ddd
  .icp
    float left 
  .about
    float right
  a
    display inline-block

</style>