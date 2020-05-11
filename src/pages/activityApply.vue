<template>
  <div class="activityApply">
    <div class="titleContainer" :class="{active : topDistance>=700}">
      <div class="title typeArea">
        <el-breadcrumb separator="/" class="nav">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="./volunteer.html">志愿者活动</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="./activityDetail.html">详情</a></el-breadcrumb-item>
          <el-breadcrumb-item>报名</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="form typeArea">
      <form>
        <p class="formTitle"><i class="iconfont">+</i><span>志愿者报名</span></p>
        <div class="formlist">
          <p>
            <span>姓名</span>
            <input type="text" placeholder="请输入您的姓名">
          </p>
          <p>
            <span>性别</span>
            <strong class="checkbox">

              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>

            </strong>
          </p>
          <p>
            <span>职务</span>
            <input type="text" placeholder="请输入您的职务">
          </p>
          <p>
            <span>身份证号</span>
            <input type="text" placeholder="请输入您的身份证号码">
          </p>
          <p>
            <span>住址</span>
            <input type="text" placeholder="请输入您的住址">
          </p>
          <p>
            <span>所在单位</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p>
            <span>联系电话</span>
            <input type="text" placeholder="请输入您的联系电话">
          </p>
          <p>

            <input type="text" placeholder="请输入验证码"><button v-if="!time">发送验证码</button><button
              v-else>重发验证码{{ time }}s</button>

          </p>
        </div>
        <button class="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activityApply',
    data() {
      return {
        radio: '1',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        topDistance: 0,
        time: 0

      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
      //指定位置悬浮
      handleScroll() {
        let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
        this.topDistance = top
      },
    }
  }

</script>

<style scoped lang="less">
  .titleContainer {
    width: 100%;
    height: 50px;

    background: #e8e8e8;

    .title {
      .nav {
        line-height: 50px;

        height: 50px;
      }
    }
  }

  .form {
    box-sizing: border-box;
    margin: 35px auto 80px;
    padding: 35px 205px;

    border: 1px solid #e8e8e8;

    .formTitle {
      font-size: 25px;

      margin-bottom: 80px;

      span {
        font-size: 25px;
      }
    }

    .formlist {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      p {
        width: 49%;
        margin-bottom: 25px;

        span {
          display: block;

          margin-bottom: 20px;
        }

        input {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          padding: 0 10px;
        }

        .checkbox {
          line-height: 40px;

          display: block;

          box-sizing: border-box;
          width: 100%;
          height: 40px;
          padding: 0 10px;

          border: 1px solid #a9a9a9;
        }
      }

      p:last-child {
        display: flex;
        justify-content: space-between;

        box-sizing: border-box;
        margin-top: 34px;

        input {
          width: 70%;
        }

        button {
          width: 30%;

          color: #fff;
          background: #ec7028;
        }
      }
    }
  }

  .el-select {
    width: 100%;
  }

  .el-select /deep/ input {
    line-height: 40px;

    height: 40px;

    border: 1px solid #a9a9a9;
  }

  .submit {
    display: block;

    width: 120px;
    height: 50px;
    margin: 50px auto;

    color: #fff;
    border-radius: 50px;
    background: #ec7028;
  }

  .active {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
  }

  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: #ec7028;
    background: #ec7028;
  }

  /deep/ .el-input__inner {
    border-radius: none;
  }

</style>
