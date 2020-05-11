<template>
  <div id="app">
    <indexHeader v-show="flag"></indexHeader>
    <!-- <indexSwper v-show="flag"></indexSwper> -->
    <router-view />
    <indexFooter v-show="flag"></indexFooter>

  </div>
</template>

<script>
  import indexHeader from './components/public/indexHeader'
  import indexSwper from './components/public/indexSwper'
  import indexFooter from './components/public/indexFooter'
  export default {
    name: 'App',
    data() {
      return {
        flag: true //判断是否是登录页 || 注册页 || 找回密码页
      }
    },
    components: {
      indexHeader,
      indexSwper,
      indexFooter
    },
    created() {
      if (this.$route.fullPath.indexOf('login') != -1 || this.$route.fullPath.indexOf('register') != -1 || this.$route
        .fullPath.indexOf('downLoad') != -1) {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    watch: {
      $route(to) {
        if (to.path.indexOf('login') != -1 || to.path.indexOf('register') != -1 || this.$route.fullPath.indexOf(
            'downLoad') != -1) {
          this.flag = false
        } else {
          this.flag = true
        }
      }
    }
  }

</script>
<style lang="less">
  body::-webkit-scrollbar,
  html::-webkit-scrollbar {
    // display: none;
  }
</style>
