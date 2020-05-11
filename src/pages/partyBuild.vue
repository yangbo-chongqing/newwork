<template>
  <div id="partyBuild">
    <!--    导航栏-->
    <div id="nav" :class="{active : topDistance>=67}">
      <div class="typeArea">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="toolIndex === 0" >区级动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="toolIndex === 1" >镇级动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="toolIndex === 2" >村级动态</el-breadcrumb-item>
       <!--   <el-breadcrumb-item v-if="toolIndex == 3" >党建学习</el-breadcrumb-item>-->
          <!--  <el-breadcrumb-item v-if="toolIndex == 3" >在线发布</el-breadcrumb-item>-->
        </el-breadcrumb>
        <ul>
          <li @click="goAddress('#area')">
            <a href="javascript:;" :class="{active:toolIndex === 0}">区级动态</a>
          </li>
          <li @click="goAddress('#town')">
            <a href="javascript:;" :class="{active:toolIndex === 1}">镇级动态</a>
            <i></i>
          </li>
          <li @click="goAddress('#village')">
            <a href="javascript:;" :class="{active:toolIndex === 2}">村级动态</a>
            <i></i>
          </li>
         <!-- <li @click="goAddress('#study')">
            <a href="javascript:;" :class="{active:toolIndex == 3}">党建学习</a>
            <i></i>
          </li>-->
        </ul>
      </div>
    </div>
    <div id="Myborder" style="width: 100%;height: 50px" v-show="topDistance>67"></div>
    <!--    区级动态开始-->
    <div id="area">
      <div class="logo">
        <img src="../assets/img/dw.png" alt="">
      </div>
      <!--        标题-->
      <h2 class="wow slideInLeft">区级动态</h2>
      <!--        副标题-->
      <div class="smallTitle">
        <!--to="/partyBuildList"-->
        <a href="javascript:;"  @click="goMore(area[0].information_lable)">查看更多 <i class="iconfont">&#xe653;</i> </a>
      </div>
      <div id="areaList" class="typeArea">
        <el-carousel :interval="4000" type="card" height="518px">
          <el-carousel-item v-for="(item,index) in area" :key="index" >
            <!--时间-->
            <h3>
              {{ item.create_date | getMonth}}
              <span>{{item.create_date | getYear}}</span>
            </h3>
            <!--标题-->
            <h4 @click="partyBuildDetails(item.news_id)">
              {{ item.title }}
            </h4>
            <!--图片-->
            <img :src="item.contentPic | getOneImg" @click="partyBuildDetails(item.news_id)">
            <!--内容-->
            <p v-html="item.introduction">
            </p>
            <!--查看详情-->
            <a href="javascript:;" @click="partyBuildDetails(item.news_id)">查看详情 ></a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--    镇级动态开始-->
    <div id="town">
      <div class="logo">
        <img src="../assets/img/dw.png" alt="">
      </div>
      <!--        标题-->
      <h2 class="wow slideInLeft">镇级动态</h2>
      <!--        副标题-->
      <div class="smallTitle">
        <a href="javascript:;" to="/partyBuildList" @click="goMore(townList[0].information_lable)">查看更多 <i class="iconfont">&#xe653;</i> </a>
      </div>
      <!--      镇级动态展示-->
      <div id="townList" class="typeArea wow fadeInUp">
        <div class="item" v-for="(item,index) in townList" :key="index" >
          <img :src="item.contentPic | getOneImg" alt="">
          <div>
            <!--            标题-->
            <h3 class="title">{{ item.title }}</h3>
            <!--            简介-->
            <p>{{ item.introduction }}</p>
            <!--            查看详情-->
            <div class="details" >
              <div @click="partyBuildDetails(item.news_id )">
                <span>{{ item.create_date | formatTime}}</span>|<a href="javascript:;">详情</a>
              </div>
              <i class="iconfont">&#xe639;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    镇级动态结束-->
    <!--    村级动态开始-->
    <div id="village">
      <div class="logo">
        <img src="../assets/img/dw.png" alt="">
      </div>
      <!--        标题-->
      <h2 class="wow slideInLeft">村级动态</h2>
      <!--        副标题-->
      <h3 class="wow slideInRight">村级发布的最新动态消息</h3>
      <!--        村级新闻 左图右列表-->
      <div class="typeArea villageNews wow slideInUp">
        <!--          村级新闻最新的一条-->
        <div id="villageNewsOne">
          <!--            新闻时间-->
          <p class="time">{{ oneVillage.create_date | getMonth }} <span style="font-size: 20px">{{ oneVillage.create_date | getYear }}</span> </p>
          <!--            新闻标题-->
          <p class="title">
            {{ oneVillage.title }}
          </p>
          <!--            新闻图片-->
          <img :src="oneVillage.contentPic | getOneImg" alt="">
          <!--            简介-->
          <p class="introduction" v-html="oneVillage.introduction"></p>
          <a href="javascript:;" @click.prevent="partyBuildDetails(oneVillage.news_id)">查看详情 <i class="iconfont">&#xe653;</i> </a>
        </div>
        <div id="villageNewsList">
          <h3>
            <span>近期动态</span>
            <a href="javascript:;" to="/partyBuildList" @click="goMore(villageList[0].information_lable)">查看更多 <i class="iconfont">&#xe653;</i> </a>
          </h3>
          <!--新闻列表-->
          <ul>
            <li v-for="(item,index) in villageList" :key="index" @click="partyBuildDetails(item.news_id)">
              <span >{{ item.title }}</span>
              <span>{{item.create_date | formatTime}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--    村级动态结束-->


  </div>
</template>

<script>
    import {WOW} from 'wowjs';
    /*党员学习*/
    export default {
        name: "partyBuild",
        data(){
            return {
                topDistance:0,
                toolIndex:0,
                imgList:[],
                news_type:88,//发帖时的类型 news_type=88（党建图文）  news_type=89（党建问答）
                formArticle:"",//富文本内容
                title:"",//论坛标题
                wangEdit: null,
                userArea:{},//用户的地址信息
                villageList:[],//村级信息列表
                townList:[],//镇级消息列表
                area:[],//级消息列表
                oneVillage:{},
            }
        },
        methods:{
            //指定位置悬浮
            handleScroll() {
                let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
                this.topDistance = top
                if(top<=1133){
                    this.toolIndex = 0
                }else if(top>1133 && top<=2533){
                    this.toolIndex = 1
                }
                else{
                    this.toolIndex = 2
                }
            },
            // 党建动态详情页
            partyBuildDetails(news_id){
                this.$router.push({
                    name:"partyBuildDetails",
                    query:{
                        news_id:this.Base64.encode(news_id)
                    }
                })
            },
            upData(){
                const title = this.title.trim()
                if(title.length == 0){
                    this.$message.error('标题不能为空');
                    return false
                }
                this.formArticle = this.wangEdit.txt.html()
                const content = this.formArticle.trim()
                if(content.length == 0){
                    this.$message.error('内容不能为空');
                    return false
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                const  introduction = this.wangEdit.txt.text().replace(/(&nbsp;|\s)/g,"")

                //发送请求
                this.$axios.post('information/insertAndUpdate',this.qs({
                    news_type:this.news_type,
                    title,//标题
                    content,//内容
                    introduction,// 简介
                })).then(msg=>{
                    if(msg.status  == 200 && msg.data.status == 200){
                        //发布成功
                        //清空富文本内容
                        loading.close();
                        this.$message('发布成功');
                        this.formArticle = ""
                        this.title = ""
                        this.wangEdit.txt.html(this.formArticle);
                    }else if(msg.status  == 200 && msg.data.status == 500){
                        loading.close();
                        //未登录，弹出提示框
                        this.$confirm('此功能需要登录是否前往登录页？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push("/login")
                        }).catch(() => {
                            loading.close();
                        });
                    }else{
                        //检查网络
                        this.$alert('发布失败，请检查您的网络', '标题名称', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            //获取村级动态
            getVillageList(){
                this.$axios.post('F_Information/getInformationListApp',this.qs({
                    province:this.userArea.province,
                    city:this.userArea.city,
                    district:this.userArea.district,
                    street:this.userArea.street,
                    community:this.userArea.community,
                    news_type:47,
                    information_lable:5,//村
                    pageSize:12,
                    pageCurrent:1
                })).then(msg=>{
                    if(msg.status == 200){
                        this.villageList = msg.data.data.list
                    }else{
                        this.$alert('获取数据失败，请稍后再试', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            getOneVillage(){
                let msg = Object.assign(this.userArea,{
                    news_type:47,
                    information_lable:5,//村
                    pageSize:1,
                    pageCurrent:1
                })
                this.$axios.post('F_Information/getInformationListApp',this.qs(msg)).then(msg=>{
                    if(msg.status == 200){
                        this.oneVillage = msg.data.data.list[0]
                    }else{
                        this.$alert('获取数据失败，请稍后再试', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            //获取镇级
            getTownList(){

                this.$axios.post('F_Information/getInformationListApp',this.qs({
                    province:this.userArea.province,
                    city:this.userArea.city,
                    district:this.userArea.district,
                    street:this.userArea.street,
                    news_type:47,
                    information_lable:4,//镇
                    pageSize:6,
                    pageCurrent:1
                })).then(msg=>{
                    if(msg.status == 200){
                        this.townList = msg.data.data.list
                    }else{
                        this.$alert('获取数据失败，请稍后再试', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            //获取区级
            getAreaList(){
                this.$axios.post('F_Information/getInformationListApp',this.qs({
                    province:this.userArea.province,
                    city:this.userArea.city,
                    district:this.userArea.district,
                    news_type:47,
                    information_lable:3,//区
                    pageSize:3,
                    pageCurrent:1
                })).then(msg=>{
                    if(msg.status == 200){
                        this.area = msg.data.data.list
                    }else{
                        this.$alert('获取数据失败，请稍后再试', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            //前往列表页
            goMore(information_lable){
                console.log(information_lable);
                this.$router.push({
                    name:"partyBuildList",
                    query:{
                        information_lable:this.Base64.encode(information_lable)
                    }
                })
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll, true)
            this.wangEdit =  this.createE()
            new WOW().init();
        },
        created(){
            /* this.isLogin()*/
            this.userArea = this.getUserArea()
            this.isUserArea();
            this.getVillageList()
            this.getTownList()
            this.getAreaList()
            this.getOneVillage()
        },
        filters:{
            getYear(time){
                time = new Date(time)
                return time.getFullYear()
            },
            getMonth(time){
                time = new Date(time)
                const month =  time.getMonth()+1>9?time.getMonth()+1:"0"+(time.getMonth()+1)
                const date = time.getDate()>9?time.getDate():"0"+time.getDate()
                return month+"-"+date
            }
        }
    }
</script>

<style scoped lang="less">
  //村级标题
  .title(@color:"#333"){
    line-height: 60px;
    color: @color;
    font-weight: 400;
    text-align: center;
  }
  //多行文本溢出显示省略号
  .line(@line:2){
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @line;
    overflow: hidden;
  }
  //单行文本溢出显示省略号
  .omit(){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #partyBuild{
    width: 100%;
    user-select: none;
    /*导航栏*/
    &>#nav{
      width: 100%;
      height: 50px;
      background-color: #e8e8e8;
      &>.typeArea {
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>ul{
          height: 100%;
          display: flex;
          li{
            height: 100%;
            width: 95px;
            text-align: right;
            line-height: 50px;
            position: relative;
            margin-left: 30px;
            a{
              display: inline-block;
              height: calc(100% - 2px);
              &.active{
                border-bottom: 2px solid #e61a18;
                color: #e61a18;
              }
            }
            i{
              position: absolute;
              left: 0;
              width: 2px;
              height: 2px;
              top:50%;
              transform: translateY(-50%);
              background-color: #000;
            }
          }
        }
      }
      &.active{
        position: fixed;
        top:0;
        left: 0;
        z-index: 999;
      }
    }
    /*村级动态*/
    &>#village{
      width: 100%;
      min-height: 760px;
      padding: 80px 0 110px;
      box-sizing: border-box;
      /*logo*/
      &>.logo{
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        margin-bottom: 30px;
        &>img{
          width: 460px;
          height: 124%;
        }
      }
      /*  主标题*/
      &>h2{
        font-size: 32px;
        color: #ff0101;
        .title
      }
      /*  副标题*/
      &>h3{
        font-size: 16px;
        margin-bottom: 50px;
        .title
      }
      /*  村级新闻 左图右列表 */
      &>.villageNews{
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        /*左图*/
        #villageNewsOne:hover{
          border: 1px solid #ff0000;
          box-shadow: 0 0 20px rgba(255, 0, 0,.2);
        };
        #villageNewsOne{
          width: 400px;
          height: 555px;
          box-sizing: border-box;
          padding:0 16px;
          background-color: #fff  ;
          box-shadow: 0 0 6px rgba(0, 0, 0,.2);
          border: 1px solid transparent;
          position: relative;
          &>.time{
            width: 100%;
            padding-top:20px;
            line-height: 45px;
            font-size: 32px;
            font-weight: 700;
            color: #e22121;
            border-bottom: 1px solid #d6d6d6;
          }
          &>.title{
            .line();
            box-sizing: border-box;
            padding: 10px 0;
            height: 100px;
            line-height: 40px;
          }
          &>img{
            width: 100%;
            height: 224px;
          }
          &>.introduction{
            padding-top: 15px;
            width: 100%;
            line-height: 30px;
            .line(3)
          }
          &>a{
            position: absolute;
            bottom: 18px;
            left: 16px;
            color: #ff9b59;
            &:hover{
              color: #e22121;
            }
          }
        }
        /*右列表*/
        #villageNewsList{
          width: 708px;
          height: 555px;
          &>h3{
            /*border-left: 10px solid #ff2828;*/
            border-bottom: 1px solid #ff2828;
            /*padding-left: 10px;*/
            height: 35px;
            display: flex;
            justify-content: space-between;
            align-items: start;
            padding-bottom: 10px;
            &>span{
              font-size: 25px;
              color: #e70d1d;
              font-weight: normal;
            }
            &>a{
              color: #fa8014;
              font-size: 14px;
              font-weight: normal;
              margin-top: 10px;
              &:hover{
                color: #e70d1d;
              }
            }
          }
          &>ul{
            width: 100%;
            height: 515px;
            &>li{
              width: 100%;
              line-height: 44px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              &>span:first-of-type{
                width: 85%;
                height: 100%;
                .omit();
                color: #494949;
                &:hover{
                  cursor: pointer;
                  color: #e70d1d;
                }
              }
              &>span:last-of-type{
                font-size: 14px;
                color: #b1b1b1;
              }
            }
          }
        }
      }
    }
    /*  镇级动态*/
    &>#town{
      width: 100%;
      min-height: 100px;
      box-sizing: border-box;
      padding: 75px 0 100px 0;
      /*background: url("../assets/img/zj.png") no-repeat center center;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;*/
      background-color: #f5f5f5;
      &>.logo{
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        margin-bottom: 30px;
        &>img{
          width: 460px;
          height: 124%;
        }
      }
      /*  主标题*/
      &>h2{
        font-size: 32px;
        .title(#ff0101)
      }
      /*  副标题*/
      &>.smallTitle{
        display: flex;
        align-items: center;
        justify-content: center;
        &>a{
          display: inline-block;
          font-size: 16px;
          .title(#ff8014);
          margin-bottom: 35px;
          &:hover{
            color: #f00;
          }
        }
      }

      /*  镇级动态展示*/
      &>#townList{
        min-height: 500px;
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
        &>.item{
          width: 31%;
          height: 414px;
          margin-right: 3.5%;
          margin-bottom: 77px;
          position: relative;
          &:nth-of-type(3n){
            margin-right: 0;
          }
          &:hover{
            transition: all .3s;
            transform: scale(1.1);
          }
          &>img{
            width: 100%;
            height: 325px;
            color: #515151;
          }
          &>div{
            width: 90%;
            height: 172px;
            background-color: #fff;
            position: absolute;
            bottom: 0;
            left: 5%;
            box-sizing: border-box;
            padding: 15px;
            &>.title{
              width: 100%;
              font-size: 19px;
              font-weight: 400;
              color: #565656;
              line-height: 54px;
              .omit()
            }
            &>p{
              line-height: 30px;
              .line(2);
              color: #555555;
            }
            &>.details{
              display: flex;
              align-items: center;
              position: absolute;
              bottom: 7px;
              line-height: 35px;
              width: 100%;
              &>div{
                width: 50%;
                display: flex;
                align-items: center;
                &>span{
                  font-size: 14px;
                  color: #b3b3b3;
                  margin-right: 15px;
                }
                &>a{
                  font-size: 14px;
                  color: #5679eb;
                  margin-left: 15px;
                }
              }
              &>i {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #f18e56;
                font-size: 20px;
                font-weight: 300;
              }
            }
          }
        }
      }
    }
    /*    区级动态*/
    &>#area{
      width: 100%;
      min-height: 1050px;
      box-sizing: border-box;
      padding: 75px 0 100px 0;
      &>.logo{
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        margin-bottom: 30px;
        &>img{
          width: 460px;
          height: 124%;
        }
      }
      /*  主标题*/
      &>h2{
        font-size: 32px;
        .title(#ff0101)
      }
      /*  副标题*/
      &>.smallTitle{
        display: flex;
        align-items: center;
        justify-content: center;
        &>a{
          font-size: 16px;
          .title(#7a7a7a);
          color: #ff8014;
          margin-bottom: 35px;
          &:hover{
            color: #f00;
          }
        }
      }

      &>#areaList{
        height: 650px;
        margin: 0 auto;
        &>.el-carousel--horizontal{
          overflow:hidden;
        }
        .el-carousel__item{
          width: 360px;
          margin-top: 15px;
          margin-left: 150px;
          box-shadow: 0 0 6px rgba(0,0,0,.2);
          border: 1px solid transparent;
          box-sizing: border-box;
          &>img{
            width: calc(100% - 30px);
            display: block;
            margin: 0 auto;
            height: 200px;
          }
          &>p{
            line-height: 30px;
            .line(3);
            box-sizing: border-box;
            padding: 15px 15px 0;
            color: #888;
          }
          &>a{
            position: absolute;
            bottom: 30px;
            left: 15px;
            font-size: 14px;
            color: #ff934d;
            &:hover{
              color: #f00;
            }
          }
        }
        .el-carousel__item>h3{
          width: 100%;
          line-height: 48px;
          border-bottom: 1px solid #e2e2e2;
          box-sizing: border-box;
          padding: 0 16px;
          font-size: 20px;
          color: #fb802d;

          &>span{
            font-size: 13px;
          }
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #ffffff;
        }
        .el-carousel__item:nth-child(2n+1) {
          background-color: #ffffff;
        }
        &  /deep/.el-carousel__button{
          width: 50px;
          height: 10px;
          border-radius: 10px;
          background-color: #bfbfbf;
        }
        & /deep/ .is-active > .el-carousel__button{
          background-color: #ff8f45;
        }
        & /deep/ .el-carousel__indicators--outside{
          margin-top:86px;
        }
        & /deep/ div.is-active {
          box-shadow: 0 0 20px rgba(255,0,0,.2);
        }
        & /deep/ div.is-active:hover {
          border: 1px solid #ff0000;
        }
        & h4{
          width: 100%;
          line-height: 40px;
          .line(2);
          box-sizing: border-box;
          padding: 0 15px;
          font-size: 18px;
          font-weight: 400;
        }
        & /deep/.el-carousel__item.is-active.el-carousel__item--card.is-in-stage>h3{
          color: #f00
        }
      }
    }
  }
</style>

