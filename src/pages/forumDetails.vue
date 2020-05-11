<template>
  <!--论坛详情-->
  <div id="forumDetails">
    <div id="nav">
      <div class="typeArea">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path :'forum.html'}">论坛服务</el-breadcrumb-item>
          <el-breadcrumb-item v-if="typeid == 88">党建问答详情</el-breadcrumb-item>
          <el-breadcrumb-item v-if="typeid == 89">党建图文详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="typeArea">
      <!--论坛详情头部-->
      <div class="forumLeft">
        <!-- 论坛左侧 -->
        <div class="forumHead">
          <div class="headImg">
            <img :src="userMsg.pic_id" alt="">
          </div>
          <div class="headBody">
            <div class="headline">
              {{master.title}}
            </div>
            <div class="message">
              <span class="msgLeft">
                {{master.CreateName}} 发表在 党建图文
              </span>
              <span class="msgRight">
                {{master.create_date}} | {{master.read_count}}次浏览
              </span>
            </div>
          </div>
        </div>
        <!--    内容板块      -->
        <div class="content" v-html="master.content">
        </div>
        <!--    评论板块      -->
        <div class="comment">
          <div class="commentHead">
            <span>评论 </span>| {{master.comment_num}}
          </div>
          <div class="commentPeople" v-for="(item,index) of commentList" :key="index">
            <div class="reply">
              <div class="replyHead">
                <img :src="item.HeadPic" alt="">
              </div>
              <div class="replayBody">
                <div class="name">{{item.create_user_name}}</div>
                <div class="content">{{item.comment_content}}</div>
              </div>
            </div>
            <div class="dataTime">{{item.create_time}}</div>
          </div>
          <div class="more">
            <a href="#" @click.prevent="getComment">查看更多有趣评论...</a>
          </div>
          <!--     发表评论      -->
        </div>
        <div class="publish">
          <div class="headImg">
            <img :src="userMsg.pic_id" alt="">
            <span> {{userMsg.name}}</span>
          </div>
          <div class="text">
            <textarea class="textContent" v-model="comment"></textarea>
          </div>
          <button class="referTo" @click.prevent="upComment">发表看法</button>
        </div>
      </div>

      <div class="forumRight">
        <!-- 论坛右侧 -->
        <div class="hotHead">
          <i class="iconfont">&#xe6c7;</i><span>热门帖子推荐</span>
        </div>
        <div class="hotBody">
          <div v-for="(item,index) of masterHot" :key="index" @click="goHot(item.news_id,item.news_type)">
            <span>{{item.title}}</span>
          </div>

        </div>
        <div class="alone" @click="goHot(lastHot.news_id,lastHot.news_type)">
          <img :src="lastHot.contentPic" alt="">
          <div class="aloneText">
            <h3>{{lastHot.title}}</h3>
            <span>{{lastHot.create_date}}</span>
          </div>
        </div>
        <div class="qrCode">
          <img src="../assets/img/erwei.png" alt="">
          <span>下载党建app随时随地关注党的动态</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "forumDetails",
    data() {
      return {
        news_id: "",
        master: {}, //楼主
        comment: "", //评论
        masterHot: [], // 热门帖子
        lastHot: [],
        commentList: [],
        pageCurrent: 0,
        isLastPage: false,
        typeid: this.$route.query.typeid ? this.Base64.decode(this.$route.query.typeid) : null,
        islogin: false,
        userMsg: {},
      }
    },
    methods: {
      goHot(news_id, typeid) { //跳转热门帖子
        this.$router.push({
          query: {
            news_id: this.Base64.encode(news_id),
            typeid: this.Base64.encode(typeid)
          }
        })

        this.news_id = this.Base64.decode(this.$route.query.news_id);
        this.getMsg();
        this.getHot();
        this.commentList = [];
        this.getLoading();
      },
      //获取热门帖子
      getHot() {
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: '88',
          hot: 'true',
          pageNum: 1,
          pageSize: 7
        })).then(msg => {
          if (msg.status == 200) {
            for (let i = 0; i < 6; i++) {
              this.masterHot[i] = msg.data.data.list[i];
            }
            this.lastHot = msg.data.data.list[6];
          }
        }).catch(err => {
          this.$alert('获取信息失败', '提示', {
            confirmButtonText: '确定'
          });
        })
      },
      //获取内容
      getMsg() {
        this.$axios.post('information/getOne', this.qs({
          news_id: this.news_id
        })).then(msg => {
          if (msg.status == 200) {
            this.master = msg.data.data[0]
          }
        }).catch(err => {
          this.$alert('获取信息失败', '提示', {
            confirmButtonText: '确定'
          });
        })
      },
      //获取加载后的评论
      getLoading() {
        this.$axios.post('F_Information/getComment', this.qs({
          news_id: this.news_id,
          pageCurrent: 1,
          pageSize: 5
        })).then(msg => {
          if (msg.status == 200) {
            this.commentList = this.commentList.concat(msg.data.data.list)
          }
        }).catch(err => {

        })
      },
      //获取评论
      getComment() {
        if (this.isLastPage) {
          this.flag = false
          var _Message = this.$message.error('已经到底了！');
          return false
        }
        this.pageCurrent++
        this.flag = false
        this.$axios.post('F_Information/getComment', this.qs({
          news_id: this.news_id,
          pageCurrent: this.pageCurrent,
          pageSize: 5
        })).then(msg => {
          if (msg.status == 200) {
            this.isLastPage = msg.data.data.isLastPage
            this.commentList = this.commentList.concat(msg.data.data.list)
          }
        }).catch(err => {})
      },
      //进行评论
      upComment() {
        if (this.islogin) {
          if (!this.comment) {
            this.$message({
              message: '评论不能为空！',
              type: 'error'
            });

            return false;
          }
          this.$axios.post('F_Information/saveComment', this.qs({
            news_id: this.news_id,
            comment_content: this.comment
          })).then(msg => {
            if (msg.status == 200 && msg.data.code == 1) {
              const obj = {
                create_user_name: this.userMsg.name, //用户名
                HeadPic: this.userMsg.pic_id, //头像
                create_time: this.formatDate(new Date(), true), //创建时间
                comment_content: this.comment //评论内容
              }
              this.commentList.push(obj)
              this.comment = ""
              this.$message({
                message: '评论成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '评论失败，请稍后再试',
                type: 'error'
              });
            }
          })
        } else {
          this.isLogin()
        }

      },
      //判断是否登录
      isLogin() {
        this.$axios.get('logins/isLogin').then(msg => {
          if (msg.status == 200 && msg.data.status == 400) {
            //未登录
            this.$confirm('此功能需要登录是否登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login.html')
            }).catch(() => {
              //防止报错
            });
          } else if (msg.status == 200 && msg.data.status == 200) {
            //登录了
            //获取本地存储的用户头像和昵称
            this.islogin = true
            this.userMsg = JSON.parse(window.localStorage.getItem('userMsg'))
          } else {
            //其他原因
            this.$message.error('获取信息失败,请检查您的网络或稍后再试');
          }
        }).catch(err => {
          //报错
          this.$message.error('获取信息失败,请检查您的网络或稍后再试');
        })
      }
    },
    components: {},
    created() {
      this.news_id = this.Base64.decode(this.$route.query.news_id);
      this.getMsg();
      this.getHot();
      this.getComment();
      this.isLogin()

    },
    mounted() {

    },

  }

</script>

<style scoped lang="less">
  @import '../assets/less/public.less';

  body {
    background-color: #f3f2f7;
  }

  .omit() {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  //多行文本溢出显示省略号
  .line(@line: 2) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;

    -webkit-line-clamp: @line;
  }

  /*底边框*/

  #forumDetails {
    width: 100vw;

    user-select: none;

    background-color: #f3f2f7;

    /*导航*/
    #nav {
      width: 100%;
      height: 40px;
      margin-bottom: 80px;

      background-color: #e8e8e8;

      &>.typeArea {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 100%;

        i {
          margin: 0 5px;
        }

        & /deep/ .number.active {
          background-color: #f93a42;
        }

        & /deep/ .number:hover {
          color: #f93a42;
        }
      }
    }

    &>.typeArea {
      display: flex;
      justify-content: space-between;

      height: 100%;

      /*论坛详情头部*/
      &>.forumLeft {
        width: 870px;
        height: auto;

        &>.forumHead {
          display: flex;
          align-items: center;
          flex-direction: row;

          box-sizing: border-box;
          width: auto;
          height: 120px;

          border-left: 10px solid #f64646;
          background-color: #fff;

          &>.headImg {
            width: 90px;
            height: 90px;
            margin-left: 10px;

            &>img {
              width: 100%;
              height: 100%;

              border-radius: 50%;
            }
          }

          &>.headBody {
            flex: 1;

            width: auto;
            margin-left: 20px;

            &>.headline {
              font-size: 25px;

              margin-bottom: 10px;

              color: #c82b26;
            }

            &>.message {
              font-size: 13px;

              display: flex;
              justify-content: space-between;

              color: #666;

              &>.msgRight {
                margin-right: 10px;
              }
            }
          }
        }

        &>.content {
          box-sizing: border-box;
          margin-top: 10px;
          padding: 25px 20px;

          background-color: #fff;
        }

        &>.comment {
          margin-top: 10px;

          background-color: #fff;

          &>.commentHead {
            font-size: 15px;

            box-sizing: border-box;
            height: 60px;

            color: #999;
            border-bottom: 1px solid #f3f2f5;
            border-left: 10px solid #f64646;

            &>span {
              font-size: 17px;
              line-height: 60px;

              margin-left: 20px;

              color: #000;
            }
          }

          &>.commentPeople {
            position: relative;

            box-sizing: border-box;
            padding: 20px;

            border-bottom: 1px solid #f3f2f5;

            &>.reply {
              display: flex;

              color: #808080;

              &>.replyHead {
                width: 60px;
                height: 60px;

                &>img {
                  width: 100%;
                  height: 100%;

                  border-radius: 50%;
                }
              }

              &>.replayBody {
                margin-left: 10px;

                &>.name {
                  font-size: 20px;

                  color: #000;
                }

                &>.content {
                  font-size: 15px;
                }
              }
            }

            &>.dataTime {
              font-size: 14px;

              position: absolute;
              top: 40px;
              right: 0;

              margin-right: 10px;

              color: #808080;
            }
          }

          &>.more {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 10px;

            &>a {
              font-size: 15px;

              display: inline-block;

              color: #f64646;
            }
          }
        }

        &>.publish {
          position: relative;

          margin: 10px 0 100px;
          padding: 20px 20px 80px;

          background-color: #fff;
          ;

          &>.headImg {
            display: flex;
            align-items: center;
            flex-direction: row;

            width: 100%;
            height: 60px;
            margin-left: 10px;

            &>img {
              width: 60px;
              height: 60px;

              border-radius: 50%;
            }

            &>span {
              font-size: 20px;

              flex: 1;

              margin-left: 15px;

              .omit();
            }
          }

          &>.text {
            &>.textContent {
              width: 800px;
              height: 260px;
              margin-top: 20px;

              resize: none;

              border: 1px solid #e6e6e6;
              border-radius: 3px;
              outline: none;
            }
          }

          &>.referTo {
            font-size: 16px;

            position: absolute;
            right: 0;
            bottom: 0;

            width: 170px;
            height: 50px;
            margin-right: 46px;
            margin-bottom: 15px;

            color: #fff;
            border-radius: 5px;
            background-color: #f64646;
          }
        }
      }

      &>.forumRight {
        width: 310px;
        height: auto;

        &>.hotHead {
          display: flex;
          align-items: center;
          justify-content: center;

          width: auto;
          height: 58px;

          background-color: #cb1c1d;

          &>span {
            font-size: 25px;

            color: #fff;
          }

          &>i {
            font-size: 50px;

            color: #fff100;
          }
        }

        &>.hotBody {
          display: flex;
          flex-wrap: wrap;

          margin-top: 5px;

          &>div {
            overflow: hidden;

            width: 50%;

            cursor: pointer;
            text-align: center;

            color: #cd3333;
            background-color: #fff;

            &>span {
              font-size: 13px;
              line-height: 150px;

              display: inline-block;

              width: 136px;

              text-align: center;
              white-space: normal;

              .omit();
            }
          }

          &>div:nth-child(1),
          &>div:nth-child(4),
          &>div:nth-child(5) {
            color: #fff;
            background-color: #cd3333;
          }
        }

        &>.alone {
          margin-top: 10px;

          cursor: pointer;

          &>img {
            display: block;

            width: 100%;
            height: 245px;

            background-color: #ccc;
          }

          &>.aloneText {
            width: auto;
            height: 50px;
            padding: 5px;

            color: #fff;
            background-color: #cd3333;

            &>h3 {
              font-size: 16px;
              font-weight: normal;

              .omit();
            }

            &>span {
              font-size: 13px;
            }
          }
        }

        &>.qrCode {
          width: auto;
          margin-top: 10px;
          padding: 10px 0;

          text-align: center;

          background-color: #fff;

          &>img {
            display: block;

            width: 231px;
            height: 231px;
            margin: 0 auto;
          }

          &>span {
            font-size: 14px;

            color: #999;
          }
        }
      }
    }
  }

</style>
