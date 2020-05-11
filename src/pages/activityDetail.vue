<template>
  <div class="activityDetail">
    <div class="titleContainer" :class="{active : topDistance>=700}">
      <el-breadcrumb separator="/" class="typeArea nav">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="./volunteer.html">志愿者活动</a></el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="contentMain">
      <div class="borderBox typeArea">
        <div class="content">
          <div><img :src="list.content_pic | getOneImg"></div>
          <div>
            <ul>
              <p><span>{{list.title}}</span><span>招募中</span></p>
              <li>项目地点:<span>{{list.address}}</span></li>
              <li>招募时间:<span>{{list.sign_start_time}}~{{list.sign_end_time}}</span></li>
              <li>项目时间:<span>{{list.start_time}}~{{list.end_time}}</span></li>
              <li>发布时间:<span>{{list.create_time}}</span></li>
              <li>服务时间:<span>{{days}}天</span></li>

            </ul>
          </div>
        </div>
        <div class="apply">

          <div class="top">
            <p>岗位名称：<span>志愿者</span>招聘人数：<span>{{list.pop_num}}人</span>已报名：<span>{{list.signUserNum}}人</span></p>

            <el-button type="text" class="btnn" @click="open">报名</el-button>
            <el-dialog title="党员信息绑定" :visible="dialogFormVisible" :show-close="false">
              <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                  <el-input v-model="form.idcard" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="work">
            <div v-html="list.content"></div>
            <!-- 						<p>岗位描述：</p>
						<p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
						<p >岗位条件：</p>
						<p>条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件条件</p>
 -->
          </div>
        </div>
        <!-- <div class="introduce">
					<div>
						介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情
介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情
绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情
					</div>
				</div> -->
      </div>
    </div>
    <!-- <div class="model" v-if="show">
			<div>
				<p>党员信息绑定</p>
				<p><span>姓名：</span><input type="text"  placeholder="请输入姓名..."></p>
				<p><span>身份证号码：</span><input type="text" placeholder="请输入身份证号码..."></p>
				<p><button>取消</button><button>确认</button></p>
			</div>
		</div> -->
  </div>
</template>

<script>
  export default {
    name: "activityDetail",
    data() {
      return {
        topDistance: 0,
        activity_id: this.Base64.decode(this.$route.query.activity_id),
        userArea: {}, //用户的地址信息
        list: [],
        startTime: "", //活动开始时间
        endTime: '', //活动结束时间
        days: 0, ////活动持续时间
        show: true,
        input: '',
        dialogFormVisible: false,
        form: {
          name: '',
          idcard: "",
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

      }
    },
    methods: {
      open() {
        let t = this;
        this.$axios.post('/logins/isLogin').then((res) => {
          if (res.data.msg == "用户未登录") {
            //未登录
            this.$confirm('此功能需要登录是否登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login')
            }).catch(() => {
              //防止报错
            });
          } else {
            this.$axios.post("fun/partyMember/isMember").then((res) => {
              if (res.data.code == "1") {
                this.$axios.post("/F_Activity/signUp", this.qs({
                  activity_id: this.activity_id,
                  sign_up_type: 3
                })).then((res) => {
                  if (res.data.status == 400) {
                    this.$confirm('您已经参加报名了,请等待审核。', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {


                    }).catch(() => {
                      //防止报错
                    });
                  } else {
                    this.$confirm('申请报名成功！！！', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'success'
                    }).then(() => {

                    }).catch(() => {
                      //防止报错
                    });
                  }
                })
              } else {
                this.$confirm('此功能需要绑定党员信息', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.dialogFormVisible = true //党员信息绑定弹窗

                }).catch(() => {
                  //防止报错
                });

              }
            })
          }
        })

      },
      submit() { //绑定党员信息

        var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (reg.test(Number(this.form.idcard)) && this.form.name != '' && this.form.idcard != '') {
          this.$axios.post("/fun/partyMember/bindingMember", this.qs({
            popName: this.form.name,
            popCard: this.form.idcard
          })).then((res) => {
            if (res.data.code == 400) {
              this.$message("未查询到党员信息，请联系管理员")
            } else {
              this.$message("党员信息绑定成功！！！")

              this.$confirm('党员信息绑定成功！是否报名？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$axios.post("/F_Activity/signUp", this.qs({
                  activity_id: this.activity_id,
                  sign_up_type: 3
                })).then((res) => {
                  if (res.data.status == 400) {
                    this.$confirm('您已经参加报名了,请等待审核。', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {


                    }).catch(() => {
                      //防止报错
                    });
                  } else {
                    this.$confirm('报名成功！！！', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'success'
                    }).then(() => {

                    }).catch(() => {
                      //防止报错
                    });
                  }
                })

              }).catch(() => {
                //防止报错
              });

            }
          })
        } else {
          this.$message("请正确填写身份证号码和姓名！")

        }



      },



      //指定位置悬浮
      handleScroll() {
        let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
        this.topDistance = top
      },
      //获取单条活动详情
      getdetail() {
        this.$axios.post('/F_Activity/getOne', this.qs({
          activity_id: this.activity_id,
          province: this.userArea.province,
          city: this.userArea.city,
          district: this.userArea.district,
          street: this.userArea.street,
          community: this.userArea.community,
        })).then((res) => {
          if (res.status == 200) {
            this.list = res.data.data;
            this.startTime = res.data.data.start_time;
            this.endTime = res.data.data.end_time;

            var start = new Date(this.startTime.replace(/-/g, "/")).getTime();
            var end = new Date(this.endTime.replace(/-/g, "/")).getTime();
            var days = Math.floor((end - start) / (24 * 3600 * 1000))
            this.days = days
          }
        })
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.getdetail();

    },
    created() {

      this.isUserArea();
      this.userArea = this.getUserArea()
    },
    filters: {

    }
  }

</script>


<style scoped lang="less">
  .titleContainer {
    width: 100%;
    height: 50px;

    background: #e8e8e8;

    .nav {
      line-height: 50px;

      height: 50px;

      .title {
        line-height: 50px;

        span {
          margin: 0 10px;
        }
      }
    }
  }

  .contentMain {
    width: 100%;
    padding: 90px 0;

    .borderBox {
      box-sizing: border-box;
      padding: 25px 25px 80px 25px;

      border: 1px solid #eee;

      .content {
        display: flex;

        height: 330px;
        margin-bottom: 70px;

        div:first-child {
          flex: 2;

          margin-right: 20px;

          img {
            display: block;

            width: 100%;
            height: 100%;
          }
        }

        div:last-child {
          flex: 3;

          ul {
            p {
              font-size: 20px;

              margin-bottom: 20px;
              padding-bottom: 10px;

              border-bottom: 1px solid #e5e5e5;

              span:first-child {
                font-size: 20px;
              }

              span:last-child {
                font-size: 18px;

                display: inline-block;

                width: 60px;
                margin-left: 5px;
                padding: 5px 5px;

                text-align: center;

                color: #fff;
                border-radius: 3px;
                background: #ff3839;
              }
            }

            li {
              line-height: 56px;

              span {
                margin-left: 10px;

                color: #ff3733;
              }
            }
          }
        }
      }
    }
  }

  .apply {
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      box-sizing: border-box;
      padding: 20px 20px;

      color: #fff;
      background: #ff3839;

      p {
        span {
          margin: 0 60px 0 10px;
        }
      }

      .btnn {
        padding: 5px 30px;

        cursor: pointer;

        color: #ff3839;
        border: none;
        outline: none;
        background: #fff;
      }
    }

    .work {
      padding: 60px 35px 50px;

      border: 1px solid #e8e8e8;
      border-top: none;

      p:nth-of-type(2n-1) {
        font-size: 20px;

        margin-bottom: 15px;

        color: #333;
      }

      p:nth-of-type(2n) {
        line-height: 25px;

        text-indent: 2em;
        letter-spacing: 2px;
      }

      p:nth-of-type(3) {
        margin-top: 50px;
      }
    }
  }

  .introduce {
    position: relative;

    margin-top: 80px;

    border: 1px solid #ff3839;

    div {
      line-height: 25px;

      padding: 20px;

      text-indent: 2em;
    }
  }

  .introduce:after {
    line-height: 30px;

    position: absolute;
    top: -30px;
    left: -1px;

    width: 100px;
    height: 30px;

    content: '详情介绍';
    text-align: center;

    color: #fff;
    background: #ff1919;
  }

  .active {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
  }

  /deep/ .el-message-box {
    width: 500px;
  }

  /deep/ .el-message-box__message p {
    line-height: 50px !important;

    display: flex;
  }

  // .model{
  // 	position: fixed;
  // 	width:100%;
  // 	height:100%;
  // 	background: rgba(128,128,128,.4);
  // 	top:0;
  // 	left:0;
  // 	z-index:999;
  // 	div{
  // 		width:500px;
  // 		height:300px;
  // 		background: #fff;
  // 		border-radius: 20px;
  // 		position: absolute;
  // 		padding:0 20px;
  // 		top:50%;
  // 		left:50%;
  // 		transform: translate(-50%,-50%);
  // 		p:first-child{
  // 			font-size:20px;
  // 			text-align: center;
  // 			margin:20px 0;
  // 			label{
  // 				display: block;
  // 			}
  // 		}
  // 		p:nth-of-type(2),p:nth-of-type(3){
  // 			height:40px;
  // 			margin-bottom: 20px;
  // 			display: flex;
  // 			span{
  // 				width:20%;
  // 				text-align: justify;
  // 			}
  // 			input{
  // 				width:80%;
  // 			}
  // 		}
  // 		p:nth-of-type(4){
  // 			display: flex;
  // 			justify-content: space-between;
  // 			align-items: center;
  // 			button{
  // 				width:60px;
  // 				height:
  // 			}
  // 		}
  // 	}
  // }

</style>
