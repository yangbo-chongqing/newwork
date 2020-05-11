<template>
  <div class="organizeTeach">
    <!--   导航     -->
    <div class="nav">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><router-link to="/organize.html">组织建设</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>换届选举</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <!--  内容    -->
    <div class="content">
      <div class="contentBox typeArea">
        <div class="tables">
          <div class="list">
            <div
              :class="{headline:true,headlineActive: flag ==item.news_id }"
              v-for="(item,index) in voteList" :key="index"
              @click="getDetails(item.news_id)"
            >
              <h3>{{ item.title }}</h3>
              <p>投票开始时间：{{ item.start_time }}</p>
              <p>投票截至时间：{{ item.end_time }}</p>
            </div>
          </div>
          <div class="essay">
            <h2>{{ currentVote.title }}</h2>
            <p v-html="currentVote.myIntroduction">

            </p>
            <div class="imageText" v-for="(item,index) in optionsList" :key="index">
              <div class="userImg">
                <img :src="item.pic | getOneImg" alt="">
                <p>
                 <span> <i>姓名：{{ item.voting_contents }}</i><i>已获票数：{{item.votingNum}}</i></span>
                  <span @click="vote(item)">投他一票</span></p>
              </div>
              <div class="userText">
                <h2>简介：</h2>
                <p v-html="item.introduce"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="typeArea">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        :current-page.sync="current"
        @current-change="getVoteList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "organizeVote",
    data(){
      return{
        radio:3,
        voteList:[],
        optionsList:[],
        currentVote:{},
        flag:0,
        current:1,
        time:0,
        total:0,
        login:false
      }
    },
    methods:{
      //获取投票项
      getVoteList(current){
        this.$axios.post('/Voting/getVotingListApp',this.qs({
          news_type:46,
          pageSize:5,
          pageCurrent:current
        })).then(msg=>{
          if(msg.status == 200){
            this.voteList = msg.data.data.list
            this.total = msg.data.data.total
            this.current = msg.data.data.pageNum
          }else{
            this.$message.error('获取投票列表失败，请稍后再试');
          }
        }).catch(err=>{
          this.$message.error('获取投票列表失败，请稍后再试');
        })
      },
      //获取所选项的详情
      getDetails(news_id){
        this.flag = news_id
        this.$axios.post('/Voting/GetOneVote',this.qs({
          news_id
        })).then(msg=>{
          if(msg.status == 200){
            this.currentVote = msg.data.data.data1[0]
            this.currentVote.myIntroduction = this.currentVote.content.replace(/<[^>]+>/g,"")
            this.optionsList = msg.data.data.data2
          }else{
            this.$message.error('获取所选项投票列表失败，请稍后再试');
          }
        })
      },
      //投票
      vote(obj){
        console.log(new Date() > new Date(this.currentVote.end_time));
        if(new Date()> new Date(this.currentVote.end_time)){
          this.$alert('投票已结束', '温馨提示', {
            confirmButtonText: '确定',
          });
          return false
        }
        if(new Date()< new Date(this.currentVote.start_time)){
          this.$alert('投票还未开始', '温馨提示', {
            confirmButtonText: '确定',
          });
          return false
        }
        this.$axios.post('/Voting/VoteOn',this.qs({
          information_id:this.currentVote.news_id,
          voting_num:1,
          voting_contents_id:obj.v_contents_id,
          voting_contents:obj.voting_contents
        })).then(msg=>{
          console.log(msg);
          if(msg.status == 200 && msg.data.status == 200){
            //投票成功
            this.$message.success('投票成功');
            obj.votingNum++
          }else if(msg.status == 200 && msg.data.status == 300){
            //已经投过票了
            this.$message.warning(msg.data.msg);
          }else{
            this.$message.error('投票失败');
          }
        }).catch(err=>{
          this.$message.error('投票失败');
        })
      }
    },
    created(){
      this.getVoteList(1)
    },
    watch:{
      voteList(){
        if(!this.time){
          this.getDetails(this.voteList[0].news_id)
        }
        this.time++;
      }
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
    margin: 100px 0 200px;
    &>.contentBox{
      position: relative;
      height: 100%;
      border: 1px solid #ff2223;
      .tables{
        display: flex;
        height: 100%;
        .list{
          width: 350px;
          border-right: 1px solid #ff2223;
          user-select: none;
          .headline{
            height: 125px;
            border-bottom: 1px solid #ff2223;
            cursor: pointer;
            &:hover{
              background-color: #ed7029;
              &>h3{
                color: #ffffff;
              }
              &> p{
                color: #ffffff;
              }
            }
            h3{
              color: #333333;
              font-size: 17px;
              font-weight: normal;
              margin: 0 13px;
              padding: 10px 0 0;
              line-height: 2;
            }
            p{
              margin: 12px;
              font-size: 12px;
              color:#ff2425;
            }
          }
          .headlineActive{
            background-color: #ed7029;
            h3{
              color: #ffffff;
            }
            p{
              color: #ffffff;
            }
          }
        }
      }
      .essay{
        text-align: center;
        width: 100%;
        margin: 20px 0;
        color: #515151;
        &>h2{
          font-size: 25px;
          font-weight: normal;
        }
        &>p{
          margin: 30px;
          text-align: left;
          line-height: 1.5;
          text-indent: 2em;
        }
        .imageText{
          margin: 0 10px;
          display: flex;
          flex-direction: row;
          border-bottom: 1px solid #ef5d68;
          padding: 50px 0;
          &:last-of-type{
            border-bottom: 0;
          }
          .userImg{
            border: 1px solid #ef5d68;
            padding: 0 15px;
            height: 415px;
            &>img{
              width: 280px;
              height: 330px;
              margin: 10px auto;
              background-color: #cccccc;
              display: block;
            }
            &>p{
              font-size: 16px;
              color: #333333;
              margin-top: 25px;
              padding: 0 5px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              &>span:first-of-type{
                display: flex;
                flex-direction: column;
                &>i{
                  font-style: normal;
                  text-align: left;
                }
              }
              &>span:last-of-type{
                height: 25px;
                padding: 3px 8px;
                background-color: #e60012;
                box-shadow: 0 0 5px rgba(230, 0, 18,.45);
                color: #ffffff;
                cursor: pointer;
                border: 1px solid transparent;
                &:hover{
                  background-color: #fff;
                  color: #e60012;
                  border: 1px solid #e60012;
                  box-shadow:none;
                }
              }
            }
          }
          .userText{
            margin-left: 10px;
            &>h2{
              color:#e71827;
              font-size: 20px;
              font-weight: normal;
              text-align: left;
            }
            &>p{
              line-height: 1.5;
              text-align: left;
              text-indent: 2em;
              .line(15)
            }
          }
        }
      }
    }
  }
  .organizeTeach>.typeArea{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;
    &>.el-pagination{
      height: 30px;
      &/deep/ button{
        height: 100%!important;
        background-color: #cccccc;
        color: #fff;
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
        background-color: #f00;
      }
    }
  }

</style>
