<template>
  <div id="login" @keydown.enter="login">
    <header>
      <div>
        <img src="../assets/img/logo3.png" alt="" @click="goIndex">
        <span>邯郸智慧党建系统</span>
      </div>
    </header>
    <div id="border">
      <div>
        <div>
          <h3>
            <i></i>
            用户登录
          </h3>
          <p><i class="iconfont">&#xe60f;</i> <input type="text" placeholder='请输入账号' v-model="username"></p>
          <p><i class="iconfont">&#xe657;</i> <input type="password" placeholder='请输入密码' v-model="password"></p>
          <p>
            <input type="text" placeholder="请输入验证码" v-model="isCaptcha">
            <input id="code" type="button" v-model="captcha" title="看不清？换一个" @click="createCaptcha">
          </p>
          <div>
              <span>
                <p @click="flag=!flag"><i v-show="flag"></i></p>
                记住密码
              </span>
            <a href="javascript:;" @click="contact">忘记密码</a>
          </div>
          <button @click="login">登录</button>
          <router-link to="/register.html">注册</router-link>
        </div>
      </div>
      <p>邯郸党建 赛达科技 COPYRIGHT &copy2018-2020</p>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  export default {
    name: "login",
    data() {
      return {
        username:"",
        password:"",
        flag:false || JSON.parse(window.localStorage.getItem('Remember')),//是否记住密码
        captcha:"",
        isCaptcha:"",
        type:this.$route.query.type?this.Base64.decode(this.$route.query.type):0
      }
    },
    methods: {
      //登录
      login(){
        if(this.username.trim().length == 0){
          this.$message.error('请输入账号');
          return false
        }
        if(this.password.trim().length == 0){
          this.$message.error('请输入密码');
          return false
        }
        let isCaptcha  = this.isCaptcha.toUpperCase()
        const captcha = this.captcha.toUpperCase()
        if(isCaptcha.length == 0){
          this.$message.error('请输入验证码');
          return false
        }

        if(isCaptcha != captcha){
          this.$message.error('验证码输入错误');
          this.createCaptcha()
          return false
        }
        this.$axios.post('/login',this.qs({
          username:this.username,
          password:md5(this.password)
        })).then(msg=>{
          console.log(msg);
          if(msg.status == 200 && msg.data.code == 1){
            this.$message.error(msg.data.msg);
          }else if(msg.status == 200 && msg.data.code == 201){
            this.$confirm('此账号已在其他设备登录，是否强制登录?（强制登录会使另一台设备下线）', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this. qzLogin();
            }).catch(() => {

            });
          } else if(msg.status == 200 && msg.data.code == 0){
            this.$message.success('登陆成功');
            if(this.flag){
              window.localStorage.setItem('Remember',JSON.stringify(this.flag))
            }else{
              window.localStorage.removeItem('Remember')
            }
            //存储用户信息
            this.$axios.get('logins/isLogin').then(msg=>{
                let userMsg = msg.data.user
               /* console.log(userMsg);
                for (let key in userMsg){
                msg.data[key] = userMsg[key]
              }*/
             /* msg.data.MyPassword = this.password
              msg.data.user = null*/
                window.localStorage.setItem('userMsg',JSON.stringify(userMsg))
              if(this.type == 1){
                this.$router.push('/index.html')
              }else{
                this.$router.go(-1)
              }
            })
            /*登录后进行每5分钟调用一次登陆接口*/
            setInterval(()=>{
              this.$axios.post('/login',this.qs({
                username:this.username,
                password:md5(this.password)
              }))
            },1000 * 60 * 5)
          }
        })
      },
      qzLogin(){
        this.$axios.post('/login',this.qs({
          username:this.username,
          password:md5(this.password),
          isForce: 1
        })).then(msg=>{
          console.log(msg);
          if(msg.status == 200 && msg.data.code == 1){
            this.$message.error(msg.data.msg);
          }else if(msg.status == 200 && msg.data.code == 0){
            this.$message.success('登陆成功');
            if(this.flag){
              window.localStorage.setItem('Remember',JSON.stringify(this.flag))
            }else{
              window.localStorage.removeItem('Remember')
            }
            //存储用户信息
            this.$axios.get('logins/isLogin').then(msg=>{
              let userMsg = msg.data.user
              window.localStorage.setItem('userMsg',JSON.stringify(userMsg))
              if(this.type == 1){
                this.$router.push('/index.html')
              }else{
                this.$router.go(-1)
              }
            })
            /*登录后进行每5分钟调用一次登陆接口*/
            setInterval(()=>{
              this.$axios.post('/login',this.qs({
                username:this.username,
                password:md5(this.password)
              }))
            },1000 * 60 * 5)
          }
        })
      },
      //忘记密码
      contact(){
        this.$message.error('维护中,请联系管理员');
      },
        //logo点击回到主页
        goIndex(){
          this.$router.replace('/')
        }
    },
    created(){
      this.createCaptcha()
      //判断是否记住密码
      if(JSON.parse(window.localStorage.getItem('Remember'))){
        const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
        this.username = userMsg.username;
        this.password = userMsg.MyPassword;
      }
    }
  }
</script>

<style scoped lang="less">
  #login{
    width: 100vw;
    height:100vh;
    overflow: hidden;
    user-select: none;
    &>header{
      width: 100%;
      height: 100px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &>div{
        width: 344px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>img{
          width: 84px;
          height: 84px;
          cursor: pointer;
        }
        &>span{
          font-size: 27px;
          color: #ed7029;
        }
      }
    }
    &>#border{
      width: 100%;
      height: calc(100vh - 100px);
      position: relative;
      background: url("../assets/img/login.png") no-repeat center center;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      &>div{
        width: 386px;
        height: 50vh;
        background-color: #fff;
        position: absolute;
        top:18vh;
        right: 27vw;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1),
          -2px -2px 10px rgba(0,0,0,.1);
        &>div{
          width: 25vh;
          height:35vh;
          position: relative;
          &>h3{
            width: 100%;
            height: 3vh;
            color: #ed7029;
            display: flex;
            align-items: center;
            font-size: 23px;
            font-weight: 400;
            margin-bottom: 35px;
            &>i{
              width: 0.5vh;
              height: 100%;
              border-radius: 3px;
              background-color: #ed7029;
              margin-right: 15px;
            }
          }
          &>p{
            height: 40px;
            width: 100%;
            display: flex;
            border: 1px solid #dedede;
            justify-content: space-between;
            box-sizing: border-box;
            margin-bottom: 16px;
            &>i{
              width: 3.5vh;
              height: 4vh;
              font-size: 25px;
              color: #ed7029;
            }
            &>input{
              width: calc(100% - 34px);
              border: 0;
              outline: 0;
              background-color: transparent;
              color: #999;
              &::placeholder{
                color: #999;
              }
            }
            &:nth-of-type(3){
              border: 0;
              &>input[type='text']{
                width: 50%;
                border: 1px solid #dedede;
                text-align: center;
                &::placeholder{
                  text-align: center;
                }
              }
              &>input[type='button']{
                width: 45%;
                background:#ddd;
                font-size: 18px;
                color: #ff8310;
              }
            }
          }
          &>div{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            box-sizing: border-box;
            padding: 0 10px;
            &>span{
              color: #6ba1d7;
              display: flex;
              align-items: center;
              &>p{
                width: 10px;
                height: 10px;
                border: 1px solid #4f96d1;
                margin-right: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                &>i{
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background-color: #4f96d1;
                }
              }
            }
            &>a{
              color: #cdcdcd;
            }
          }
          &>button{
            width: 100%;
            height: 4vh;
            margin-top: 3vh;
            background-color: #ed7029;
            font-size: 18px;
            color: #fff;
            cursor: pointer;
          }
          &>a{
            position: absolute;
            right: 0;
            color: #4f96d1;
            bottom:-2vh;
          }
        }
      }
      &>p{
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        color: #fefaf7;
      }
    }
  }
</style>
