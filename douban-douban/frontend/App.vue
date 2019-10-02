<template>
  <div id="app">
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
@import "./assets/main.styl"
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
