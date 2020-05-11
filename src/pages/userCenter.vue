<template>
  <div class="userCenter">
    <div class="title" :class="{active : topDistance>=700}">
      <div class="nav typeArea">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>{{title}}</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
    </div>
    <div class="userinfo typeArea">
      <div class="left" >
        <p>
          <span><img :src="userMsg.pic_id" alt=""></span>
          <span>{{userMsg.name}}</span>
        </p>
        <!-- <ul>
          <li @click="goCurrent(index)" v-for="(item,index) in data" :key="index" :class="{action:index===curIndex}"><i class="iconfont">{{item.icon}}</i><span>{{item.title}}</span><span>{{item.icon1}}</span></li>
        </ul> -->
        <el-menu default-active="1" active-text-color="#ff6868" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1" @click="go(0)">
            <i class="iconfont">&#xe635;</i>
            <span slot="title">与我相关</span>
          </el-menu-item>
          <el-menu-item index="2"  @click="go(1)">
            <i class="iconfont">&#xe759;</i>

            <span slot="title">通知消息</span>
          </el-menu-item>
          <el-menu-item index="3"  @click="go(2)">
            <i class="iconfont">&#xe630;</i>
            <span slot="title">积分排行</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title" >
              <i class="iconfont">&#xe664;</i>
              <span>个人资料</span>
            </template>
            <el-menu-item-group >
              <el-menu-item class="notBorder" index="1-1" @click="go(3)"><i class="iconfont">&#xe617;</i>个人信息</el-menu-item>
              <el-menu-item class="notBorder" index="1-2" @click="go(4)"><i class="iconfont">&#xe617;</i>密码修改</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <p @click="exit" class="bottom"><i class="iconfont">&#xe613;</i><span>账号退出</span></p>
      </div>
      <div class="right">
        <!-- <transition name="el-fade-in-linear"> -->
        <keep-alive>
          <component :is="cur" :type="type" :userMsg="userMsg"></component>
          <!-- </transition> -->
        </keep-alive>
      </div>
    </div>
  </div>
</template>


<script>
    import aboutUs from "./aboutUs"
    import integral from "./integral"
    import userMessage from "./userMessage"
    import notice from "./notice"


    export default {
        name: "userCenter",
        data() {
            return {
                topDistance: 0,
                curIndex: 1,
                cur: aboutUs,
                title: "与我相关",
                type:'',
                userMsg:{},
            }
        },
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.$axios.post("/logins/isLogin").then((res) => {
                    if (res.status == 200 && res.data.status == 400) {
                        vm.$confirm("此页面需要登录", "提示", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.$router.push({
                                name: 'login'
                            })
                        }).catch(() => {
                            vm.$router.go(-1)
                        })
                    } else {
                        next()
                    }
                })
            })
        },

        components: {
            aboutUs,
            notice,
            integral,
            userMessage,
        },
        mounted() {

            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            //指定位置悬浮
            handleScroll() {
                let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
                this.topDistance = top
            },
            go(i) {


                this.type=i;

                var arr = ["aboutUs", "notice", "integral", "userMessage"];
                var titles=["与我相关","通知消息","积分排行","个人信息","密码修改","头像修改"];

                this.title=titles[i]
                if(i>=3){
                    this.curIndex = i;
                    this.cur = arr[3];
                }else{
                    this.curIndex = i;
                    this.cur = arr[i];
                }
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            //退出
            exit() {
                this.$confirm('是否要退出当前账号？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*1、发送请求退出
                     * 2、退出成功恢复本地存储的userArea
                     * 3、删除本地存储的用户信息
                     * 4、删除
                     * */
                    this.$axios.post('/logout').then((res) => {
                        if (res.status == 200 && res.data.code == 0) {
                            this.$router.push({
                                name: "index"
                            })
                            window.localStorage.removeItem("userMsg")
                            window.localStorage.removeItem("userArea")

                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //*存储信息
            StorageUserMsg(){
                this.userMsg = JSON.parse(window.localStorage.getItem("userMsg"))
            }

        },
        created() {
            // this.isLogin(this.StorageUserMsg); 
            this.StorageUserMsg();
            console.log(this.userMsg);
        }
    }
</script>

<style scoped lang="less">
  .title {
    width: 100%;
    background: #e8e8e8;
    .nav {
      display: flex;
      height: 50px;
      justify-content: space-between;
      align-items: center;

      p {
        a {
          color: #e92c16;
          border-bottom: 2px solid #e92c16;
          padding-bottom: 12px;
        }
      }
    }
  }

  .active {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .action {
    background: #fff4f4;
  }
  .el-menu-item{
    height:60px;
    line-height: 60px;
  }
  .el-menu-item,.el-submenu__title{
    font-size:16px;
    border-bottom:1px solid #e92c16;
    text-align: center!important;
    // padding:15px 0;
    i{
      font-size: 25px;
      margin-right: 10px;
    }
  }
  .left/deep/.el-menu-item-group__title{
    padding:0;
  }
  .left/deep/.el-menu-item:hover,.left/deep/.el-submenu__title:hover{

    background: #fff4f4;
  }
  .left/deep/.el-submenu__title{

    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
  }
  .el-submenu{
    border-bottom:1px solid #e92c16;

  }
  .el-submenu__title{
    border-bottom:1px solid #e92c16;
    text-align: center;
  }
  .bottom:hover{
    background: #fff4f4;

  }
  .userinfo {
    border: 1px solid #e92c16;
    margin: 100px auto;
    display: flex;

    .left {
      width:25%;
      border-right: 1px solid #ff6868;

      p:first-child {
        padding: 20px 0 10px 0;
        border-bottom: 1px solid #ff6868;

        text-align: center;

        span:first-child {
          display: inline-block;
          width: 156px;
          height: 156px;
          border-radius: 50%;
          margin-bottom: 20px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        span:last-child {
          display: block;
          text-align: center;
        }
      }

      p:last-child {
        line-height: 60px;
        height: 60px;
        text-align: center;
        border-bottom: 1px solid #ff6868;
        cursor: pointer;


        i {
          color: #ff6868;
          font-size: 25px;
          margin-right: 10px;
        }
      }
    }

    .right {
      width:75%;

    }
    .left /deep/ .el-menu-item-group .el-menu-item{
      height: 60px;
      line-height: 60px;
      border-top: 1px solid #ff6868;
    }
  }
  .notBorder{
    border-bottom: none !important;
  }
</style>
