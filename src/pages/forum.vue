<template>
  <!--论坛-->
  <div id="forum">
    <!--导航-->
    <div id="nav" :class="{active:topDistance>200}">
      <div class="typeArea">
        <!--        <span>首页/论坛服务</span>-->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>论坛服务</el-breadcrumb-item>
        </el-breadcrumb>
        <ul>
          <li @click="goAddress('#QuestionAndAnswer')">
            <a href="javascript:;" :class="{active:toolIndex==0}">党建问答</a>
          </li>
          <li @click="goAddress('#imageAndText')">
            <a href="javascript:;" :class="{active:toolIndex==1}">党建图文</a>
            <i></i>
          </li>
          <li @click="goAddress('#message')">
            <a href="javascript:;" :class="{active:toolIndex==2}">消息发布</a>
            <i></i>
          </li>
        </ul>
      </div>
    </div>
    <div id="Myborder" style="width: 100%;height: 40px" v-show="topDistance>200"></div>
    <!--党建问答-->
    <div id="QuestionAndAnswer" class="typeArea">
      <img src="../assets/img/wd1.png" alt="" class="wow slideInLeft">
      <!--党建问答小标题-->
      <div class="titleSmall">
        <p class="wow slideInLeft">
          党员发布的最新问答
        </p>
        <p></p>
      </div>
      <!--内容-->
      <div class="content">
        <div class="wow slideInLeft">
          <!--时间-->
          <h3>
            07-06
            <span>2019</span>
          </h3>
          <!--标题-->
          <h2>
            {{ newImageAndText.title }}
          </h2>
          <!--图片-->
          <img :src="newImageAndText.contentPic | getOneImg" alt="">
          <!--内容-->
          <p v-html="newImageAndText.introduction"></p>
          <!--查看详情-->
          <a href="javascript:;" @click="goForumDetails(newImageAndText.news_id)">查看详情></a>
        </div>
        <div>
          <!--标题-->
          <h3 class="wow slideInRight">近期发布</h3>
          <!--新闻列表-->
          <ul>
            <li v-for="(item,index) in QuestionAndAnswerList" :key="index" @click="goForumDetails(item.news_id,88)">
              <!--标题-->
              <h4>
                <p>{{ item.title }}</p>
                <span>{{ item.create_date | formatTime }}</span>
              </h4>
              <!--内容-->
              <p>{{ item.introduction }}</p>
            </li>
          </ul>
          <!--分页-->
          <div>
            <el-pagination background layout="prev, pager, next" :total="QuestionAndAnswerTotal" :page-size="4"
              :current-page.sync="QuestionAndAnswerCurrentPage" @current-change="getQuestionAndAnswerList">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--党建图文-->
    <div id="imageAndText">
      <div class="typeArea">
        <div class="img">
          <img src="../assets/img/tw2.png" alt="" class="wow slideInRight">
        </div>
        <div class="titleSmall">
          <p></p>
          <p class="wow slideInRight">
            党员发布的最新动态消息
          </p>
        </div>
        <div class="itemList">
          <div class="item" v-for="(item,index) in imageAndTextList" :key="index"
            @click="goForumDetails(item.news_id,89)">
            <div>
              <img :src="item.contentPic | getOneImg" alt="">
              <h5>{{ item.title }}</h5>
              <div>
                <p>
                  <strong></strong>
                  查看详情
                  <strong></strong>
                </p>
              </div>
              <i></i>
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <!--分页-->
      <div>
        <el-pagination background layout="prev, pager, next" :total="imageAndTextTotal" :page-size="6"
          :current-page.sync="imageAndTextCurrentPage" @current-change="getImageAndTextList">
        </el-pagination>
      </div>
    </div>

    <!--消息发布开始-->
    <div id="message">
      <!--<div class="logo">
        <img src="../assets/img/dw1.png" alt="">
      </div>-->
      <!--        标题-->
      <!--<h2>消息发布</h2>-->
      <!--选项-->
      <div id="options" class="typeArea ">
        <!--:class="{active:news_type == 88}"-->
        <a href="javascript:;" :class="{active:news_type == 88}" @click.prevent="news_type=88">发布图文</a>
        <!---->
        <a href="javascript:;" :class="{active:news_type == 89}" @click.prevent="news_type=89">发布问答</a>
      </div>
      <!--输入内容-->
      <div id="Info" class="typeArea">
        <div>
          <h5>
            <input type="text" placeholder="创建标题" v-model="title">
          </h5>
          <div id="editor"></div>
        </div>
      </div>
      <!--提交摁钮-->
      <div class="typeArea" id="upData">
        <button @click="upData">立即发布</button>
      </div>
    </div>
    <!--消息发布结束-->
  </div>
</template>

<script>
  import {
    WOW
  } from 'wowjs'
  export default {
    name: "forum",
    data() {
      return {
        imageAndTextList: [], //图文详情列表
        QuestionAndAnswerList: [], //党建问答列表
        userArea: JSON.parse(window.localStorage.getItem("userArea")),
        newImageAndText: {}, //党建问答列表第一条数据
        newImageAndTextImg: "",
        QuestionAndAnswerCurrentPage: 1, //党建问答列表当前页
        QuestionAndAnswerTotal: 0, //党建问答列表总页数
        imageAndTextCurrentPage: 1,
        imageAndTextTotal: 0,
        topDistance: 0, //滚动条据上面的距离
        toolIndex: 0, //切换类
        news_type: 88,
        title: ""
      }
    },
    methods: {
      goForumDetails(news_id, typeid) {
        this.$router.push({
          name: "forumDetails",
          query: {
            news_id: this.Base64.encode(news_id),
            typeid: this.Base64.encode(typeid)
          }
        })
      },
      //获取图文详情列表
      getImageAndTextList(currentPage) {
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: 88,
          pageSize: 6,
          pageCurrent: currentPage,
          city: this.userArea.city,
          community: this.userArea.community,
          district: this.userArea.district,
          province: this.userArea.province,
          street: this.userArea.street,
        })).then(msg => {
          if (msg.status == 200) {
            this.imageAndTextCurrentPage = msg.data.data.pageNum
            this.imageAndTextTotal = msg.data.data.total
            this.imageAndTextList = msg.data.data.list
          }
        })
      },
      //党建问答列表
      getQuestionAndAnswerList(currentPage) {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)'
        });
        // const obj = Object.assign({news_type: 89, pageSize: 4,pageCurrent: currentPage},this.userArea)
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: 89,
          pageSize: 4,
          pageCurrent: currentPage,
          city: this.userArea.city,
          community: this.userArea.community,
          district: this.userArea.district,
          province: this.userArea.province,
          street: this.userArea.street,
        })).then(msg => {
          if (msg.status == 200) {
            loading.close();
            this.QuestionAndAnswerCurrentPage = msg.data.data.pageNum
            this.QuestionAndAnswerTotal = msg.data.data.total
            this.QuestionAndAnswerList = msg.data.data.list
          } else {
            loading.close();
            this.$alert('获取党建问答列表失败，请重试', '温馨提示', {
              confirmButtonText: '确定'
            });
          }
        }).catch(err => {
          loading.close();
          this.$alert('获取党建问答列表失败，请重试', '温馨提示', {
            confirmButtonText: '确定'
          });
        })
      },
      //党建问答列表第一条数据
      getNewImageAndText() {
        const obj = Object.assign(this.userArea, {
          news_type: 89,
          pageSize: 1,
          pageCurrent: 1
        })
        this.$axios.post('/F_Information/getInformationListApp', this.qs(obj)).then(msg => {
          if (msg.status == 200) {
            msg = msg.data.data.list
            this.newImageAndText = msg[0]
          }
        })
      },
      //指定位置悬浮
      handleScroll() {
        let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
        this.topDistance = top;
        if(top < 130) this.toolIndex = 0;
        if(top > 1100 && top < 2172) this.toolIndex = 1;
        if(top > 2172) this.toolIndex = 2;

      },
      //发布消息
      upData() {
        const title = this.title.trim()
        if (title.length == 0) {
          this.$message.error('标题不能为空');
          return false
        }
        this.formArticle = this.wangEdit.txt.html()
        const content = this.formArticle.trim()
        if (content.length == 0) {
          this.$message.error('内容不能为空');
          return false
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const introduction = this.wangEdit.txt.text().replace(/(&nbsp;|\s)/g, "")
        //发送请求
        this.$axios.post('information/insertAndUpdate', this.qs({
          news_type: this.news_type,
          title, //标题
          content, //内容
          introduction, // 简介
        })).then(msg => {
          if (msg.status == 200 && msg.data.status == 200) {
            //发布成功
            //清空富文本内容
            loading.close();
            this.$message('发布成功');
            this.formArticle = ""
            this.title = ""
            this.wangEdit.txt.html(this.formArticle);
            this.getImageAndTextList(1);
            this.getQuestionAndAnswerList(1);
            this.getNewImageAndText()
          } else if (msg.status == 200 && msg.data.status == 500) {
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
          } else {
            //检查网络
            this.$alert('发布失败，请检查您的网络', '标题名称', {
              confirmButtonText: '确定'
            });
          }
        })
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.wangEdit = this.createE()
      new WOW().init()
    },
    created() {
      this.getImageAndTextList(1);
      this.getQuestionAndAnswerList(1);
      this.getNewImageAndText()
    },


  }

</script>

<style scoped lang="less">
  .title(@color: '#333') {
    font-weight: 400;
    line-height: 60px;

    text-align: center;

    color: @color;
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

  #forum {
    width: 100vw;

    user-select: none;

    &>#nav {
      width: 100%;
      height: 50px;

      background-color: #e8e8e8;

      &.active {
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
      }

      &>.typeArea {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 100%;
        margin: 0 auto;

        &>ul {
          display: flex;

          height: 100%;

          li {
            line-height: 50px;

            position: relative;

            width: 95px;
            height: 100%;
            margin-left: 30px;

            text-align: right;

            a {
              display: inline-block;

              height: calc(100% - 2px);

              &.active {
                color: #e61a18;
              }
            }

            &>.active {
              border-bottom: 2px solid #e61a18;
            }

            i {
              position: absolute;
              top: 50%;
              left: 0;

              width: 2px;
              height: 2px;

              transform: translateY(-50%);

              background-color: #000;
            }
          }
        }
      }

      &.active {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
      }
    }

    #QuestionAndAnswer {
      box-sizing: border-box;
      height: 972px;
      padding: 53px 0 0 0;

      &>img {
        width: 174px;
        height: 52px;
        margin-top: 37px;
        margin-bottom: 37px;
      }

      &>.titleSmall {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: space-between;

        width: 100%;
        height: 20px;
        margin-bottom: 75px;

        &>p:first-of-type {
          font-size: 14px;

          width: 12%;
        }

        &>p:last-of-type {
          width: 88%;
          height: 2px;

          background-color: red;
        }
      }

      &>.content {
        display: flex;
        justify-content: space-between;

        width: 100%;
        height: 560px;

        &>div:first-of-type:hover {
          border: 1px solid red;
          box-shadow: 0 0 20px rgba(255, 0, 0, .2);
        }

        &>div:first-of-type {
          position: relative;

          box-sizing: border-box;
          width: 370px;
          height: 100%;
          padding: 15px;

          border: 1px solid transparent;
          box-shadow: 0 0 6px rgba(0, 0, 0, .2);

          &>h3 {
            font-size: 35px;
            line-height: 45px;

            box-sizing: border-box;

            text-indent: 10px;

            color: #f00;
            border-bottom: 1px solid #e3e3e3;

            &>span {
              font-size: 18px;
            }
          }

          &>h2 {
            font-size: 20px;
            font-weight: 400;
            line-height: 40px;

            padding: 5px 0;

            .line();
          }

          &>img {
            width: 100%;
            height: 224px !important;
          }

          &>p {
            line-height: 30px;

            padding-top: 10px;

            color: #888;

            .line(3);
          }

          &>a {
            font-size: 14px;

            position: absolute;
            bottom: 33px;

            color: #fb802d;
          }
        }

        &>div:last-of-type {
          position: relative;

          width: 760px;
          height: 100%;

          &>h3 {
            font-size: 24px;
            font-weight: 400;
            line-height: 15px;

            height: 15px;
            margin-bottom: 15px;
            padding-bottom: 15px;

            color: #ff2223;
            /*border-left: 10px solid #ff2828;*/
            border-bottom: 1px solid #ff2828;
          }

          &>ul {
            width: 100%;

            &>li {
              box-sizing: border-box;
              width: 100%;
              height: 117px;
              padding: 20px 0;

              cursor: pointer;

              border-bottom: 1px solid #e6e6e6;

              &>h4 {
                display: flex;
                justify-content: space-between;

                height: 36px;

                &>p {
                  font-size: 18px;
                  font-weight: 400;

                  width: 90%;

                  .omit();
                }

                &>span {
                  font-size: 14px;
                  font-weight: 400;

                  color: #999;
                }
              }

              &>p {
                font-size: 15px;
                line-height: 24px;

                color: #999;

                .line();
              }
            }
          }

          &>div {
            position: absolute;
            right: 0;
            bottom: 0;

            text-align: right;

            &>.el-pagination {
              height: 30px;

              & /deep/ button {
                height: 100% !important;

                background-color: #ccc;
              }

              & /deep/ .el-pager {
                height: 100%;

                &>li {
                  line-height: 30px;

                  height: 100%;

                  background-color: #ccc;
                }
              }

              & /deep/ .el-icon-arrow-left:before {
                font-size: 30px;

                color: #fff;
              }

              & /deep/ .el-icon-arrow-right:before {
                font-size: 30px;

                color: #fff;
              }

              & /deep/ .active {
                background-color: #f00 !important;
              }

              & /deep/ .number {
                color: #fff;
              }

              & /deep/ .number:hover {
                background-color: #f00 !important;
              }
            }
          }
        }
      }
    }

    #imageAndText {
      position: relative;

      box-sizing: border-box;
      width: 100%;
      height: 1200px;
      padding: 77px 0 113px 0;

      background: #fbf5f5 url('../../static/img/forumImg.png') no-repeat center center;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;

      &>.typeArea {
        &>.img {
          width: 100%;
          height: 52px;
          margin-top: 37px;
          margin-bottom: 37px;

          text-align: right;

          &>img {
            width: 174px;
            height: 100%;
          }
        }

        &>.titleSmall {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: space-between;

          width: 100%;
          height: 20px;
          margin-bottom: 75px;

          &>p:first-of-type {
            width: 85%;
            height: 2px;

            background-color: red;
          }

          &>p:last-of-type {
            font-size: 14px;

            width: 15%;

            text-align: right;
          }
        }

        &>.itemList {
          display: flex;
          flex-wrap: wrap;

          box-sizing: border-box;
          width: 100%;
          height: 692px;

          background-color: #fff;
          box-shadow: 1px 1px 5px rgba(255, 0, 0, .1),
            -1px -1px 5px rgba(255, 0, 0, .1);

          &>.item:last-of-type>div>i {
            background-color: transparent !important;
          }

          &>.item {
            box-sizing: border-box;
            width: calc(100% / 3);
            height: 50%;
            padding-top: 30px;

            cursor: pointer;

            border: 1px solid transparent;
            border-right: none;

            &:hover {
              border: 1px solid #f00;
            }

            &:hover i {
              display: none;
            }

            &:hover>div {
              box-sizing: border-box;

              border: 0;
            }

            &>div {
              position: relative;

              box-sizing: border-box;
              width: 100%;
              height: 98%;
              padding: 0 15px;

              &>img {
                width: 100%;
                height: 228px;
                margin-bottom: 28px;
              }

              &>h5 {
                font-size: 22px;
                font-weight: 400;

                text-align: center;

                color: #ee2929;

                .omit();
              }

              &>div {
                position: absolute;
                top: 0;
                left: 15px;

                display: none;
                align-items: center;
                justify-content: center;

                width: calc(100% - 30px);
                height: 228px;

                background-color: rgba(255, 0, 0, .4);

                &>p {
                  font-size: 20px;

                  display: flex;
                  align-items: center;

                  color: #fff;

                  &>strong {
                    display: inline-block;

                    width: 86px;
                    height: 2px;

                    background-color: #fff;
                  }
                }
              }

              &:hover>div {
                display: flex;
              }
            }

            &:nth-of-type(-n + 2) i:first-of-type {
              position: absolute;
              top: 2%;
              right: 0;

              width: 1px;
              height: 96%;

              background-color: #e5e5e5;
            }

            &:nth-of-type(-n + 2) i:last-of-type {
              position: absolute;
              bottom: 0;
              left: 2%;

              width: 96%;
              height: 1px;

              background-color: #e5e5e5;
            }

            &:nth-of-type(3) i:last-of-type {
              position: absolute;
              bottom: 0;
              left: 2%;

              width: 96%;
              height: 1px;

              background-color: #e5e5e5;
            }

            &:nth-of-type(n+4) i:last-of-type {
              position: absolute;
              top: -25px;
              right: 0;

              width: 1px;
              height: calc(96% + 30px);

              background-color: #e5e5e5;
            }

            &:last-of-type i {
              background-color: transparent;
            }
          }
        }
      }

      &>div:last-of-type {
        position: absolute;
        bottom: 110px;
        left: 50%;

        height: 40px;

        transform: translateX(-50%);

        &>.el-pagination {
          height: 30px;

          & /deep/ button {
            height: 100% !important;

            color: #fff;
            background-color: #ccc;
          }

          & /deep/ .el-pager {
            height: 100%;

            &>li {
              line-height: 30px;

              height: 100%;

              background-color: #ccc;
            }
          }

          & /deep/ .el-icon-arrow-left:before {
            font-size: 30px;

            color: #fff;
          }

          & /deep/ .el-icon-arrow-right:before {
            font-size: 30px;

            color: #fff;
          }

          & /deep/ .active {
            background-color: #f00 !important;
          }

          & /deep/ .number {
            color: #fff;
          }

          & /deep/ .number:hover {
            background-color: #f00;
          }
        }
      }
    }

    /*消息发布*/
    &>#message {
      box-sizing: border-box;
      width: 100%;
      min-height: 1020px;
      padding: 75px 0 100px 0;
      /*background: url("../assets/img/xx.png") no-repeat center center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;*/

      background-color: #f5f5f5;

      &>.logo {
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;
        height: 40px;
        margin-bottom: 30px;

        &>img {
          width: 460px;
          height: 124%;
        }
      }

      /*  主标题*/
      &>h2 {
        font-size: 32px;

        .title(#ff0101);
      }

      #options {
        display: flex;
        align-items: center;

        height: 50px;
        margin: 56px auto 0;

        background-color: #fff;

        &>a {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 132px;
          height: 100%;

          color: #9c9c9c;

          &.active {
            color: #fff;
            background-color: #f00;
          }
        }
      }

      #Info {
        position: relative;

        box-sizing: border-box;
        height: 585px;
        margin: 10px auto 0;
        padding: 40px;

        background-color: #fff;

        &>div {
          width: 100%;
          height: 100%;

          border: 2px solid red;

          &>h5 {
            font-weight: 400;

            display: flex;
            align-items: center;

            width: 95%;
            height: 65px;
            margin: 20px auto 0;

            color: #d6d6d6;
            border-bottom: 1px dashed #f00;

            &>input {
              font-size: 18px;

              width: 100%;

              color: #333;
              border: 0;
              outline: 0;

              &::placeholder {
                color: #d6d6d6;
              }
            }
          }

          #editor {
            width: 95%;
            margin: 10px auto 0;

            & /deep/ .w-e-toolbar {
              padding: 0;

              border: 0 !important;
              background-color: #fff !important;
            }

            & /deep/ .w-e-text-container {
              z-index: 2 !important;

              height: 330px !important;
              min-height: 100px !important;

              border: 0 !important;
              background-color: #fff !important;
            }

            & /deep/ .w-e-text {
              overflow-y: scroll;

              background-color: #fff;

              &>p>img {
                width: auto !important;
              }
            }
          }
        }
      }

      #upData {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 110px;
        padding-bottom: 40px;

        background-color: #fff;

        &>button {
          font-size: 18px;

          width: 190px;
          height: 60px;

          cursor: pointer;

          color: #f00;
          border: 1px solid #f00;
          background-color: transparent;

          &:hover {
            color: #fff;
            background-color: #f00;
          }
        }
      }
    }
  }

</style>
