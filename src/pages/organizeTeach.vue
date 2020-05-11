<template>
  <div class="organizeTeach">
    <!--   导航     -->
    <div class="nav">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>党建学习</el-breadcrumb-item>

          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="contentBox typeArea">
        <div class="headline">
          <h2>视频学习</h2>
          <!--          <span>展开全部 <i class="iconfont">つつ</i></span>-->
        </div>
        <div class="lump" >
          <div class="allLump" v-for="(item,index) in videoList" :key="index">
            <a href="javascript:;">
              <div class="lumpBox">
                <video :src="item.vedioUrl" controls @click="remind"></video>
                <p>{{ item.vedioTitle }}
                </p>
              </div>
            </a>
          </div>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="current"
            :page-size = 'pageSize'
            @current-change="getMsg"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 文档学习 -->
    <div class="content">
      <div class="contentBox typeArea document">
        <div class="headline">
          <h2>文档学习</h2>
          <!--          <span>展开全部 <i class="iconfont">つつ</i></span>-->
        </div>
        <div class="lump" @click="remind">
          <div class="left">
            <ul>
              <li v-for="(item,index) in leftList" :key="index" @click="goPage(item.classId)">
                {{ item.classTitle }}
              </li>
              <li v-show="!leftList.length">暂无数据</li>
            </ul>
          </div>
          <ul>
            <li v-for="(item,index) in rightList" :key="index" @click="goPage(item.classId)"><span>{{ item.classTitle }}</span><span >{{ item.createdate | formatTime}}</span></li>
          </ul>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="docRotal"
            :current-page.sync="docCurrent"
            :page-size = 'docPageSize'
            @current-change="getDoc"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!--  视频学习    -->

  </div>
</template>

<script>
    export default {
        name: "organizeTeach",
        data(){
            return {
                videoList:[],
                current:1,//当前页
                total:0,//总页数
                pageSize:6,
                docRotal:0,//文档
                docPageSize:20,//文档的页数
                docCurrent:1,//文档的当前页
                docList:[],
                leftList:[],
                rightList:[]
            }
        },
        methods:{
            /*登录视频学习*/
            getMsg(current,community){
                /*如果登陆了就是后面的对象，没有登录加上一个属性变成前面的对象*/
                const obj = community?{ pageCurrent:current, pageSize:6 , community}:{ pageCurrent:current, pageSize:6 }
                this.$axios.post('/vedio/vedioList',this.qs(obj)).then(msg=>{
                    if(msg.status == 200){
                        this.total=msg.data.data.total
                        this.current = msg.data.data.pageNum
                        this.videoList = msg.data.data.list
                    }else{
                    }
                }).catch(err=>{
                })
            },
            /*登录文档学习*/
            getDoc(current,community){
                /*如果登陆了就是后面的对象，没有登录加上一个属性变成前面的对象*/
                const obj = community?{  pageSize :this.docPageSize, treeType:3, pageCurrent:current, community}:{ pageSize :this.docPageSize, treeType:3, pageCurrent:current }
                this.$axios.get('/fun/class/list',{
                    params:obj
                }).then(msg=>{
                    this.docRotal = msg.data.data.total
                    this.docCurrent = msg.data.data.pageNum
                    this.docList = msg.data.data.list
                    this.leftList=[]
                    if(this.docList.length>=8){
                        for(let i = 0 ;i<8 ;i++){
                            this.leftList.push(this.docList[i])
                        }
                        for(let i=8;i<this.docList.length;i++){
                            this.rightList.push(this.docList[i])
                        }
                    }else{
                        this.leftList =  this.docList
                    }
                })
            },
            //去详情页
            goPage(news_id){
                this.$router.push({
                    name:"organizeTeachNew",
                    query:{
                        news_id:this.Base64.encode(news_id)
                    }
                })
            },
            /*是否登录*/
            isLogin(){
                return this.$axios.get('/logins/isLogin')
            },
            /*提醒*/
            remind(){
                this.isLogin().then(msg=>{
                    if(msg.status == 200 && msg.data.status == 200 ){
                        //登陆了不提醒
                    }else{
                        //没登录提醒
                        this.$message.error('由于您未登录，所以无法获取对应积分奖励，建议您立即去个人中心板框登录');
                    }
                }).catch(err=>{

                })

            }

        },
        created(){
            this.isLogin().then(msg=>{
                if(msg.status == 200 && msg.data.status == 200 ){
                    //登陆了不传参数
                    this.getMsg(1,null)
                    this.getDoc(1,null)
                }else{
                    //没登录传参数
                    const  community = 132;
                    this.getMsg(1,community)
                    this.getDoc(1,community)
                }
            })
        }
    }
</script>

<style scoped lang="less">
  @import "../assets/less/public.less";
  /* 导航样式 */
  .nav{
    width: 100%;
    height: 50px;
    background-color: #cdcdcd;
  }
  .navBox{
    display: flex;
    justify-content: space-between;
  }
  .breadCrumb{
    margin-top: 17px;
    margin-left: 20px;
  }
  /*  内容 */
  .content{
    width: 100%;
    margin: 100px 0;
    &:last-of-type{
      margin-bottom: 200px;
    }
    &>.contentBox{
      box-sizing: border-box;
      position: relative;
      &>.headline{

        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        align-items: flex-end;
      }
      &>.headline > h2{
        font-size: 30px;
        color: #ff0101;
        width: 100%;
        height: 40px;
        line-height: 30px;
        border-left:10px solid #ff0000;
        padding-left: 15px;
        border-bottom: 1px solid #ff0000;
      }
      &>.headline > span{
        display: block;
        margin-right: 10px;
        color: #fb802d;
        font-size: 15px;
        cursor: pointer;
      }
      &>.lump{
        margin: 50px 0;
        display: flex;
        flex-wrap: wrap;
        &>.allLump{
          width:calc((100% - 40px) / 3);
          height: 315px;
          margin-right: 20px;
          margin-bottom: 40px;
          &:nth-of-type(3n){
            margin-right: 0;
          }
          .lumpBox{
            box-shadow: 0 0 10px rgba(0,0,0,.15);
            margin-bottom: 40px;
            padding: 15px 15px;
            border: 1px solid transparent;
            video{
              width: 100%;
              height: 255px;
              background-color: #cccccc;
              display: block;
            }
            p{
              margin: 10px 0;
              font-size: 17px;
              color: #505050;
              line-height: 1.5;
              .line(2);
            }
            &:hover{
              border: 1px solid #f93030;
              box-shadow: 0 0 10px rgba(249, 48, 48,.46);
            }
          }
        }
      }
      &>.pageBox{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -70px;
        &/deep/ li.number.active{
          background-color: #ff2223;
          color: #ffffff;
        }
        &/deep/ li:hover{
          color: #ff2223;
        }
        &>.el-pagination{
          height: 30px;
          &/deep/ button{
            height: 100%!important;
            background-color: #cccccc;
          }
          &/deep/  .el-pager{
            height: 100%;

            &>li{
              height: 100%;
              line-height: 30px;
              background-color: #cccccc;
            }
          }
          & /deep/ .el-icon-arrow-left:before{
            font-size: 30px;
            color: #fff;
          }
          & /deep/ .el-icon-arrow-right:before{
            font-size: 30px;
            color: #fff;
          }
          & /deep/ .active{
            background-color: #f00!important;
          }
          & /deep/ .number{
            color: #fff;
          }
          & /deep/ .number:hover{
            background-color: #f00!important;
          }
        }
      }
      &.document{
        &>.lump{
          display: flex;
          justify-content: space-between;
          width: 100%;
          &>.left{
            width: 40%!important;
            height: 100%;
            background-color: pink;
            &>ul{
              width: 100%;
              background-color: pink;
              display: flex;
              flex-wrap: wrap;
              &>li{
                width: 50%;
                height: 100px;
                background-color: #f2f3f5;
                color: #fb1313;
                text-align: center;
                line-height: 100px;
                cursor: pointer;
                transition: all .3s;
                &:first-of-type,
                &:nth-of-type(4),
                &:nth-of-type(5),
                &:nth-of-type(8){
                  background-color: #cd3333;
                  color: #fff;
                }
                &:hover{
                  transform: scale(1.05);
                }
              }
            }
          }
          &>ul{
            width: 55%;
            &>li{
              cursor: pointer;
              width: 100%;
              line-height: 44px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              transition: all .3s;
              &>span{
                width: 85%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #494949;
                &:last-of-type{
                  width: 15%;
                  font-size: 14px;
                  color: #b1b1b1;
                }
              }
              &:hover{
                transform: scale(1.05);
                span{
                  color: #fb1313;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
