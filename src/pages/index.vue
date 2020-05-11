<template>
  <div id="index">
<!--    <indexSwper></indexSwper>-->
    <!--  最新消息  -->
    <div class="msg">
      <div class="msgBox">
        <div class="msgShow">
          <i class="iconfont"><img src="../assets/img/notice.png" alt="" /></i>
          <span class="iconMsg">最新消息:</span>
          <div class="iconBox">
            <div v-for="(item,index) in noticeData" :key="index" class="textMsg">
              <p @click="gainNotice(item.news_id)">{{item.title}}</p><span>{{item.create_date | capitalize}}</span>
            </div>
          </div>
        </div>
        <div class="msgButton">
          <!--            <div class="back" @click="backNotice"><i class="iconfont">&#xe64f;</i></div>-->
          <!--            <div class="top" @click="topNotice"><i class="iconfont">&#xe653;</i></div>-->
        </div>
      </div>
    </div>
    <!--   多端展示  -->
    <div class="columnOne">
      <div class="columnBox typeArea">
        <div class="hrTop">
          <div class="hr wow slideInUp">
            <span></span>
            <i id="one"><img src="../assets/img/toOne.png" alt=""></i>
            <span></span>
          </div>
          <h2 class="wow slideInLeft">四大平台、完美结合、各具特色</h2>
          <p class="wow slideInRight">四大平台、完美结合、各具特色</p>
        </div>

        <div class="reveal wow slideInUp">
          <div class="revealBox">
            <div class="revealTop">
              <h3>Web端</h3>
            </div>
            <div class="circle">
              <div class="circleBox">
                <img src="../assets/img/one.png" alt="">
              </div>
            </div>
            <div class="revealDown">
              <p>-站式实现党员学习监管、会议签到查看、党员互动，党建信息汇集与共享
                加倍增强基层党组织的凝聚力和战斗力</p>
            </div>
          </div>
          <div class="revealBox">
            <div class="revealTop">
              <h3>大数据端</h3>
            </div>
            <div class="circle">
              <div class="circleBox">
                <img src="../assets/img/two.png" alt="">
              </div>
            </div>
            <div class="revealDown">
              <p> 大数据为党建工作的健康进行提供切实可行的方法:收集分析数据高效党务管理;挖掘数据相关度密切党群交流;数据分析预测，及时监测事件，及时应对。</p>
            </div>
          </div>
          <div class="revealBox">
            <div class="revealTop">
              <h3>app端</h3>
            </div>
            <div class="circle">
              <div class="circleBox">
                <img src="../assets/img/three.png" alt="" class="special">
              </div>
            </div>
            <div class="revealDown">
              <p>通过手机方便地学习政党知识，了解最新政党资讯。党建即党的建设,党的建，开发建设的移动党建工作平台,是基层党组织利用;“互联网+”的手段进行党员教育管理的新载</p>
            </div>
          </div>
          <div class="revealBox">
            <div class="revealTop">
              <h3>后台管理端</h3>
            </div>
            <div class="circle">
              <div class="circleBox">
                <img src="../assets/img/four.png" alt="">
              </div>
            </div>
            <div class="revealDown">
              <p>党的各级党组织与广大党员提供基层党建工作管理、监督、学习与交流的平台。通过合理有效的大数据分析统计，做到信息及时送达，</p>
            </div>
          </div>
        </div>

        <div class="list wow slideInUp">
          <div class="selectList" v-if="rollShow">
            <ul class="listBox">
              <div class="thread"></div>
              <li @click="goAddress('#header')"><i class="up iconfont">&#xe616;</i>首页</li>
              <li :class="{ colorActive:before == 1 }" @click="goAddress('#one')"><i
                  :class="{ threadActive:before == 1 }"></i>多端展示</li>
              <li :class="{ colorActive:before == 2 }" @click="goAddress('#two')"><i
                  :class="{ threadActive:before == 2 }"></i>热门消息</li>
              <li :class="{ colorActive:before == 3 }" @click="goAddress('#three')"><i
                  :class="{ threadActive:before == 3 }"></i>功能展示</li>
              <li :class="{ colorActive:before == 4 }" @click="goAddress('#five')"><i
                  :class="{ threadActive:before == 4 }"></i>关于平台</li>
              <li @click="goAddress('#footer')"><i class="down"></i>底部</li>
            </ul>
          </div>
          <div class="system">
            <div class="systemImg">
              <img src="../assets/img/computer.png" alt="">
            </div>
          </div>
          <div class="essay">
            <h3>邯郸智慧党建系统</h3>
            <p>高效收银、锁住会员、拥抱互联网
              移动互联网时代扫码支付整体解决方案互联互加收银系统！让每一个店铺充分利用互联网，提升经营效益，助力企业成长！移动互联的时代，好门店岂能没有移动支付！微信支付、支付宝支付，高效便捷，无需找零。轻松掌握支付，高效引导到店，精准会员触达。便捷的支付，可以给顾客提供更好的消费体验
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--  热门消息  -->
    <div class="hotMsg">
      <div class="hotBox">
        <div class="hrTop">
          <div class="hr">
            <span></span>
            <i id="two"><img src="../assets/img/toTwo.png" alt=""></i>
            <span></span>
          </div>
          <h2 class="wow slideInLeft">热门消息，准确及时掌握</h2>
          <p class="wow slideInRight">热门消息，准确及时掌握</p>
        </div>
        <div class="hotSwper">
          <el-carousel :interval="4000" type="card" height="520px">
            <el-carousel-item v-for="(item,index) in notNewsList" :key="index">
              <div class="carouseBox">
                <h2><span>{{item.create_date | hotChange(0)}}</span>{{item.create_date | hotChange(1)}}</h2>
                <span @click="gotoNews(item.news_id)">{{item.title}}</span>
                <img :src="item.contentPic | getOneImg" alt="" class="imgs" @click="gotoNews(item.news_id)">
                <p v-html="revise(item.content)"></p>
                <a href="javascript:;" @click="gotoNews(item.news_id)">查看详情</a>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!--  功能展示  -->
    <div class="ability">
      <div class="abilityBox typeArea">
        <div class="hrTop">
          <div class="hr">
            <span></span>
            <i id="three"><img src="../assets/img/toThree.png" alt=""></i>
            <span></span>
          </div>
          <h2 class="wow slideInLeft">多功能一体化、满足党建多样需求</h2>
          <p class="wow slideInRight">党建的所有功能展示</p>
        </div>
        <div class="coreImg">
          <img src="../assets/img/bagImg.png" alt="" class="wow zoomIn">
        </div>
      </div>
    </div>
    <!--  关于平台  -->
    <div class="about">
      <div class="aboutBox">
        <div class="hrTop">
          <div class="hr">
            <span></span>
            <i id="five"><img src="../assets/img/toFour.png" alt=""></i>
            <span></span>
          </div>
          <h2 class="wow slideInLeft">关于平台</h2>
          <p class="wow slideInRight">平台服务对象</p>
        </div>
        <div class="serve">
          <div class="leftImg wow slideInLeft">
            <img src="../assets/img/more.png" alt="">
          </div>
          <div class="rightText wow slideInRight">
            <p>是以党的十八大和十八届五中、六中全会精神为指导，加强党员干部教育为目的的，并结合各级实际情况进行实施...
              坚持“应用创新”的科技公司多年来扎根定制软件产业，以良好的专业素养和服务意识在行业中独树一帜，致力于成为中国软件行业解决方案专业提供商。</p>
            <p>我们不仅仅是一家企业，更是创新思维方式的倡导者与执行者，我们努力将这种创新的思维模式延伸到商业领域，为推动中国软件行业的发展做出积极贡献。</p>
            <a href="#" @click.prevent="moreParty">查看更多></a>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {
    WOW
  } from 'wowjs';
  // import indexSwper from '../components/public/indexSwper';
  export default {
    name: 'index',
    data() {
      return {
        rollShow: false, //是否显示
        userArea: {},
        color: '#ff2828', //颜色
        noticeData: [], //公共信息
        CurrentNum: 1, //页数
        notNewsList: [],
        before: 0
      }
    },
    components: {
      // indexSwper
    },
    filters: {
      capitalize: function (value) {
        if (value) {
          value = value.toString();
          return value.split(' ')[0];
        }
        return value
      },
      hotChange: function (value, nature) {
        if (value) {
          value = value.toString();
          let year = value.substring(0, 4);
          let moon = value.substring(6, 11);
          if (nature) {
            return year
          } else {
            return moon
          }
        }
        return value
      }
    },
    methods: {
      moreParty() {
        this.$router.push({
          name: 'partyBuildDetails',
          query: {
            news_id: this.Base64.encode(1273)
          }
        })

      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.rollShow = scrollTop >= 600;
        if (scrollTop <= 900) {
          this.before = 1
        }
        if (scrollTop >= 2000) {
          this.before = 2
        }
        if (scrollTop >= 3000) {
          this.before = 3
        }
        if (scrollTop >= 4400) {
          this.before = 4
        }
        if (scrollTop >= 4580) {
          this.before = 5
        }
      },
      notice() {
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: 1,
          province: this.userArea.province,
          city: this.userArea.city,
          district: this.userArea.district,
          street: this.userArea.street,
          community: this.userArea.community,
          pageSize: 2,
          pageCurrent: 1
        })).then(msg => {
          this.noticeData = msg.data.data.list;
        })
      },
      gainNotice(id) {
        this.$router.push({
          name: 'partyBuildDetails',
          query: {
            news_id: this.Base64.encode(id)
          }
        })
      },
      hotNews() {
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: 47,
          province: this.userArea.province,
          city: this.userArea.city,
          district: this.userArea.district,
          street: this.userArea.street,
          community: this.userArea.community,
          pageSize: 5,
          pageCurrent: 1
        })).then(msg => {
          this.notNewsList = msg.data.data.list;
        })
      },
      gotoNews(id) {
        this.$router.push({
          name: "partyBuildDetails",
          query: {
            news_id: this.Base64.encode(id)
          }
        })
      }
    },
    mounted() {
      this.getTop(this.handleScroll)
      new WOW().init()
    },
    created() {
      //判断
      this.isUserArea()
      //获取
      this.userArea = this.getUserArea(1)

      this.notice();

      this.hotNews();
    },
    computed: {
      revise() {
        return function (msg) {
          return msg.replace(/<\/?.+?\/?>/g, '');
        }
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../assets/less/public.less';

  #index {
    user-select: none;
  }

  .msg {
    width: 100%;
    height: 50px;

    background-color: #e8e8e8;
  }

  .msgBox {
    font-size: 14px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 1200px;
    margin: 0 auto;
  }

  .msgShow {
    display: flex;
    align-items: center;
    flex-direction: row;

    width: 100%;
  }

  .msgShow>.iconMsg {
    font-size: 13px;

    margin-right: 50px;
  }

  .iconBox {
    display: flex;

    margin-left: 100px;
  }

  .textMsg {
    display: flex;
  }

  .textMsg>p {
    line-height: 2;

    margin-left: 20px;

    cursor: pointer;
  }

  .textMsg>p:hover {
    color: #ff2828;
  }

  .msgShow>i {
    margin-top: 4px;
    margin-right: 6px;

    color: red;
  }

  .textMsg p {
    font-size: 13px;

    width: 300px;

    .omit();
  }

  .textMsg span {
    font-size: 13px;

    margin-left: 10px;
    padding: 2px 5px;

    color: #b3b3b3;
    border: 1px solid #c1c1c1;
  }

  .msgButton {
    display: flex;
    flex-direction: row;
  }

  .msgButton .top,
  .back {
    margin: 0 20px;

    cursor: pointer;
  }

  .msgButton i {
    font-size: 25px;
  }

  .columnOne {
    width: 100%;
    margin: 80px 0;
  }

  .columnOne>.columnBox {
    height: auto;
    margin: 0 auto;
  }

  .hrTop {
    width: 460px;
    margin: 0 auto;
  }

  .hr {
    display: flex;
    justify-content: center;
  }

  .hr i {
    margin: 0 50px;
  }

  .hr>span {
    width: 195px;
    height: 18px;

    border-bottom: 2px solid #ff2f2f;
  }

  .hrTop>h2 {
    font-size: 30px;

    margin: 50px 0;

    text-align: center;
  }

  .hrTop>p {
    font-size: 15px;

    text-align: center;
  }

  .reveal {
    display: flex;
    justify-content: space-between;

    margin: 90px 0;
  }

  .reveal>.revealBox {
    position: relative;

    width: 320px;
    height: 410px;
    margin: 10px;

    box-shadow: 0 0 6px rgba(0, 0, 0, .10);
  }

  .reveal>.revealBox>.revealTop {
    width: 100%;
    height: 144px;

    background: linear-gradient(left, #fe8743, #e94a2c);
  }

  .reveal>.revealBox>.revealTop>h3 {
    font-weight: bold;
    line-height: 5;

    text-align: center;

    color: #fff;
  }

  .revealDown {
    width: 100%;
    height: 265px;

    background-color: #fff;
  }

  .circle {
    position: absolute;
    top: 80px;
    left: 50%;

    box-sizing: border-box;
    width: 131px;
    height: 131px;
    padding: 5px;

    transform: translate(-50%);

    border-radius: 50%;
    background-image: linear-gradient(200deg, #6de073 30%, #23c0ca 50%);
    box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  }

  .circleBox {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    border-radius: 50%;
    background: #fff;
  }

  .circleBox>img {
    width: 85px;
  }

  .circleBox>.special {
    width: 50px;
  }

  .revealDown>p {
    font-size: 15px;
    line-height: 1.5;

    position: absolute;
    top: 55%;
    left: 50%;

    width: 235px;

    transform: translateX(-50%);

    color: #757575;
  }

  .list {
    display: flex;
    justify-content: space-between;

    margin-top: 50px;
    margin-right: 100px;
    margin-left: 100px;
  }

  .selectList {
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50px;

    height: 300px;
    margin-top: 20px;

    transform: translateY(-50%);

    &>.listBox {
      position: relative;

      &>.thread {
        position: absolute;
        z-index: 99;
        left: -23px;

        height: 220px;
        margin-top: 1px;

        border: 1px solid red;
      }

      &>.colorActive {
        color: #ff2828;
      }

      &>li {
        font-size: 14px;

        position: relative;

        margin-bottom: 20px;

        cursor: pointer;

        &>i {
          position: absolute;
          z-index: 999;
          top: 1px;
          left: -33px;

          display: block;

          width: 20px;
          height: 20px;

          border: 1px solid red;
          border-radius: 50%;
          background-color: #fff;
        }

        &>.up {
          font-size: 28px;

          top: -14px;
          left: -36px;

          color: #ff2828;
          border: none;
          background-color: transparent;
        }

        &>.down {
          font-size: 28px;

          top: 0;
          left: -37px;

          width: 30px;
          height: 30px;

          color: #ff2828;
          border: none;
          background-color: transparent;
          background-image: url('../assets/img/godown.png');
          background-size: cover;
        }

        &>.threadActive {
          color: #ff2828;
          background-color: #ff2828;
        }
      }
    }
  }

  .system {
    width: 610px;
    height: 366px;
  }

  .essay {
    font-size: 9px;

    width: 270px;
    height: 300px;

    color: #fff;
    background-color: #ffa145;
  }

  .essay>h3 {
    font-size: 17px;
    font-weight: bold;

    margin: 30px 0 20px;
    padding: 0 30px;
  }

  .essay>p {
    font-size: 12px;
    line-height: 23px;

    padding: 0 30px;
  }

  .hotMsg {
    width: 100%;
    padding-bottom: 50px;

    background-color: #f5f5f5;
  }

  .hotBox {
    width: 1200px;
    margin: 0 auto;
    padding-top: 70px;
  }

  .hotSwper {
    position: relative;

    margin-top: 50px;

    /deep/ .el-carousel__container {
      margin-top: 20px;
    }

    &>.el-carousel--horizontal {
      // overflow:hidden;
      box-sizing: border-box;

      border: 1px solid transparent;
    }

    /deep/ .is-active h2 {
      color: #ff2828;

      span {
        color: #ff2828;
      }
    }

    /deep/ .is-active a {
      color: #ff2828;
    }

    /deep/ div.is-active {
      box-sizing: border-box;

      border: 1px solid transparent;
      box-shadow: 0 0 20px rgba(255, 0, 0, .2);
    }

    /deep/ div.is-active:hover {
      border: 1px solid #f00;
    }
  }

  .el-carousel__item {
    box-sizing: border-box;
    ;
    width: 360px;
    margin-left: 125px;

    box-shadow: 0 0 6px rgba(0, 0, 0, .15);
  }

  .el-carousel__item h3 {
    font-size: 14px;
    line-height: 200px;

    margin: 0;

    opacity: .75;
    color: #475669;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #fff;
  }

  .hotSwper /deep/ .el-carousel__button {
    width: 50px;
    height: 10px;
    margin-top: 20px;

    border-radius: 10px;
    background-color: #bfbfbf;
  }

  .hotSwper /deep/ .is-active>.el-carousel__button {
    background-color: #ff8f45;
  }

  .carouseBox {
    padding: 0 15px;
  }

  .carouseBox h2 {
    font-size: 20px;

    margin: 20px 0;
    padding-bottom: 5px;

    color: #fb802d;
    border-bottom: 1px solid #d2d2d2;
  }

  .carouseBox h2>span {
    font-size: 35px;

    margin-right: 10px;

    color: #fb802d;
  }

  .carouseBox>span {
    font-size: 18px;
    line-height: 25px;

    color: #545454;

    .line(2);
  }

  .carouseBox>.imgs {
    display: block;

    width: 330px;
    height: 200px;
    margin-top: 10px;

    background-color: #ccc;
  }

  .carouseBox>p {
    font-size: 15px;
    line-height: 1.5;

    margin: 10px 0;

    color: #919191;

    .line(4);
  }

  .carouseBox>a {
    font-size: 12px;

    position: absolute;
    bottom: 20px;

    color: #ffa66b;
  }

  .ability {
    margin-top: 60px;
  }

  .coreImg {
    width: 1200px;
  }

  .coreImg>img {
    width: 100%;
  }

  .about {
    width: 100%;
    padding-top: 70px;

    background-color: #eee;
  }

  .about>.aboutBox {
    width: 1200px;
    margin: 0 auto;
  }

  .serve {
    display: flex;
    justify-content: space-between;

    margin-top: 50px;
    padding-bottom: 100px;
  }

  .serve>.leftImg {
    width: 460px;
    height: 470px;
  }

  .serve>.rightText {
    position: relative;

    width: 666px;
    margin-top: 60px;
  }

  .serve>.rightText>p {
    line-height: 2;

    margin-bottom: 20px;

    text-indent: 2em;

    color: #4d4d4d;
  }

  .serve>.rightText>a {
    font-size: 13px;

    position: absolute;
    right: 0;
    bottom: 80px;

    padding: 13px 25px;

    color: #ee7129;
    border: 1px solid #ee7129;
    border-radius: 6px;
  }

  //添加动画
  .revealBox {
    cursor: pointer;
    -webkit-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  .revealBox:hover {
    transform: scale(1.1);
  }

</style>
