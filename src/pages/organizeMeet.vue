<template>
  <div class="organizeMeet">
    <!--   导航     -->
    <div class="nav">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><router-link to="/organize.html">组织建设</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>三会一课</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <!--  内容    -->
    <div class="content">
      <div class="contentBox typeArea">
        <div  class="headline">
          <i><img src="../assets/img/toOne.png"></i>正在进行的会议
        </div>
        <div  class="hrBox">
          <div class="hrText">正在进行的会议</div>
          <div class="hrThread"></div>
        </div>
        <div v-show="nowMeet.attend != 'false'" class="meeting">
          <div class="calendar">
            <div class="carouseBox">
              <h2><span>{{ nowMeet.meeting_start_time | getMonth}}</span></h2>
              <span>{{nowMeet.title}}</span>
              <img src="#" alt="" class="imgs">
              <p>{{ nowMeet.content}}</p>
              <a href="javascript:;" @click="goOrganizeDiscuss(nowMeet)">查看详情</a>
            </div>
          </div>
          <div class="meetingText">
            <h2>会议详情</h2>
            <p style="color:red">{{ nowMeet.attend=='true'?'':'不'}}需要参会</p>
            <p>会议主题：{{ nowMeet.title || '无' }}</p>
            <p>参会地点：{{ nowMeet.address || '无' }}</p>
            <p>会议主讲：{{ nowMeet.host || '无'  }}</p>
            <p>签到时间：{{nowMeet.signIn_start_time}} 至 {{ nowMeet.signIn_end_time }}</p>
            <p>会议时间：{{nowMeet.meeting_start_time}} 至 {{ nowMeet.meeting_end_time }}</p>
            <div class="pushButton paging">
              <button style="background-color: #e20000;"  @click="goOrganizeDiscuss(nowMeet)">进入会议讨论</button>
            </div>
          </div>
        </div>
        <img v-show="nowMeet.attend == 'false'"  style="margin: 60px 0 40px 400px;width:540px;heigth:320px;" src ='../assets/img/notImgThree.png'>


        <div class="headline">
          <i><img src="../assets/img/toTwo.png"></i>会议预告
        </div>
        <div class="hrBox">
          <div class="hrText">管理员发布的最新会议通告</div>
          <div class="hrThread"></div>
        </div>
        <div class="meeting">
          <div class="calendar">
            <el-calendar v-model="value"></el-calendar>
          </div>
          <div class="meetingText">
            <h2>会议详情</h2>
            <p style="color:red">{{meet.attend=='true'?'':'不'}}需要参会</p>
            <p>会议主题：{{ meet.title || '无' }}</p>
            <p>参会地点：{{ meet.address || '无' }}</p>
            <p>会议主讲：{{ meet.host || '无' }}</p>
            <p>签到时间：{{meet.signIn_start_time}} 至 {{ meet.signIn_end_time }}</p>
            <p>会议时间：{{meet.meeting_start_time}} 至 {{ meet.meeting_end_time }}</p>
            <p>会议简介：</p>
            <p class="synopsis">
              {{ meet.content || '无' }}
            </p>
            <div class="pushButton tools">
              <button class="signIn" @click="show=true" v-show="meet.attend=='true'?true:false">会议签到</button>
              <button class="leave" @click="isLeave(meet.meeting_id)" v-show="meet.attend=='true'?true:false">请假</button>
              <button class="leave" @click="goOrganizeDiscuss(meet)" v-show="meet.attend=='true'?true:false">查看会议详情</button>
            </div>
          </div>
        </div>

        <div class="headline">
          <i><img src="../assets/img/toThree.png"></i>往期精彩
        </div>
        <div class="hrBox">
          <div class="hrText">管理员发布的最新会议通告</div>
          <div class="hrThread"></div>
        </div>
        <div class="meeting">
          <div class="calendar">
            <div class="carouseBox">
              <h2><span>{{ onceMeets[0].meeting_start_time | getMonth}}</span></h2>
              <span>{{onceMeets[0].title}}</span>
              <img src="#" alt="" class="imgs">
              <!-- <p>{{ onceMeets[0].content}}</p> -->
              <a href="javascript:;" @click="goOrganizeDiscuss(onceMeets[0])">查看详情</a>
            </div>
          </div>
          <div class="meetingText" v-for="(item,index) in onceMeets" :key="index">
            <h2>会议详情</h2>
            <!-- <p style="color:red">{{ item.attend=='true'?'':'不'}}需要参会</p> -->
            <p>会议主题：{{ item.title || '无' }}</p>
            <p>参会地点：{{ item.address || '无' }}</p>
            <p>会议主讲：{{ item.host || '无'  }}</p>
            <p>签到时间：{{item.signIn_start_time}} 至 {{ item.signIn_end_time }}</p>
            <p>会议时间：{{item.meeting_start_time}} 至 {{ item.meeting_end_time }}</p>
            <p>会议简介：{{ item.content || '无' }}</p>
            <div class="pushButton paging">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="onceTotal"
                :current-page="onceCurrent"
                @current-change="onceMeet"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--二维码弹窗-->
    <div id="erweima" v-show="show">
      <div>
        <!--放二维码-->
        <img src="../assets/img/erwei.png" alt="">
        <!--提示文字-->
        <p>请扫描上方二维码，在app上进行签到</p>
        <i @click="show=false">X</i>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "organizeVote",
        data(){
            return{
                radio:3,
                value:new Date(),
                meet:{},//会议预告
                onceMeets:[],//往期会议
                onceCurrent:1,//往期会议当前页
                onceTotal:0,//往期会议总条数
                pageSize:1,
                show:false,//显示与隐藏二维码弹窗
                userArea:JSON.parse(window.localStorage.getItem("userArea")),
                LeaveContent:"",
                nowMeet:{}
            }
        },
        methods:{
            //获取当前
            getMeet(){
                this.$axios.post('NewMeeting/getMeetings',this.qs({
                    getNew:true,//会议预告
                    pageSize:1,
                    pageCurrent:1,
                    app:true
                })).then(msg=>{
                    console.log(msg);
                    if(msg.status == 200 && msg.data.status == 400){

                    }else if(msg.status == 200 && msg.data.status == 200){
                        //有会议
                        this.meet = msg.data.data.list[0]
                    }else{
                        //获取失败
                        this.$message.error('获取会议失败，请检查您的网络或稍后再试');
                    }
                }).catch(err=>{
                    //出现错误
                    this.$message.error('获取会议失败，请检查您的网络或稍后再试');
                })
            },
            //获取往期会议
            onceMeet(current){
                const loading = this.$loading({
                    lock: true,
                    text: '玩命加载中。。。',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255,255,255, 0.5)'
                });
                this.$axios.post('NewMeeting/getMeetings',this.qs({
                    getOle:true,
                    app:true,
                    pageSize:1,
                    pageCurrent:current,
                })).then(msg=>{
                    loading.close();
                  if(msg.status == 200){
                        this.onceMeets = msg.data.data.list
                        this.onceTotal = msg.data.data.total
                        this.onceCurrent = msg.data.data.pageNum
                    }else{
                        loading.close();
                        this.$message.error('获取会议失败请检查您的网络或稍后再试');
                    }
                }).catch(err=>{
                    //报错
                    loading.close();
                    this.$message.error('获取会议失败请检查您的网络或稍后再试');
                })
            },
            //获取任意时间的会议
            getCasual(time){
                const loading = this.$loading({
                    lock: true,
                    text: '玩命加载中。。。',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255,255,255, 0.5)'
                });
                this.meet={}
                //获取时间 xxxx-xx-xx
                time = this.formatDate(time);
                this.$axios.post('NewMeeting/getMeetings',this.qs({
                    app:true,
                    signIn_start_time:time
                })).then(msg=>{
                    if(msg.status == 200 && msg.data.status == 400){
                        loading.close();
                        //今天暂无会议
                        this.$alert('今天暂无会议', '温馨提示', {
                            confirmButtonText: '确定'
                        });
                    }else if(msg.status == 200 && msg.data.status == 200){
                        loading.close();
                        //有会议
                        this.meet = msg.data.data.list[0]
                    }else{
                        //获取失败
                        loading.close();
                        this.$message.error('获取会议失败，请检查您的网络或稍后再试');
                    }
                }).catch(err=>{
                    loading.close();
                    this.$message.error('获取会议失败，请检查您的网络或稍后再试');
                })
            },
            //请假
            Leave(meeting_id,reasons_for_leave){
                this.$axios.post('NewMeeting/signInAndLeave',this.qs({
                    meeting_id,
                    status:'请假',
                    reasons_for_leave
                })).then(msg=>{
                    if(msg.status == 200 &&msg.data.status == 400){
                        //请假失败
                        this.$message.error('请假失败，请检查您的网络');
                    }else if(msg.status == 200 &&msg.data.status == 200){
                        //请假成功
                        this.$message.success('请假成功');
                    }else{
                        //请假失败
                        this.$message.error('请假失败，请检查您的网络');
                    }
                }).catch(err=>{
                    //请假出错
                    this.$message.error('请假失败，请检查您的网络');
                })
            },
            //弹出请假理由窗口
            isLeave(meeting_id){
                this.$prompt('请输入请假内容', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    if(!value|| value.trim().length == 0  ){
                        this.$message.error('请输入请假内容');
                        this.isLeave(meeting_id)
                        return false
                    }
                    this.Leave(meeting_id,value)
                }).catch(() => {

                });
            },
            //跳转详情
            goOrganizeDiscuss(obj){
                this.$router.push({
                    name:"organizeDiscuss",
                    query:{
                        obj:this.Base64.encode(JSON.stringify(obj))
                    }
                })
            },
            //获取正在进行的会议
            getNowMeet(){
                this.$axios.post('/NewMeeting/getMeetings',this.qs({
                    getNow:true,
                    app:true,
                    pageSize:1,
                    pageCurrent:1
                })).then(msg=>{
                  if(msg.status == 200 && msg.data.status == 200){
                      //有会议
                        this.nowMeet = msg.data.data.list[0]
                    }else if(msg.status == 200 && msg.data.status == 400){
                      this.nowMeet.attend = 'false'
                  }else{
                      this.$message.error('获取正在进行的会议失败请检查您的网络或稍后再试');
                  }

                })
            }
        },
        created(){
            this.getMeet()
            this.onceMeet(1)
            this.getNowMeet()
        },
        watch:{
            value(newval){
                this.getCasual(newval)
            }
        },
        filters:{
            getMonth(time){
                time = new Date(time)
                const month =  time.getMonth()+1>9?time.getMonth()+1:"0"+(time.getMonth()+1)
                const date = time.getDate()>9?time.getDate():"0"+time.getDate()
                return month+"-"+date
            }
        }
    }
</script>

<style scoped lang="less">
  @import "../assets/less/public.less";
  /* 导航样式 */
  .gray{
    background-color: #f5f5f5;
  }
  .nav{
    width: 100%;
    height: 50px;
    background-color: #cdcdcd;
  }
  .navBox{
    display: flex;
    justify-content: space-between;
  }
  .breadCrumb{
    margin-top: 17px;
    margin-left: 20px;
  }
  /*  内容 */
  .content{
    width: 100%;
    margin: 40px 0 200px;
    &>.contentBox{
      .headline{
        margin: 100px 0 30px;
        font-size: 30px;
        color: #ff2828;
      }
      .headline > i{
        margin-right: 10px;
        font-size: 50px;
      }
      &>.hrBox{
        display: flex;
        align-items: center;
        &>.hrText{
          font-size: 13px;
          color: #535353;
          margin-right: 5px;
        }
        &>.hrThread{
          flex: 1;
          width: 100%;
          height: 3px;
          background-color: #ff2828;
        }

      }
      &> .meeting{
        margin-top: 50px;
        display: flex;
        &>.calendar{
          width: 500px;
          height: auto;
          & /deep/ .el-calendar-day{
            height: 70px;
          }
          & /deep/ .el-calendar-table td{
            border-color: #cccccc;
          }
          & /deep/ .el-calendar__body{
              padding: 20px 20px 35px;
          }
          .carouseBox{
            padding: 0 15px;
            height: 555px;
            border: 1px solid #ff0000;
            position: relative;
          }
          .carouseBox h2{
            color: #fb802d;
            font-size: 20px;
            border-bottom: 1px solid #d2d2d2;
            padding-bottom: 5px;
            margin: 20px 0;
          }
          .carouseBox h2 > span{
            color: #fb802d;
            font-size: 35px;
            margin-right: 10px;
          }
          .carouseBox > span{
            color: #545454;
            font-size: 18px;
            line-height: 25px;
            margin: 25px 0;
            display: block;
          }
          .carouseBox > .imgs{
            width: 400px;
            height: 225px;
            display: block;
            background-color: #cccccc;
            margin-top: 10px;
          }
          .carouseBox > p{
            color: #919191;
            font-size: 15px;
            margin: 25px 0;
            line-height: 1.5;
          }
          .carouseBox > a{
            font-size: 12px;
            color: #ffa66b;
            position: absolute;
            bottom: 65px;
          }
        }
        &>.meetingText{
          margin-left: 100px;
          margin-top: 20px;
          color: #333333;
          position: relative;
          width: 856px;

          &>h2{
            font-size: 25px;
            color: #e9333f;
            font-weight: normal;
            margin-bottom: 40px;
          }
          &>p{
            margin: 20px 0;
            font-size: 18px;
          }
          &>.synopsis{
            font-size: 15px;
            text-indent: 5em;
            color: #999999;
          }
          &>.paging{
            position: absolute;
            bottom: 0;
          }
          &>.pushButton{
            width: 100%;
            /deep/ li.number.active{
              background-color: #ff2223;
              color: #ffffff;
            }
            /deep/ li:hover{
              color: #ff2223;
            }

            &>button{
              width: 100px;
              height: 40px;
              color: #ffffff;
              font-weight: bold;
              text-align: center;
              margin-right: 30px;
            }
          }
          &>.tools{
            display: flex;
            position: absolute;
            left: 0;
            bottom:0;
            &>button{
              margin-right: 15%;
              cursor: pointer;
              background-color: #ccc;
              border-radius: 3px;
              transition: all .3s;
              &:first-of-type{
                background-color: #f93a42;
                &:hover{
                  color: #f93a42;
                  background-color: #f2f2f2;
                }
              }
              &:nth-last-child(2){
                background-color: #e6a23c;
                &:hover{
                  color: #e6a23c;
                  background-color: #f2f2f2;
                }
              }
              &:last-of-type{
                background-color: #67c23a;
                &:hover{
                  color: #67c23a;
                  background-color: #f2f2f2;
                }
              }

            }
          }
        }
      }

    }
  }
  /*二维码弹窗*/
  #erweima{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,.2);
    z-index: 99999;
    transition: all .2s;
    transform: scale(1);
    &>div{
      width: 25%;
      height: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      overflow: hidden;
      background-color: #fff;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      &>img{
        width: 10vmax;
        height: 10vmax;
      }
      &>i{
        position: absolute;
        right: 15px;
        top:15px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fff;
        font-style: normal;
        cursor: pointer;
        &:hover{
          color: red;
        }
      }
    }
  }
</style>
