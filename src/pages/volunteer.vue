<template>
  <div id="volunteer">
    <!--  导航    -->
    <div class="title" :class="{active : topDistance>=700}">
      <el-breadcrumb separator="/" class="typeArea nav">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>志愿者活动</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <!--  活动展示    -->
    <div class="reveal">
      <div class="revealBox typeArea">
        <div class="titleMain">
          <div class="headline">
            <h2>活动展示</h2>
          </div>
        </div>
        <div class="lump">
          <!--     默认图片     -->
          <div class="defaultImg typeArea" v-show="defaultImg">
            <img src="../assets/img/notImgThree.png" alt="暂无内容">
          </div>
          <div class="lumpBox" v-for="(item,index) in list" :key="index" @click="godetail(item.activity_id)">
            <h2><span>{{item.create_time | monthsub}}</span><span class="year">{{item.create_time | yearsub}}</span>
            </h2>
            <p class="essay">{{item.title}}</p>
            <div class="lumpImg">
              <img :src="item.content_pic | getOneImg" alt="">
            </div>
            <div class="numBox">
              <p>目标人数:<span>{{item.pop_num}}人</span></p>
              <p>招募中</p>
            </div>
            <div class="progressBar">
              <div class="barContent">
                <p :style="{width:item.signUserNum/item.pop_num*100+'%'}"></p>
              </div>

            </div>
            <div class="details">
              <ul>
                <li>
                  <p>剩余名额</p>
                  <!--| percent-->
                  <p>{{item.pop_num - item.signUserNum }}</p>
                </li>
                <li>
                  <p>报名人数</p>
                  <p>{{item.signUserNum}}人</p>
                </li>
                <li>
                  <p>报名截止时间</p>
                  <p>{{item.sign_end_time | timesub}}</p>
                </li>
              </ul>
            </div>
          </div>


        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page.sync="pageNum"
            @current-change="getlist" :total='pages'>
          </el-pagination>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "volunteer",
    data() {
      return {
        num: 9,
        list: [],
        topDistance: 0,
        pageSize: 6, //每页条数
        pageCurrent: 1,
        pageNum: 0, //当前页
        userArea: {}, //用户的地址信息
        percent: "",
        pages: 0, //总页数
        startTime: "",
        defaultImg: false

      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.getlist(1)
    },
    created() {
      this.isUserArea();
      this.userArea = this.getUserArea()

    },
    methods: {
      //跳转详情页
      godetail(activity_id) {
        this.$router.push({
          path: '/volunteeractivityDetail.html',
          query: {
            activity_id: this.Base64.encode(activity_id)
          }
        })
      },
      //获取活动展示页列表
      getlist(current) {
        this.$axios.post('/F_Activity/getList', this.qs({
          app: true,
          activity_type: 3,
          pageSize: this.pageSize,
          pageCurrent: current,
          province: this.userArea.province,
          city: this.userArea.city,
          district: this.userArea.district,
          street: this.userArea.street,
          community: this.userArea.community,
        })).then((res) => {
          if (res.status == 200) {
            this.pages = res.data.data.pages
            this.pageNum = res.data.data.pageNum
            this.pages = res.data.data.total
            console.log(res.data.data.list);
            for (let i = res.data.data.list.length - 1; i > -1; i--) {
              let oDate1 = new Date(res.data.data.list[i].sign_end_time);
              if (oDate1.getTime() < new Date().getTime()) {
                res.data.data.list.splice(i, 1);
              }
            }
            console.log(res.data.data.list.length);
            if (res.data.data.list.length == 0) {
              this.defaultImg = true;
              return false;
            }
            this.list = res.data.data.list;

          }
        })
      },
      //指定位置悬浮
      handleScroll() {
        let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
        this.topDistance = top;
      },
      //算距离招募时间new Date(a.replace(/-/g, "/"))

    },
    filters: {
      monthsub(v) {
        return v.split(" ")[0].split("-")[1] + "-" + v.split(" ")[0].split("-")[2]
      },
      yearsub(v) {
        return v.split(" ")[0].split("-")[0]
      },
      percent(v) {

        return v * 100 + "%"
      },
      timesub(v) {
        return v.split(" ")[0]
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/less/public.less";

  /* 导航样式 */
  .title {
    width: 100%;
    background: #e8e8e8;

    .nav {
      height: 50px;
      line-height: 50px;

      p {
        a {
          color: #e92c16;
          border-bottom: 2px solid #e92c16;
          padding-bottom: 12px;
        }
      }
    }
  }




  /* 活动展示 */
  .reveal {
    width: 100%;
    padding: 50px 0;
  }

  .titleMain {
    padding: 30px 0;

  }

  .headline {
    border-bottom: 2px solid #ff0000;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;


  }

  .headline>h2 {
    font-size: 30px;
    color: #ff0101;
    border-left: 10px solid #ff0000;
    padding-left: 15px;
  }



  /* 活动展示内容 */
  .lump {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
    width: 100%;
  }

  .lumpBox:hover {
    border: 1px solid #f2897d;
    box-shadow: 0 0 15px rgba(251, 25, 25, .35);
  }

  .lumpBox {
    width: calc((100% - 40px) / 3);
    height: 560px;
    padding: 30px 20px;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, .35);
    border: 1px solid transparent;
    margin-right: 20px;
    margin-bottom: 35px;

    &:nth-of-type(3n) {
      margin-right: 0;
    }

    h2 {
      font-size: 30px;
      color: red;
      border-bottom: 1px solid #ff0000;
      padding: 0 0 10px 10px;

      .year {
        margin-left: 5px;
        font-size: 15px;
      }
    }

    .essay {
      font-size: 20px;
      line-height: 30px;
      height: 60px;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .lumpImg {
      width: 100%;
      height: 225px;
      margin: 15px 0 20px 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .numBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      margin-bottom: 15px;

      p:first-child {
        span {
          color: #ee7d41;
        }
      }

      p:last-child {
        display: block;
        width: 80px;
        height: 30px;
        color: #fff;
        background: #e92c16;
        line-height: 30px;
        text-align: center;
      }

    }

    .details>ul {
      display: flex;
      align-items: center;
      margin-top: 20px;
      justify-content: space-between;

      li {
        text-align: center;

        p:first-child {
          margin-bottom: 15px;
        }
      }

      li:last-child {
        color: #fb802d;
      }
    }

    .progressBar {
      .barContent {
        width: 100%;
        height: 5px;
        background: #b2b2b2;
        position: relative;

      }

      p {
        width: 50%;
        height: 5px;
        position: absolute;
        top: 0;
        left: 0;
        background: #e92c16;
      }
    }

  }

  .active {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .page {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .line {
    margin: 0 5px;
  }


  /deep/.el-pagination button {
    height: 30px;
  }

  /deep/.el-pager li {
    height: 30px;
    line-height: 30px;
  }

  /deep/.el-pagination.is-background .el-pager li {
    min-width: 30px;

  }

  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #e92c16;

  }

  /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    background: #e92c16;
    color: #fff;
  }

  /deep/.el-pagination.is-background .btn-prev {
    min-width: 30px
  }

  /deep/.el-pagination.is-background .btn-next {
    min-width: 30px
  }

  .defaultImg {
    width: 670px;
    height: 430px;

    &>img {
      width: 100%;
      height: 100%;
    }
  }

</style>
