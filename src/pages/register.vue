<template>
  <div id="register"  @keydown.enter="register">
    <header>
      <div>
        <img src="../assets/img/logo3.png" alt="" @click="goIndex">
        <span>邯郸智慧党建系统</span>
      </div>
    </header>
    <div>
      <div>
        <div>
          <div>
            <img src="../assets/img/logo3.png" alt="">
            <p style="font-size: 27px;color: #ed7029">邯郸智慧党建系统</p>
          </div>
        </div>
        <div v-show="!flag">
          <!--标题-->
          <h3>
            <i></i>
            用户注册
          </h3>
          <p>
            <i class="iconfont">&#xe60f;</i>
            <input type="text" placeholder="请输入手机号码" v-model="username">
          </p>
          <p>
            <i class="iconfont">&#xe657;</i>
            <input type="password" placeholder="请输入密码" v-model="password">
          </p>
          <p>
            <i class="iconfont">&#xe657;</i>
            <input type="password" placeholder="请确认密码" v-model="newPassword" @blur="isSame">
          </p>
          <p>
            <input type="text" placeholder="请输入验证码" v-model="isCaptcha">
            <input id="code" type="button" v-model="captcha" title="看不清？换一个" @click="createCaptcha">
          </p>
          <!--注册摁钮-->
          <button @click="register">立即注册</button>
        </div>
        <!--选择区域-->
        <ul v-show="flag">
          <li>选择区域</li><!--parent_id-->
          <li v-for="(item,index) in address" :key="index" @click="getaddRess(item)">{{ item.areaName}}</li>
        </ul>
      </div>
      <p>邯郸党建 赛达科技 COPYRIGHT &copy2018-2020</p>
    </div>

  </div>
</template>

<script>
    import md5 from 'md5'
    export default {
        name: "register",
        data() {
            return {
                captcha:"",// 验证码
                isCaptcha:"",//用户输入的验证码
                password:"",//密码
                username:"",//账号
                newPassword:"",
                deptId:0,
                flag:false,
                address:[]
            }
        },
        methods: {
            register(){
                if(this.username.length == 0){
                    this.$alert('请输入手机号码', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                if(!/^1[345678]\d{9}$/.test(this.username)){
                    this.$alert('请正确输入手机号码', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                if(this.password.length == 0){
                    this.$alert('请输入密码', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                if(this.password != this.newPassword){
                    this.$alert('两次输入的密码不相同', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                if(this.captcha.toUpperCase() != this.isCaptcha.toUpperCase()){
                    this.$alert('请正确输入验证码', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                    this.createCaptcha()
                    return false
                }
                this.flag = true

            },
            //判断密码是否相同
            isSame(){
                if(this.newPassword != this.password){
                    this.$message.warning('两次输入的密码不同，请重新输入');
                }
            },
            /*注册修改2019-8-17*/
            register1(id){
                this.$axios.post('sys/user/save',this.qs({
                    username: this.username,//账号
                    name: "默认用户",//昵称
                    mobile: this.username,//手机号码
                    password: md5(this.password),//密码
                    deptId: id, // 用户选择地址
                    status: 1
                })).then(msg=>{
                    if(msg.status == 200 && msg.data.code == 0){
                        this.$message({
                            message:msg.data.msg,
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.$router.push({
                                name:"login",
                                query:{
                                    type:this.Base64.encode(1)
                                }
                            })
                        })
                    }else{
                        this.$alert('注册失败，请假查网络或稍后再试', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }
                }).catch(err=>{
                    this.$alert('注册失败，请检查网络或稍后再试', '温馨提示', {
                        confirmButtonText: '确定'
                    });
                })
            },
            getaddRess(obj){
                console.log(obj);
                if(obj.areaLevel){
                    if(obj.areaLevel == 5){
                        this.register1(obj.dept_id)
                    }else{
                        //获取地址
                        this.$axios.post('/system/sysDept/getByParentid',this.qs({
                            dept_id:obj.dept_id
                        })).then(msg=>{
                            console.log(msg);
                            if(msg.status == 200 && msg.data.status == 200){
                                this.address = msg.data.data
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }else{
                    //获取地址
                    this.$axios.post('/system/sysDept/getByParentid',this.qs({
                        dept_id:obj
                    })).then(msg=>{
                        console.log(msg);
                        if(msg.status == 200 && msg.data.status == 200){
                            this.address = msg.data.data
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            },
            goIndex(){
                this.$router.replace('/')
            }
        },
        components: {},
        created(){
            this.createCaptcha();
            this.getaddRess(129);
        },
        watch:{
            username(newval){
                if(newval.length == 11){
                    //检查被注册了
                    this.$axios.post('sys/user/checkUser',this.qs({
                        username:this.username
                    })).then(msg=>{
                        this.$message.warning(msg.data.msg);
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
  #register{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    &>header  {
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
    &>div{
      width: 100%;
      height: calc(100vh - 100px);
      position: relative;
      background: url("../assets/img/login.png") no-repeat center center;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      &>div{
        width: 760px;
        height: 470px;
        position: absolute;
        right: 518px;
        top:269px;
        background-color: #fff;
        border-radius: 15px;
        box-sizing: border-box;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1),
          -2px -2px 10px rgba(0,0,0,.1);
        display: flex;
        &>div{
          height: 100%;
          &:first-of-type{
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            &>div{
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 220px  ;
              height: 232px;
            }
          }
          &:last-of-type{
            width: 40%;
            padding-top: 40px;
            box-sizing: border-box;
            &>h3{
              width: 100%;
              height: 30px;
              color: #ed7029;
              display: flex;
              align-items: center;
              font-size: 23px;
              font-weight: 400;
              margin-bottom: 35px;
              &>i{
                width: 5px;
                height: 100%;
                border-radius: 3px;
                background-color: #ed7029;
                margin-right: 15px;
              }
            }
            &>p{
              width: 270px;
              height: 40px;
              margin-bottom: 12px;
              border: 1px solid #dddddd;
              border-radius: 5px;
              display: flex;
              justify-content: space-between;
              &>i{
                width: 34px;
                height: 40px;
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
              &:last-of-type{
                border: 0;
                &>input[type='text']{
                  width: 50%;
                  border: 1px solid #dedede;
                  text-align: center;
                  border-radius: 5px;
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
            &>button{
              width: 270px;
              height: 45px;
              background-color: #ed7029;
              font-size: 20px;
              color: #fff;
              border-radius: 5px;
              margin-top: 20px;
            }
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
    ul{
      width: 760px;
      height: 470px;
      border-radius: 15px;
      box-sizing: border-box;
      box-shadow: 2px 2px 10px rgba(0,0,0,.1),
        -2px -2px 10px rgba(0,0,0,.1);
      overflow: auto;
      &::-webkit-scrollbar{
        display: none;
      }
      &>li{
        width: 100%;
        height: 10%;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        padding-left: 1em;
        cursor: pointer;
        &:hover{
          background-color: rgb(237, 112, 41);
        }
      }
    }
  }
</style>
