<template>
  <div id="partyBuildList">
    <div id="nav">
      <div class="typeArea">
        <!--            <span>首页 <i>/</i> 党建动态 <i>/</i> 更多列表</span>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/partyBuild.html' }">党建动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="information_lable == 5">村级动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="information_lable == 4">镇级动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="information_lable == 2">市级动态</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!information_lable">更多列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="typeArea">
      <div class="item" v-for="(item,index) in  newsList" :key="index" @click="partyBuildDetails(item.news_id)">
        <img :src="item.contentPic | getOneImg" alt="">
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.introduction }}</p>
          <div>
            <span>{{ item.create_date | formatTime}}</span>
            <span>浏览次数{{ item.read_count }}次</span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      id="Paging"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      current-page.sync = current
      @current-change="getNewsList"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "partyBuildList",
    data() {
      return {
        newsList:[],
        current:1,//列表当前页
        total:0,//列表总页数
        information_lable:this.$route.query.information_lable?this.Base64.decode(this.$route.query.information_lable):null,
        userArea:{},

      }
    },
    methods: {
      //获取村级动态
      getNews(obj){
        this.$axios.post('F_Information/getInformationListApp',this.qs(obj)).then(msg=>{
          if(msg.status == 200){
            this.newsList = msg.data.data.list
            this.total =  msg.data.data.total
            this.current = msg.data.data.pageNum
          }else{
            this.$alert('获取数据失败，请稍后再试', '温馨提示', {
              confirmButtonText: '确定'
            });
          }
        })
      },
      //获取镇级动态
      //获取区级动态
      //详情页
      partyBuildDetails(news_id){
        this.$router.push({
          name:"partyBuildDetails",
          query:{
            news_id:this.Base64.encode(news_id)
          }
        })
      },
      //获取数据
      getNewsList(current){
        if(this.information_lable){
          let obj ={
            province:this.userArea.province,
            city:this.userArea.city,
            district:this.userArea.district,//区
            news_type:47,
            information_lable:this.information_lable,//村
            pageSize:5,
            pageCurrent:current
          }
          switch(parseInt(this.information_lable)){
            case  3:
              break
            case 4:
              obj.street = this.userArea.street//街道
              break
            case 5:
              obj.street = this.userArea.street
              obj.community = this.userArea.community//社区
              break
            default:
              obj ={
                province:this.userArea.province,
                city:this.userArea.city,
                district:this.userArea.district,//区
                street:this.userArea.street,
                community:this.userArea.community,
                news_type:47,
                pageSize:5,
                pageCurrent:current
              }
             break
          }
          this.getNews(obj)
        }else{
          let obj ={
            province:this.userArea.province,
            city:this.userArea.city,
            district:this.userArea.district,//区
            street:this.userArea.street,
            community:this.userArea.community,
            news_type:47,
            pageSize:5,
            pageCurrent:current
          }
          this.getNews(obj)
        }


      }
    },
    components: {},
    created(){
      this.isUserArea()
      this.userArea = this.getUserArea()
      this.getNewsList()
    }
  }
</script>

<style scoped lang="less">
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
  #partyBuildList{
    width: 100vw;
    user-select: none;
    position: relative;
    #nav{
      width: 100%;
      height: 50px;
      background-color: #e8e8e8;
      &>.typeArea{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        i{
          margin: 0 5px;
        }
     /*   &>.el-pagination{
          height: 40px;
          &/deep/ button{
            height: 100%!important;
            width: 40px;
            background-color: #cccccc;
          }
          &/deep/  .el-pager{
            height: 100%;
            &>li{
              height: 100%;
              line-height: 40px;
              width: 40px;
              background-color: #cccccc;
            }
          }
          & /deep/ .el-icon-arrow-left:before{
            font-size: 37px;
            color: #fff;
          }
          & /deep/ .el-icon-arrow-right:before{
            font-size: 37px;
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
        }*/

      }
    }
    &>.typeArea{
      margin-top: 20px;
      margin-bottom: 260px;
      &>.item{
        width: 100%;
        height: 270px;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        margin-bottom: 35px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        &>img{
          width: 380px;
          height: 100%;
        }
        &>div{
          width: 740px;
          height: 100%;
          position: relative;
          &>h3{
            font-size: 22px;
            font-weight: 400;
            color: #515151;
            margin-bottom: 20px;
          }
          &>p{
            line-height: 25px;
            color: #888;
            font-size: 16px;
            .line(6);
            text-indent: 2em;
          }
          &>div{
            position: absolute;
            bottom: 0;
            display: flex;
            left: 0;
            width: 100%;
            justify-content: space-between;
            color: #888;
            span{
              font-size: 14px;
            }
          }
        }

      }
    }
    #Paging{
      height: 30px;
      position: absolute;
      bottom: -135px;
      left: 50%;
      transform: translateX(-50%);
      &.el-pagination{
        height: 30px;
        &/deep/ button{
          height: 100%!important;
          /*width: 60px;*/
          background-color: #cccccc;
        }
        &/deep/  .el-pager{
          height: 100%;
          &>li{
            height: 100%;
            line-height: 30px;
            /*width: 60px;*/
            background-color: #cccccc;
          }
        }
        & /deep/ .el-icon-arrow-left:before{
          /*font-size: 37px;*/
          color: #fff;
        }
        & /deep/ .el-icon-arrow-right:before{
          /*font-size: 37px;*/
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
  }

</style>
