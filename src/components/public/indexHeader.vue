<template>
  <div>
    <div class="header" id="header">
      <div class="headerBox">
        <div class="logo">
          <router-link to="/">
            <img src="../../assets/img/logo.png" alt="">
          </router-link>
        </div>
        <div class="navigation">
          <el-menu :default-active="activeIndex"
                   class="el-menu-item"
                   mode="horizontal"
                   @select="handleSelect"
                   text-color="#444444"
                   active-text-color="#fff"
          >
            <el-menu-item index="/index.html">首页</el-menu-item>
            <el-menu-item index="/partyBuild.html">党建动态
              <div class="showNav">
                <a href="javascript:;" @click="goTo('/partyBuild.html','#area')">区级动态</a>
                <a href="javascript:;" @click="goTo('/partyBuild.html','#town')">镇级动态</a>
                <a href="javascript:;" @click="goTo('/partyBuild.html','#village')">村级动态</a>
<!--                <a href="javascript:;" @click="goTo('/partyBuild.html','#study')">党建学习</a>-->
              </div>
            </el-menu-item>
            <el-menu-item index="/MorganizeTeach.html">党建学习</el-menu-item>
            <el-menu-item index="/organize.html">组织建设
              <!--<div class="showNav">
                <a href="javascript:;" @click="goTo('/organize.html','.build')">组织建设</a>
                <a href="javascript:;" @click="goTo('/organize.html','.map')">党建地图</a>
              </div>-->
            </el-menu-item>
            <el-menu-item index="/forum.html">论坛服务
              <div class="showNav">
                <a href="javascript:;" @click="goTo('/forum.html','#QuestionAndAnswer')">党建问答</a>
                <a href="javascript:;" @click="goTo('/forum.html','#imageAndText')">党建图文</a>
                <a href="javascript:;" @click="goTo('/forum.html','#message')">消息发布</a>
              </div>
            </el-menu-item>
            <el-menu-item index="/volunteer.html">志愿活动</el-menu-item>
            <el-menu-item index="/userCenter.html">个人中心</el-menu-item>
            <el-menu-item class="downLoadImg">用户下载
                <div id="downLoadImg">
                  <p>
                    <img src="../../assets/img/triangle.png" alt="">
                  </p>
                  <div>
                    <div>
                      <button @click="downLoad(0)">
                        <img src="../../assets/img/android.png" alt="">
                        <span>App下载</span>
                      </button>
                      <!--  <button @click="downLoad(1)">
                          <img src="../../assets/img/hand.png" alt="">
                          <span>点触屏下载</span>
                        </button>-->
                    </div>
                    <div>
                      <img src="../../assets/img/erwei.png" alt="">
                      <p>扫描二维码下载</p>
                    </div>
                  </div>
                </div>
            </el-menu-item>
          </el-menu>
        </div>
      </div>

    </div>
    <!--轮播图-->
  </div>
</template>

<script>
  export default {
    name: "indexHeader",
    data(){
      return {
        activeIndex: '/index',
        flag:0,//0下载app 1下载平板
        appLink:"",//app下载路径
        tablet:""//平板下载路径
      }
    },
    methods:{
      handleSelect(key,keyptah){
        this.$router.push(key)
      },
      goTo(path,id){
        this.$router.push(path);
        let that = this;
        setTimeout(function () {
          that.goAddress(String(id));
        },300);
      },
      judge(way){
        let cutOut = way.substring(0,6);
        switch (cutOut) {
          case '/party':
            if(way.indexOf('/party') != -1){
              this.activeIndex = '/partyBuild.html'
            }
            break;
          case '/organ':
            if(way.indexOf('/organ') != -1){
              this.activeIndex = '/organize.html'
            }
            break;
          case '/Morganize':
            if(way.indexOf('/Morganize') != -1){
              this.activeIndex = '/MorganizeTeach.html'
            }
            break;
          case '/forum':
            if(way.indexOf('/forum') != -1){
              this.activeIndex = '/forum.html'
            }
            break;
          case '/volun':
            if(way.indexOf('/volun')!= -1){
              this.activeIndex = '/volunteer.html'
            }
            break;
          case '/userC':
            if(way.indexOf('/userC') != -1){
              this.activeIndex = '/userCenter.html'
            }
            break;
        }
      },
      //点击下载各自的应用
      downLoad(num){
        window.open(this.appLink);
        /* if(num == 0){
           //下载app
           window.open(this.appLink);//后台传过来的app下载路径
         }else if(num == 1){
           //下载平板
           window.open(this.tablet)//后台转过来的平板下载路径
         }*/
      },
      //获取app下载路径
      getAppLink(){
        this.$axios.post('/F_Information/getInformationListApp',this.qs({
          news_type: 90,
          city: 129,
          province: 4
        })).then(msg=> {
          this.appLink = msg.data.data.list[0].address
        })
      }
    },
    mounted() {
      this.activeIndex = this.$route.path;
      this.judge(this.$route.path);
    },
    created(){
      this.getAppLink()
    },
    watch: {
      $route(to){
        this.activeIndex = to.path;
        this.judge(to.path);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/public.less";
  #header{
    width: 100%;
    position: relative;
  }
  .headerBox{
    width: 1200px;
    position: relative;
    margin: 0 auto;
    display: flex;
    height: 80px;
  }
  .logo{
    flex: 1;
    margin-top: 10px;
  }
  .logo > a > img{
    background-color: transparent;
    display: block;
    width: 230px;
    height: 55px;

  }
  .navigation{
    flex: 3;
    display: flex;
    justify-content : flex-end;
    & /deep/  .el-menu-item{
      font-size: 17px;
      line-height: 80px;
      /*padding: 0 25px;*/
      height: 80px;
      position: relative;
    }
    & /deep/ .el-menu-item:hover{
      & > .showNav{
        display: flex;
      }
    }
    & /deep/ .downLoadImg{
      position: relative;
    }
    & /deep/ .downLoadImg > #downLoadImg{
      display: none ;
      position: absolute;
      top:110px;
      right:0;
      z-index: 999;
      width: 450px;
      height: 245px;
      background-color: #ffffff;
      box-sizing: border-box;
      align-items: center;
      padding: 0 30px;
      &>p{
        width: 100%;
        height: 30px;
        position: absolute;
        top:-30px;
        left: 0;
      }
      &>p > img{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 38px;
        top: 0;
      }
      &> div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      &> div > div:first-child > button{
        background-color: #e71f19;
        width: 190px;
        height: 36px;
        border-radius: 5px;
        cursor: pointer;
      }
      &> div > div:first-child > button > span{
        color: #ffffff;
      }
      &> div > div:last-child > img{
          width: 140px;
          height: 130px;
      }
      &> div > div:last-child > p{
        color: #ff2828;
        text-align: center;
      }
    }
    & /deep/ .downLoadImg:hover > #downLoadImg{
      display: flex;
    }

  }

  .navigation /deep/.is-active{
    background-color: #d71718 !important;
    border-bottom: 1px solid #d71718 !important;
  }
  .navigation /deep/ .el-menu.el-menu--horizontal{
    border: none;
    background-color: #ffffff;
  }
  .navigation /deep/ .el-menu-item{
    padding-bottom: 1px !important;
  }
  .navigation /deep/ .el-menu-item > .el-menu-item:hover{
    background-color: #d71718;
    color: #ffffff !important;
    border-bottom:1px solid #d71718 !important;
  }
  .showNav{
    display: none;
    z-index: 999;
    position: absolute;
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    left: 0;
    flex-wrap: wrap;
    width: 100%;
  }
  .showNav > a{
    color: #000000 !important;
    width: 100%;
    text-align: center;
  }
  .showNav > a:hover{
    background-color: #d71718;
    color: #ffffff !important;
  }
</style>
