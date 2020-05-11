<template>
	<div class="notice">
		<div class="headers">
			<span><img :src="userMsg.pic_id" alt=""></span>
			<span>消息通知</span>
			<span></span>
		</div>
		<ul>
			<li v-for="(item,index) in list" :key="index">
				<span>{{index+1}}</span>
				<p>{{item.msg}}<span>{{item.time}}</span></p>

			</li>
			<!-- <div class="page">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :page-size="pageSize"
				  :current-page.sync="pageNum"
				  @current-change="getlist"
				  :total='pages'>
				</el-pagination>
			</div> -->
		</ul>
	</div>
</template>

<script>
	export default {
		name:'notice',
		props:["userMsg"],
		data(){
			return {
				list:[],
				userArea:{},//用户的地址信息
				pageSize:20,//每页条数
				pageCurrent:1,
				pageNum:0,//当前页
				pages:0,//总页数
			}
		},
		created(){
			this.isUserArea();
			this.userArea = this.getUserArea()
			this.getlist()
		},
		methods:{
			getlist(cur){
				this.$axios.post("/HanBigData/getNewData",this.qs({
					dept_id:104,
					app:true,
					province:this.userArea.province,
					city:this.userArea.city,
					district:this.userArea.district,
					street:this.userArea.street,
					community:this.userArea.community,
				})).then((res)=>{
					if(res.status==200&&res.data.status==200){
						this.list=res.data.data;



					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.notice{
		padding:20px 20px;
		.headers{
			// padding:20px 0 40px 0;
			position: relative;
			border-bottom:1px dotted #ed7029;
			margin-bottom: 20px;
			span:first-child{
				display:inline-block;
				width:50px;
				height:50px;
				border-radius: 50%;
				margin-bottom: 20px;
				overflow: hidden;
				img{
					display: block;
					width:100%;
					height:100%;
				}
			}
			span:nth-of-type(2){
				display: inline-block;
				position:absolute;
				top:50%;
				transform: translateY(-50%);
				font-size:20px;
				margin-left: 15px;
				color:#ed7029;
			}
			span:last-child{
				// display: block;
				// width:15px;
				// height:15px;
				// border-radius: 50%;
				// background: #ff0000;
				// color:#fff;
				// position: absolute;
				// top:0px;
				// left:45px;
				// text-align: center;
				// font-size:12px;
			}

		}
		ul{
			li{

				display: flex;
				justify-content: space-between;

				line-height: 35px;
				span{
					width:5%;
				}
				p:nth-of-type(1){
					width:95%;
					span{
						margin-left: 15px;
					}

				}

			}
			.page{
				/deep/div{
					width:60%;
					margin:20px auto;
				}

			}

		}

	}
	/deep/.el-pagination button{
		height:40px;
	}
	/deep/.el-pager li{
		height:40px;
		line-height: 40px;
	}
	/deep/.el-pagination.is-background .el-pager li{
		min-width: 40px;

	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
		background: #e92c16;

	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover{
		background: #e92c16;
		color:#fff;
	}
	/deep/.el-pagination.is-background .btn-prev{
		min-width: 40px
	}
	/deep/.el-pagination.is-background .btn-next{
		min-width: 40px

	}
</style>
