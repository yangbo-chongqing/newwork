<template>
  <div class="aboutUs">
    <div class="headers">
      <span><img :src="userMsg.pic_id" alt=""></span>
      <span>与我相关</span>
      <span v-if="unread>0" class="tt">{{unread}}</span>
      <span v-else class="tt" style="display: none;">{{unread}}</span>

    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <span>{{index+1+(pageCurrent-1)*20}}</span>
        <p><span class="text">{{item.msg}}</span><span class="time">{{item.time}}</span></p>
        <p><button @click="godetail(item.id,item.type)">查看</button></p>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'aboutUs',
    props: ['userMsg'],
    data() {
      return {
        pageSize: 20, //每页条数
        pageCurrent: 1,
        pageNum: 0, //当前页
        userArea: {}, //用户的地址信息
        percent: "",
        pages: 0, //总页数
        list: [],
        unread: 0,
        bool: false

      }
    },
    created() {
      this.getlist(1)
    },
    methods: {
      getlist(current) { //获取数据
        this.pageCurrent = current
        this.$axios.post("/informationComment/getMsgRelevantToMe", this.qs({
          pageSize: this.pageSize,
          pageCurrent: current,
        })).then((res) => {
          if (res.status == 200 && res.data.status == 200) {
            this.list = res.data.data

          }
        })
      },
      godetail(id, type) {
        if (type == "meeting") {
          this.$router.push({
            name: "organizeMeet",

          })
        } else if (type == "mission") {
          this.$message('请前往APP查看');
        } else {
          this.$router.push({
            name: "forumDetails",
            query: {
              news_id: this.Base64.encode(id)
            }
          })
        }

      }
    }

  }

</script>

<style scoped lang="less">
  .aboutUs {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 20px;
    .headers {
      // padding:20px 0 40px 0;
      position: relative;

      margin-bottom: 20px;

      border-bottom: 1px dotted #ed7029;
      span:first-child {
        display: inline-block;
        overflow: hidden;

        width: 50px;
        height: 50px;
        margin-bottom: 20px;

        border-radius: 50%;
        img {
          display: block;

          width: 100%;
          height: 100%;
        }
      }
      span:nth-of-type(2) {
        font-size: 20px;

        position: absolute;
        top: 50%;

        display: inline-block;

        margin-left: 15px;

        transform: translateY(-50%);

        color: #ed7029;
      }
      .tt {
        font-size: 12px;

        position: absolute;
        top: 0;
        left: 45px;

        display: block;

        width: 15px;
        height: 15px;

        text-align: center;

        color: #fff;
        border-radius: 50%;
        background: #f00;
      }
    }
    ul {
      li {
        line-height: 35px;

        display: flex;
        justify-content: space-between;

        width: 100%;
        span {
          width: 5%;
        }
        p:nth-of-type(1) {
          display: flex;

          width: 85%;
          .text {
            display: block;
            overflow: hidden;

            width: 75%;

            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .time {
            display: block;

            width: 25%;
            margin-left: 20px;
          }
        }
        p:last-child {
          width: 10%;
          button {
            display: inline-block;

            padding: 5px 20px;

            cursor: pointer;

            color: #ed7029;
            border: 1px solid #ed7029;
            border-radius: 15px;
            background: #fff;
            &:hover {
              color: #fff;
              background-color: #ed7029;
            }
          }
        }
      }
      .page {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
      }
    }
  }
  /deep/ .el-pagination {
    margin: 0 auto;
  }
  /deep/ .el-pagination button {
    height: 40px;
  }
  /deep/ .el-pager li {
    line-height: 40px;

    height: 40px;
  }
  /deep/ .el-pagination.is-background .el-pager li {
    min-width: 40px;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #e92c16;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
    background: #e92c16;
  }
  /deep/ .el-pagination.is-background .btn-prev {
    min-width: 40px;
  }
  /deep/ .el-pagination.is-background .btn-next {
    min-width: 40px;
  }

</style>
