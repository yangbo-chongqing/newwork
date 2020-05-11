<template>
	<div class="userMessage">
		<div v-show="type==3">
			<div class="pic">
				<span><img :src="userMsg.pic_id" alt=""></span>
				<strong>个人信息</strong>
			</div>
			<div class="form1">
				<p class="area">

					<span>选择地址</span>
					<b>河北省</b>

					<el-cascader :props="props" :options="datas" separator="-" @change="handleChange">
					</el-cascader>

				</p>

				<p><span>修改昵称</span><input type="text" :placeholder='userMsg.name' v-model.lazy="name"></p>

			</div>
			<div class="upPic">
				<div class="pho">
					<i class="iconfont">&#xe664;</i>
					<b>修改头像</b>
				</div>


				<div class="photo">
					<div class="left">
						<label for="up"><i class="iconfont">&#xe612;</i></label>
						<input type="file" id="up" @change="getFile"/>
					</div>
					<div class="right">
						<div class="top">
							<div v-if="showPic" class="picContent">
								<div class="bigPic">

								</div>
								<p>大尺寸头像</p>
							</div>
							<div v-else  class="picContent">
								<div class="bigPic">
									<img :src="src" alt="">
								</div>
								<p>大尺寸头像</p>
							</div>
						</div>
						<div class="bottom">
							<div>
								<div v-if="showPic" class="picContent">
									<div class="miPic">

									</div>
									<p>中尺寸头像</p>
								</div>
								<div v-else  class="picContent">
									<div class="miPic">
										<img :src="src" alt="">
									</div>
									<p>中尺寸头像</p>
								</div>
							</div>
							<div>
								<div v-if="showPic" class="picContent">
									<div class="smPic">

									</div>
									<p>小尺寸头像</p>
								</div>
								<div v-else  class="picContent">
									<div class="smPic">
										<img :src="src" alt="">
									</div>
									<p>小尺寸头像</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button class="btn" @click="submit">保存</button>
			</div>
		</div>
		<div v-show="type==4">
			<div class="pic">
				<span><img :src="userMsg.pic_id" alt=""></span>
				<strong>密码修改</strong>
			</div>
			<div class="password">
				<p><i class="iconfont">&#xe60f;</i><input type="text" placeholder="请输入手机号" v-model.lazy="phone"></p>
				<p>
					<input type="text" placeholder="请输入验证码" v-model="code">
					<button class="code" v-if="!time" @click="getcode">发送验证码</button>
					<button class="code" v-else>重发验证码{{ time }}s</button>
				</p>
				<p><i class="iconfont">&#xe657;</i><input type="text" placeholder="请输入新密码" v-model="pwd"></p>
				<button class="submit" @click="submit">提交</button>
			</div>
		</div>


	</div>
</template>

<script>
	export default {
		name: "userMessage",
		props:["type","userMsg"],
		data() {
			let t = this
			return {
				props:{
					label: 'areaName',
					value: 'dept_id',
					lazy: true,
					lazyLoad: t.lazyLoad,
				},
				datas: [],
				showPic:true,
				src:'',
				time:0,
				code:'',
				phone:'',
				pwd:'',
				codenum:'',//后台验证码
				name:'',
				province:4,
				city:'',
				district:'',
				street:'',
				community:''
			}
		},
		methods: {
			//地区懒加载
			lazyLoad (node,resolve) {
				const { level } = node;
				console.log(level)
				let dept_id
				if(node.level == 0){
					dept_id = 4
				}else{
					dept_id = node.value
				}
				this.$axios.get('/system/sysDept/getByParentid?dept_id='+dept_id).then((res)=>{
					console.log(res)
					if(res.data.data){
						resolve(res.data.data)
					}

				})
			},
			//地区选择对应的值
			handleChange(value) {
				console.log(value);
				this.city=value[0];
				this.district=value[1];
				this.street=value[2];
				this.community=value[3];


			},
			//图片上传
			getFile(e) {
          const loading = this.$loading({
              lock: true,
              text: '玩命加载中。。。',
              spinner: 'el-icon-loading',
              background: 'rgba(255,255,255, 0.5)'
          });
				//图片
				const file = e.target.files[0];
          if(!file){
              loading.close();
              return false
          }
          if(file.type.indexOf('image') == -1){
              loading.close();
              this.$message({
                  message: '只能上传图片',
                  type: 'warning'
              });
              return false
          }

          if(file.size/1024/1024 >= 2){
              loading.close();
              this.$message({
                  message: '图片大小不能超过2M',
                  type: 'warning'
              });
              return false
          }
          const formdata = new FormData();
					formdata.append('mFile',file)
					formdata.append('path','HD/photo')


				this.$axios.post("/work/event/uploadEventImg",formdata
				).then((res)=>{
            loading.close();
				    if(res.status == 200 && res.data.statusCode){
                this.showPic=false
                this.src=res.data.path
                this.$notify({
                    title: '温馨提示',
                    message: '上传头像成功',
                    type: 'success'
                });
            }else{
                this.$notify({
                    title: '温馨提示',
                    message: '上传头像失败，请检查网络或稍后再试',
                    type: 'error'
                });
            }

				})
			},
			getcode(){//获取验证码
				if(!/^1[345678]\d{9}$/.test(this.phone)){
				  this.$message("请正确输入您的手机号码")
				  return false
				}
				this.time = 60
				this.timer = setInterval(()=>{
				  this.time = --this.time
				  if(this.time<=0){
					clearInterval(this.timer)
				  }
				},1000)

				this.$axios.post("http://119.3.196.255/information/getSMSMsg",this.qs({
					mobile:this.phone
				})).then((res)=>{
					console.log(res)
					if(res.status==200 && res.data.satus==200){
						this.codenum=res.data.captcha
					}
				})
			},
			//修改密码提交
			submit(){
				if(this.type==4){
					if(!this.phone || !/^1[345678]\d{9}$/.test(this.phone)){
						this.$message("请正确输入您的手机号码！！！")
						return false
					}
					if(this.code!=this.codenum){
						this.$message("验证码有误，请重新输入！！！")
						return false
					}
					if(!this.pwd){
						this.$message("密码不能为空！！！")
						return false
					}
					this.$axios.post("/sys/user/updateUser",this.qs({
						password:this.pwd
					})).then((res)=>{
						if(res.status==200){
							this.$message("密码修改成功！！！")
							this.$axios.post('/logout').then((res) => {

								if (res.status == 200 && res.data.code == 0) {
									this.$router.push({
										name: "login"
									})
								}
							})


						}
					})
				}else{//个人信息提交
					var formdata={}
					if(this.name){
						formdata.name=this.name
					}
					if(this.community){
						formdata.dept_id=this.community
					}
					if(this.src){
						formdata.pic_id=this.src
					}
					this.$axios.post('/sys/user/updateUser',this.qs({
						pic_id:formdata.pic_id,
						name:formdata.name,
						dept_id:formdata.dept_id
					})).then((res)=>{
						console.log(formdata)
						console.log(window.localStorage.getItem("userMsg"))
						if(res.status==200){
							this.$message("信息修改成功！！！")
							// this.$router.go(0)

							this.$axios.get('logins/isLogin').then(msg=>{
							  console.log(msg);
							  let userMsg = msg.data.user
							  for (let key in userMsg){
							    msg.data[key] = userMsg[key]
							  }
							  msg.data.MyPassword = this.userMsg.MyPassword
							  msg.data.user = null
							  // msg.data.province=4
							  // msg.data.city=this.city
							  // msg.data.district=this.district
							  // msg.data.street=this.street
							  // msg.data.community=this.community
							  window.localStorage.setItem('userMsg',JSON.stringify(msg.data))
							 //修改地区id
								console.log(window.localStorage.getItem("userMsg"))
								location.reload()
							})

						}
					})
				}

			}
		},
		created () {

		}
	}
</script>

<style scoped lang="less">
	.userMessage {
		padding: 20px 20px;

		.pic {
			border-bottom: 1px dotted #ed7029;
			margin-bottom: 20px;
			padding-bottom: 20px;
			display: flex;
			align-items: center;

			span {
				display: inline-block;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;

				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			strong {
				color: #ed7029;
				font-size: 18px;

				margin-left: 20px;

			}
		}

		h5 {
			font-size:15px;
			i{
				color:#ed7029;
				margin-right: 15px;
			}
			strong {
				color: #ed7029;
			}
		}

		.form1{

			p{
				display: flex;
				align-items: center;
				margin: 20px 0;
				height: 40px;

				b{
					display: inline-block;
					width:100px;
					height:40px;
					border:1px solid #eeeeee;
					line-height: 40px;
					margin-right: 20px;
					text-align: center;
					box-sizing: border-box;
				}

				span{
					width:10%;
					padding:0 20px;
					text-align:justify;
					display: block;
					font-size:18px;
					height:40px;
					line-height: 40px;


				}
				span:after{
					content:'.';
					width: 100%;
					display: inline-block;
					overflow: hidden;
					height: 0;
				}
				input{
					width:80%;
					height:40px;
					border:1px solid #eeeeee;
					outline: none;
					padding:0 10px;
				}
			}
			.area{
				display: flex;
				span{
					width:10%;
				}
				div{
					width:70%;
					/deep/.el-input__inner{
						border-radius: none;
					}
				}

			}
			button{
				display: block;
				outline: none;
				padding:10px 30px;
				background: #ed7029;
				color:#fff;
				margin:30px auto 40px;
				border-radius: 26px;
				font-size:18px;

			}
		}
		#up{
			display: none;
		}
		.upPic{
			padding:30px 0 50px 0;
			.border{
				border:none;
			}
			.pho{
				margin: 30px 0;
				padding:0 20px;
				i{
					font-size:18px;
					margin-right: 10px;
					color:#ed7029;
				}
				b{
					font-weight: 400;
					color:#ed7029;



				}
			}
			.photo{
				display: flex;
				padding:0 100px;
				.left{
					width:50%;
					label{
						background: #eeeeee;
						height:400px;
						position: relative;
						display: block;
						cursor: pointer;

						i{
							font-size:60px;
							color:#ed7029;
							position: absolute;
							top:50%;
							left:50%;
							transform: translate(-50%,-50%)
						}
					}

				}
				.right{
					width:50%;
					display: flex;
					flex-direction: column;
					.top{
						width:50%;
						.picContent{
							padding:0 20px;
							.bigPic{
								width:260px;
								height:200px;
								background: #eeeeee;
								img{
									display: block;
									width:100%;
									height:100%;
								}
							}
							p{
								margin-top: 10px;
							}


						}
					}
					.bottom{
						width:50%;
						display: flex;
						align-items: baseline;
						margin-top: 45px;
						.picContent{
							padding:0 0 0 20px;
							.miPic{
								width:140px;
								height:120px;
								background: #eeeeee;
								img{
									display: block;
									width:100%;
									height:100%;
								}

							}
							p{
								margin-top: 10px;
							}
							.smPic{
								width:100px;
								height:80px;
								background: #eeeeee;
								img{
									display: block;
									width:100%;
									height:100%;
								}

							}
							p{
								margin-top: 10px;
							}
						}
					}
				}
			}
			.btn{
				display: block;
				outline: none;
				padding:10px 30px;
				background: #ed7029;
				color:#fff;
				margin:50px auto 60px;
				border-radius: 26px;
				font-size:18px;
			}
		}
	}
	.password{
		width:60%;
		margin:180px auto 50px;
		p{
			width:100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border:1px solid #f2f1f1;
			text-align: center;
			margin-bottom: 50px;
			i{
				width:10%;
				font-size:30px;
				color:#ed7029;
			}
			input{
				width:90%;
				line-height: 40px;
				display: block;
				border:none;
				outline: none;
				padding:0 10px;
			}
			.code{
				width:150px;
				line-height: 40px;
				background: #ed7029;
				color:#fff;
				cursor: pointer;
				font-size:16px;
			}
		}
		.submit{
			width:150px;
			line-height: 40px;
			background: #ed7029;
			color:#fff;
			margin:0 auto;
			display:block;
			cursor: pointer;
			font-size:16px;
		}

	}
</style>
