<template>
    <div>
        <div id="header">
            <div class="headerBox">
              <a href="/" class="logoLink">
                <div class="logo"></div>
              </a>
              <div class="userBox">
                <i class="iconfont">&#xe663;</i>
              </div>
              <i class="iconfont pullDown">&#xe65b;</i>
              <div class="messageBox">
                <i class="iconfont">&#xe670;</i>
              </div>
            </div>
        </div>

        <div id="banner">
          <el-carousel indicator-position="outside" trigger="click" height="676px">
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="../../../static/img/banner.png">
            </el-carousel-item>
          </el-carousel>
          <div class="nav">

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#999999" active-text-color="#BC0000">
              <el-submenu class="firstStyle" index="2">
                <template slot="title"><i class="iconfont addStyle">&#xe64e;</i>{{address}}</template>
                <div class="titleBox">
                  <el-menu-item index="2-1">无敌镇新农村</el-menu-item>
                  <el-menu-item index="2-2">美丽镇新农村</el-menu-item>
                  <el-menu-item index="2-3">无名镇新农村</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item index="1">党建首页</el-menu-item>
              <el-menu-item index="2">组织建设</el-menu-item>
              <el-menu-item index="3">论坛服务</el-menu-item>
              <el-menu-item index="4">志愿活动</el-menu-item>
            </el-menu>

          </div>
        </div>

    </div>
</template>

<script>
  export default {
      name: "Header",
      data(){
        return{
          activeIndex: '1',
          activeIndex2: '1',
          address:'龙石镇新农村'
        }
      },
      methods: {
      handleSelect(key, keyPath) {
        console.log(key);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~@/assets/less/public.less";
  #header{
    width: 100%;
    height: 110px;
    background-color: @bgColor;

  }
  #header > .headerBox{
    position: relative;
    width: 970px;
    margin: 0 auto;
    display: flex;
    padding-top: 20px;
  }
  .logoLink{
    flex: 4;
  }
  .logo{
    width: 471px;
    height: 75px;
    background-image: url("../../assets/img/logo.jpg");
    background-size:cover;
  }
  .userBox,.messageBox{
    width: 60px;
    height: 60px;
    background-color: #e7e7e7;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content : center;
    align-items : center;
  }
  .userBox > i,.messageBox > i{
    font-size: 40px;
  }
  .userBox > i{
    font-size: 43px;
    margin-bottom: 6px;
  }
  .pullDown{
    color: #e7e7e7;
    margin-top: 25px;
    cursor: pointer;
    margin-right: 56px;
  }
  #banner{
    width: 100%;
    height: 676px;
    position: relative;
  }
  #banner /deep/ .el-carousel__indicators{
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
  }
  #banner /deep/ .el-carousel__button{
    width: 40px;
    height: 5px;
    background-color: @bgColor;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .nav{
    position: absolute;
    width: 1200px;
    height: 120px;
    bottom: -50px;
    z-index: 99;
    left: 50%;
    transform: translate(-50%);
    box-shadow: 0 3px 1px rgba(0,0,0,0.04);
  }
  .firstStyle /deep/ .el-submenu__title{
        color: #fff;
  }
  .nav > .el-menu-demo{
    border-radius: 10px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-menu-item{
    font-size: 26px;
  }

  .nav /deep/ .el-submenu__title{
    font-size: 18px;
  }
  .titleBox /deep/ .el-menu-item{
    font-size: 12px;
  }
  .addStyle{
    font-size: 20px;
    color: #f95057;
    position: absolute;
    left: -5px;
  }
</style>
