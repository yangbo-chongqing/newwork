<template>
  <div id="partyBuildDetails">
    <div id="nav">
      <div class="typeArea">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/partyBuild.html' }">党建动态</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/partyBuildList.html' }">更多动态</el-breadcrumb-item>
          <el-breadcrumb-item >详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="typeArea">
      <h2>{{ news.title }}</h2>
      <h4>{{ news.create_date | formatTime}} 阅读次数：<span>{{ news.read_count}}</span></h4>
      <h6>发布人：<span>{{news.CreateName}}</span></h6>
      <div id="info" v-html="news.content"></div>
      <p>{{ news.create_date | formatTime}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "partyBuildDetails",
    data() {
      return {
        news_id:this.Base64.decode(this.$route.query.news_id),
        news:{}
      }
    },
    methods: {
      getMsg(){
        this.$axios.post('information/getOne',this.qs({
          news_id:this.news_id
        })).then(msg=>{
          if(msg.status == 200){
            this.news = msg.data.data[0]
          }else{
            this.$message.error('获取信息失败，请检查网络或稍后后再试');
          }
        }).catch(err=>{
          this.$message.error('获取信息失败，请检查网络或稍后后再试');
        })
      }
    },
    components: {},
    created(){
      this.getMsg()
    },
      watch:{
        $route(to){
            this.news_id = this.Base64.decode(to.query.news_id)
            this.getMsg()
        }
      }
  }
</script>

<style scoped lang="less">
  #partyBuildDetails{
    width: 100vw;
    user-select: none;
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
        & /deep/ .number.active{
          background-color: #f93a42;
        }
        & /deep/ .number:hover{
          color: #f93a42;
        }
      }
    }
    &>.typeArea{
      margin-top: 40px;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      padding: 20px;
      margin-bottom: 160px;
      & span{
        color: #ff4e4e;
      }
      &>h2{
        font-size: 18px;
        font-weight: 400;
        color: #515151;
        text-align: center;
        width: 100%;
        margin-bottom: 30px;
      }
      &>h4{
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
        color: #8f8f8f;
      }
      &>h6{
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
        color: #8f8f8f;
      }
      #info{
        width: 100%;
        color: #333;
        text-indent: 2em;
        line-height: 20px;
        & p{
          width: 100%;
          color: #333;
          text-indent: 2em;
          line-height: 35px !important;
          text-align: center;
          &>img{
            width: 48%;
            margin-right: 2%;
            margin-bottom: 40px;
            &:nth-of-type(2n){
              margin-right: 0;
            }
          }
        }
        & span{
          line-height: 35px !important;
        }
        &>img{
          width: 48%;
          margin-right: 2%;
          margin-bottom: 40px;
          &:nth-of-type(2n){
            margin-right: 0;
          }
        }
      }
      &>p{
        width: 100%;
        margin-top: 122px;
        text-align: right;
        font-size: 12px;
        color: #8f8f8f;
      }
    }
  }
</style>
