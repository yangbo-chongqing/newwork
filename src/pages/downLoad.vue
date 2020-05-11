<template>
  <div id="downLoad">
    <header>
      应用下载
    </header>
    <!--标题-->
    <div v-for="(item,index) in appList" :key="index">
      <div>
        <div>
          <img src="../assets/img/banner.png" alt="">
        </div>
        <div>
          <h6>{{ item.title }}</h6>
          <p>总大小{{ item.audit_contents | format}}M</p>
          <p>下载次数 {{ item.read_count}}次</p>
        </div>
        <div>
          <button @click="downloadApp(item)">下载</button>
        </div>
      </div>
      <!--     展示图片 -->
      <div class="removescrollbar">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
        <img src="../assets/img/banner2.png" alt="">
      </div>
      <!--简介-->
      <div class="introduction">
        <h4>简介</h4>
        <div :class="{line: item.isShow}">
          {{ item.introduction }}
        </div>
        <div>
          <span @click="show(item)" :class="{show:!item.isShow}">
            展开更多
            <i class="iconfont">&#xe620;</i>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "downLoad",
    data() {
      return {
        area: this.$route.query || {}, //url上面的信息
        appList: []
      }
    },
    methods: {
      downloadApp(obj) {
        this.$axios.post('information/getOne', this.qs({
          news_id: obj.news_id
        })).then(msg => {
          if (msg.status == 200) {
            window.open(msg.data.data[0].address)
          }
        })
      },
      getAppList() {
        this.$axios.post('/F_Information/getInformationListApp', this.qs({
          news_type: 90,
          city: this.area.city,
          province: this.area.province
        })).then(msg => {
          if (msg.status == 200) {
            let List = msg.data.data.list
            List.forEach(item => {
              item.isShow = true
            })
            this.appList = List
          } else {
            //报错
          }
        }).catch(err => {
          //报错
        })
      },
      show(obj) {
        obj.isShow = false
      }
    },
    components: {},
    created() {
      this.getAppList()
    },
    filters: {
      format(o) {
        return parseInt(o / 1024 / 1024 * 10) / 10
      }
    }
  }

</script>

<style scoped lang="less">
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
  #downLoad {
    width: 100vw;
    & > header {
      font-size: 18px;

      display: flex;
      align-items: center;
      justify-content: center;

      box-sizing: border-box;
      width: 100%;
      height: 40px;

      border-bottom: 1px solid #e5e8ff;
    }
    & > div > div:first-of-type {
      display: flex;

      box-sizing: border-box;
      width: 95%;
      margin: 0 auto;
      padding: 10px;

      border-bottom: 1px solid #e5e8ff;
      & > div:first-of-type {
        width: 27%;
        height: 88.75px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > div:nth-of-type(2) {
        width: 40%;
        height: 88.75px;
        margin: 0 3%;
        & > p,& > h6 {
          line-height: calc(88.75px / 3);

          .omit();
        }
        & > h6 {
          font-size: 16px;

          color: #444;
        }
        & > p {
          font-size: 16px;
        }
      }
      & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 27%;
        height: 88.75px;
        & > button {
          font-size: 16px;

          width: 70%;
          height: 40%;

          color: #fff;
          border-radius: 100vh;
          background-color: #ff6623;
        }
      }
    }
    & > div > div:nth-of-type(2) {
      overflow-x: auto;
      overflow-y: hidden;

      box-sizing: border-box;
      width: 95%;
      height: 160px;
      margin: 0 auto;
      padding: 10px;

      white-space: nowrap;

      border-bottom: 1px solid #e5e8ff;
      & > img {
        width: calc(30%);
        height: 100%;
        margin-right: calc(10% - 50px / 2);
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    /*内容*/
    & > div > div:last-of-type {
      box-sizing: border-box;
      width: 100%;
      padding: 15px;

      border-bottom: 5px solid #e5e8ff;
      & > div:first-of-type {
        line-height: 25px;

        width: 100%;
        min-height: 25px;
        margin-bottom: 10px;

        text-indent: 2em;

        color: #6d6d6d;
        &.line {
          .line(6);
        }
      }
      & > div:last-of-type {
        text-align: center;
        & > span {
          display: flex;
          flex-direction: column;
          &.show {
            display: none;
          }
        }
      }
    }
  }

</style>
