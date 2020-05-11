<template>
  <div class="organizeMeet">
    <!--   导航     -->
    <div class="nav">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><router-link to="/organize.html">组织建设</router-link></el-breadcrumb-item>
            <el-breadcrumb-item><router-link to="/organizeMeet.html">三会一课</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>会议详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <!--  内容    -->
    <div class="content">
      <div class="contentBox typeArea">
        <div class="discussBox">
          <div class="essay">
            <h2>{{ meet.title }}</h2>
            <div class="people">
              <p>主讲人：{{ meet.host }}</p>
              <p>讲课时间：{{ meet.meeting_start_time | formatTime }}</p>
            </div>
            <div class="essayContent">
              <h3>会议简介：</h3>
              <p v-html="meet.content"> </p>
            </div>
          </div>
        </div>

        <div class="userBox" v-for="(item,index) in commentList" :key="index">
          <div class="message">
            <div class="headImg">
              <img :src="item.HeadPic || getOneImg" alt="">
              <p>{{ item.create_user_name }}</p>
            </div>
            <div class="text">
              <p v-html="item.comment_content"></p>
              <div class="dataTime">
                发布于：{{ item.create_time | formatTime(true) }}
              </div>
            </div>
          </div>
        </div>
        <div id="more" v-show="!isLastPage">
          <p @click="getMeetComment">
            <i class="iconfont">&#xe672;</i>
            <span>加载更多</span>
          </p>
        </div>
        <div class="publish" v-show="isTime">
          <textarea placeholder="说说你的看法" v-model="comment"></textarea>
          <div class="operate">
            <!-- <div class="updateImg">
               <el-upload
                 class="upload-demo"
                 drag
                 action="https://jsonplaceholder.typicode.com/posts/"
                 multiple>
                 <i class="el-icon-upload"></i>
                 <div class="el-upload__text"><em>点击上传图片</em></div>
               </el-upload>
             </div>-->
            <div class="submits">
              <button @click="upDate">立即发布</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "organizeVote",
    data(){
      return{
        meet:JSON.parse(this.Base64.decode(this.$route.query.obj)),
        isLastPage:false,//是否是评论最后一页
        commentList:[],//评论列表
        currentPage:0,//当前页
        pageSize:5,//当前页的长度
        isTime:false,//评论框是否显示 如果提前进入或者超时进入则不能进行评论
        comment:""//评论的内容
      }
    },
    methods:{
      //获取评论列表
      getMeetComment(){
        if(this.isLastPage){
          this.$message.error('已经是最后一条了');
          return false
        }
        this.currentPage++
        this.$axios.post('NewMeeting/getComment',this.qs({
          meeting_id:this.meet.meeting_id,
          pageSize:this.pageSize,
          pageCurrent:this.currentPage,
        })).then(msg=>{
          if(msg.status == 200){
            this.commentList = this.commentList.concat(msg.data.data.list)
            this.isLastPage = msg.data.data.isLastPage
            if(this.isLastPage){
              this.$message.error('已经是最后一条了');
            }
          }
        })
      },
      //发送评论
      upDate(){

          if(!this.comment){
            this.$message.error('发表内容不能为空');
            return false
          }

        this.$axios.post('/NewMeeting/saveComment',this.qs({
          meeting_id:this.meet.meeting_id,
          comment_content:this.comment
        })).then(msg=>{
          if(msg.status == 200 && msg.data.code == 1){
            this.$message.success(msg.data.msg);
            /*  this.getMeetComment()*/
            let user = {};
            user.HeadPic = JSON.parse(window.localStorage.getItem("userMsg")).pic_id;
            user.create_time = new Date();
            user.comment_content = this.comment
            user.create_user_name = JSON.parse(window.localStorage.getItem("userMsg")).name
            this.commentList.unshift(user)
            this.comment = ""
          }else{
            //报错
            this.$alert('评论失败，请检查您的网络或稍后再试', '温馨提示', {
              confirmButtonText: '确定'
            });
          }
        }).catch(err=>{
          //报错
          this.$alert('评论失败，请检查您的网络或稍后再试', '温馨提示', {
            confirmButtonText: '确定'
          });
        })

      }
    },
    created(){
      this.getMeetComment()
      if(new Date() > new Date(this.meet.meeting_start_time) && new Date() < new Date(this.meet.meeting_end_time)){
        this.isTime  = true
      }else{
        this.isTime  = false
        // this.isTime  = true
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
  .organizeMeet{
    user-select: none;
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
      /*border: 1px solid #ff2828;*/
      &>.discussBox{
        &>.essay{
          text-align: center;
          margin: 10px 20px;
          color: #333333;
          border: 1px solid #ff0000;
          padding: 20px;
          &>h2{
            font-size: 20px;
          }
          &>.people{
            margin: 10px 0;
            &>p{
              margin: 10px 0;
            }
          }
          &>.essayContent{
            &>h3{
              text-align: left;
              color: #ff2223;
              font-size: 20px;
              font-weight: normal;
            }
            &>p{
              text-align: left;
              line-height: 2;
              text-indent: 3em;
            }
          }
        }
      }
      &>.userBox{

        &>.message{
          display: flex;
          margin: 20px 11px;
          border-left: 10px solid #ff2828;
          box-sizing: border-box;
          box-shadow: 0 0 5px rgba(0,0,0,.10);
          padding: 20px;
          &>.headImg{
            &>img{
              display: block;
              width: 100px;
              height: 100px;
              background-color: #bdbdbd;
              border-radius: 50%;
            }
            &>p{
              margin-top: 5px;
              text-align: center;
            }
          }
          &>.text{
            flex: 1;
            display: flex;
            align-items: center;
            position: relative;
            margin-left: 20px;
            &>p{
              font-size: 15px;
              color: #ff2828;
              line-height:2;
            }
            &>.dataTime{
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
      #more{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 18px;
        &>p{
          cursor: pointer;
          &:hover{
            color: #ff2828;
          }
        }
      }
      &>.publish{
        padding: 10px;
        textarea{
          width: 100%;
          resize:none;
          box-sizing: border-box;
          border:1px solid #cccccc;
          height: 350px;
          padding: 10px;
          outline:  0 ;
          border-radius: 5px;
        }
        &>.operate{
          display: flex;
          /*justify-content: space-between;*/
          justify-content: center;
          position: relative;
          &>.updateImg{

          }
          &>.submits{
            margin-top: 100px;
            &>button{
              /* position: absolute;
               right: 0;
               bottom: 0;*/
              width: 190px;
              height: 60px;
              border: 1px solid #ff0000;
              background-color: #ffffff;
              color: #ff0000;
              font-size: 18px;
              cursor: pointer;
              border-radius: 5px;
              &:hover{
                background-color: #ff0000;
                color: #fff;
              }
            }
          }
          /deep/ .el-upload-dragger{
            width: 170px;
            height: 120px;
            border-color: #ff2828;
          }
          .el-icon-upload{
            margin: 20px 0 10px;
          }
          .el-upload__text > em{
            color: #ff2828;
          }
        }
      }
    }
  }

</style>
