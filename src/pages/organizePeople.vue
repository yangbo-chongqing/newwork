<template>
  <div class="organizeTeach">
    <!--   导航     -->
    <div class="nav" :class="{actives : topDistance}">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <router-link to="/organize.html">组织建设</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>组织架构</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div id="Myborder" style="width: 100%;height: 40px" v-show="topDistance"></div>

    <div class="select typeArea">
      <div class="search">
        <h3 class="title">区域： </h3>
        <p v-for="(item,index) in vals" class="address" :key="index"> <span>{{item}}</span> </p>
        <div class="prompt">{{prompt}}</div>
      </div>
      <div class="moreSelect">
        <el-cascader v-model="value" style="width:300px;" :placeholder="'请选择地区'" :options="options"
          @change="handleChange" :props="{ label: 'name' }">
        </el-cascader>
      </div>
    </div>
    <!--  村支部书记    -->
    <div class="content">
      <div class="contentBox typeArea">
        <div class="headline wow slideInRight" id="one">
          <i><img src="../assets/img/num_1.png"></i>{{branchName}}
          <div class="titleSmall">
            <p class="wow slideInLeft">
              党员所在组织村支部信息
            </p>
            <p></p>
          </div>
        </div>
        <!-- 轮播图 -->
        <div class="areaList typeArea" v-show="branchMsg.length">
          <el-carousel :interval="4000" type="card" height="510px">
            <el-carousel-item v-for="(item,index) in branchMsg" :key="index">
              <div class="imgBox">
                <img :src="item.mebImg">
                <div class="Peoples">
                  <p>党员信息: <span>{{item.mebName}}</span></p>
                  <p>党员职务: <span>{{item.mebPosition}}</span></p>
                  <p>联系电话: <span>{{item.mebPhone}}</span></p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 轮播图结束 -->
      </div>
    </div>
    <div v-show="!branchMsg.length" class="notDate typeArea">
      <img src="../assets/img/notImgThree.png" alt="">
    </div>
    <!-- 更多党员 -->
    <div class="morePeople">
      <div class="peopleBox" v-for="(item, index) in 0" :key="index">
        <div class="img">
          <img src="http://lorempixel.com/640/480/people" alt="">
        </div>
        <p class="name">Future Security Administrator</p>
        <p class="job">Legacy Division Analyst</p>
        <p class="phone">1-928-753-9523</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    WOW
  } from 'wowjs'
  export default {
    name: "organizePeople",
    data() {
      return {
        topNums: 0,
        toolIndex: 0,
        branchName: '', //支部名称
        branchMsg: [], //支部信息列表
        value: [],
        city: '',
        options: [],
        vals: [],
        prompt: ''
      }
    },
    computed: {
      topDistance: function () {
        return this.topNums > 700;
      },
    },
    methods: {
      handleScroll() {
        let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset);
        this.topNums = top;
      },
      handleChange(value) {
        if (value) this.prompt = '';
        this.vals = this.getCascaderObj(value, this.options);
        this.searchLodge(value[5]);
      },
      getCascaderObj(val, opt) {
        return val.map(function (value, index, array) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children;
              return itm.name
            }
          }
          return null;
        });
      },
      /*
        多级选择、并删除最后一个多余children
      */
      multistage() {
        this.$axios.post('/fun/deptOrg/organizationInfo', this.qs({
          province: 4
        })).then(msg => {
          this.options = msg.data.data;
        })
      },
      /* 查询人物 */
      searchLodge(id) {
        let arr = [];
        this.$axios.post('/fun/partyMember/getOrgLeader', this.qs({
          orgId: id
        })).then(msg => {
          this.branchName = msg.data.deptOrgName
          if (msg.data.data.length != 0) {
            this.branchMsg = msg.data.data
          } else {
            this.branchMsg = msg.data.data
          }

        })
      },
      // /* 改变支部人物 */
      // changePeople(val){
      //   this.searchPeople(val)
      // }
    },
    mounted() {
      new WOW().init();
      window.addEventListener('scroll', this.handleScroll, true);
      if (this.vals.length == 0) {
        this.prompt = '未选择区域，请在右侧选择区域!'
      }
      //  获取支部数据
      this.$axios.post('/fun/partyMember/getOrgLeader').then(msg => {
        if (msg.status == 200) {
          this.branchMsg = msg.data.data;
          this.branchName = msg.data.deptOrgName;
        } else {
          this.$message({
            message: '网络错误请稍后再试！',
            type: 'error'
          });
        }
      })
      this.multistage();
    },

    watch: {
      dialogFormVisible(newval) {
        if (!newval) {
          this.isParty()
        }
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/less/public.less";

  /* 导航样式 */
  .nav {
    width: 100%;
    height: 50px;
    background-color: #e8e8e8;
  }

  .navBox {
    display: flex;
    justify-content: space-between;
  }

  .breadCrumb {
    margin-top: 17px;
    margin-left: 20px;
  }

  .actives {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .navItem {
    height: 49px;

    &>ul {
      height: 100%;
      display: flex;

      li {
        height: 100%;
        width: 70px;
        text-align: right;
        line-height: 50px;
        position: relative;
        margin-left: 30px;

        a {
          display: inline-block;
          height: calc(100% - 2px);
          font-size: 16px;

          &.active {
            border-bottom: 2px solid #e61a18;
            color: #e61a18;
          }
        }

        i {
          position: absolute;
          left: 0;
          width: 2px;
          height: 2px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #000;
        }
      }
    }
  }

  /*  内容 */
  .gray {
    background-color: #eeeeee !important;
  }

  .content {
    width: 100%;
    margin: 30px 0 0;
    padding-bottom: 50px;
    background-color: #ffffff;

    &>.contentBox {
      box-sizing: border-box;
      position: relative;
      padding: 10px 0 0;

      .headline {
        /*margin: 80px 0;*/
        font-size: 30px;
        color: #ff2727;

        &>i {
          margin-right: 10px;
        }

        &>.titleSmall {
          width: 100%;
          height: 20px;
          display: flex;
          align-items: center;
          margin-left: 46px;
          margin-top: 10px;
          color: #000000;
          flex-direction: row;

          /*margin-bottom: 75px;*/
          &>p:first-of-type {
            font-size: 14px;
            width: 14%;
            margin-right: 20px;
          }

          &>p:last-of-type {
            height: 2px;
            background-color: red;
            width: 78%;
          }
        }
      }
    }
  }

  .areaList {
    &>.el-carousel--horizontal {
      overflow: hidden;
    }

    .el-carousel__item {
      width: 360px;
      height: 510px;
      margin-top: 15px;
      margin-left: 125px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      box-sizing: border-box;
    }

    .el-carousel__item>h3 {
      width: 100%;
      line-height: 48px;
      border-bottom: 1px solid #e2e2e2;
      box-sizing: border-box;
      padding: 0 16px;
      font-size: 20px;
      color: #fb802d;

      &>span {
        font-size: 13px;
      }
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #ffffff;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #ffffff;
    }

    & /deep/.el-carousel__button {
      width: 50px;
      height: 10px;
      border-radius: 10px;
      background-color: #bfbfbf;
    }

    & /deep/ .is-active>.el-carousel__button {
      background-color: #ff0000;
    }

    & /deep/ .el-carousel__indicators--outside {}

    & /deep/ div.is-active {
      box-shadow: 0 0 20px rgba(255, 0, 0, .2);
    }

    & /deep/ div.is-active {
      transform: translateX(300px) scale(0.83) !important;
    }

    & h4 {
      width: 100%;
      line-height: 40px;
      .line(2);
      box-sizing: border-box;
      padding: 0 15px;
      font-size: 18px;
      font-weight: 400;
    }

    & /deep/.el-carousel__item.is-active.el-carousel__item--card.is-in-stage>h3 {
      color: #f00
    }

    & .imgBox {
      height: 518px;
      position: relative;

      &>img {
        width: 100%;
        height: 100%;
      }

      &>.Peoples {
        display: none;
        position: absolute;
        bottom: 0;
        background-color: rgba(255, 255, 255, .80);
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        padding-left: 10%;

        &>p {
          margin-top: 10px;

          &>span {
            color: #ff0000;
            margin-left: 10px;
          }
        }
      }

      &:hover {
        &>.Peoples {
          display: block;
        }
      }
    }
  }

  /* 选择 */
  .select {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    &>.search {
      display: flex;
      align-items: center;
      margin-left: 50px;

      &>.title {
        font-size: 25px;
        font-weight: normal;
      }

      &>.prompt {
        margin-left: 10px;
        color: #666666;
        font-size: 14px;
      }

      &>.address {
        color: #999;
        margin-left: 5px;

        &>span {
          color: #666666;
          margin: 0 5px;
          font-size: 14px;
        }
      }

      &>p.address:not(:last-of-type) span::after {
        content: '➤';
        color: #ff0000;
        margin-left: 10px;
      }

      &>p.address:not(:last-of-type) span {
        color: #333;
      }
    }

    &>.moreSelect {
      margin-right: 30px;
    }
  }

  /* 更多党员 */
  .morePeople {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    &>.peopleBox {
      width: 275px;
      height: 360px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 40px;
      justify-content: space-between;
      margin: 0 29px 30px;

      &>.img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 50px;

        &>img {
          width: 100%;
          height: 100%;
        }
      }

      &>p {
        text-align: center;
        font-size: 14px;
        margin: 5px 0;
      }

      &>.name {
        font-size: 20px;
        color: #666666;
      }

      &>.job {
        font-size: 14px;
        color: #a5a5a5;
      }

      &>.phone {
        border-top: 1px solid #ccc;
        margin: 10px 20px 0;
        padding-top: 10px;
      }
    }
  }

  /* 党员人物选择 */
  .selectMan {
    display: none;
    flex-direction: row-reverse;

    &/deep/.el-select {
      margin-right: 100px;
      margin-top: 20px;
    }
  }

  .selectManShow {
    display: flex
  }

  /* 显示暂无数据 */
  .notDate {
    margin-top: 20px;

    &>img {
      width: 570px;
      margin: 0 auto;
      display: block;
    }
  }

</style>
