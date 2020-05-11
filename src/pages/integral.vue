<template>
	<div class="integral">
		<div class="pic">
			<span><img :src="userMsg.pic_id" alt=""></span>
			<strong>积分排名</strong>
		</div>
		<ul>
			<p><span>我的积分{{integralNumMe}}分</span><span>当前排名{{rownumMe}}名</span></p>
			<li v-for="(item,index) in list" :key="index">
				<span>{{item.rownum}}</span>
				<span>{{item.mebName}}</span>
				<span>{{item.orgName}}</span>
				<span>{{item.mebCard | popCard}}</span>
				<span>{{item.integralNum}}分</span>
			</li>
			<div class="page">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :page-size="pageSize"
				  :current-page.sync="pageNum"
				  @current-change="getlist"
				  :total='pages'>
				</el-pagination>
			</div>
		</ul>

	</div>
</template>

<script>
	export default {
		name:'integral',
		props:["userMsg"],
		data(){
			return {
				list:[],
				pageSize:20,
				pageNum:1,
				integralNumMe:0,//当前积分
				rownumMe:0,//当前排名
				pageSize:6,//每页条数
				pageCurrent:1,
				pageNum:0,//当前页
				userArea:{},//用户的地址信息
				pages:0,//总页数
			}
		},
		created(){
			this.getlist()
		},
		methods:{
			getlist(current){
				this.$axios.get("exam/funcodeintegral/rankList",this.qs({
					pageSize:this.pageSize,
					pageNum:this.pageNum,

				})).then((res)=>{
					if(res.data.code==200){
						this.integralNumMe=res.data.data.integralNumMe
						this.rownumMe=res.data.data.rownumMe
						this.list=res.data.data.rankList.list
					}
				})
			}
		},
		filters: {
			popCard(v){
				var leng=v.length
				v = v.substr(0, 6) + '********' + v.substr(leng - 4);
				return v
			}
		}
	}
</script>

<style scoped lang="less">
	.integral{
		padding:20px 20px;
		.pic{
			border-bottom:1px dotted #ed7029;
			margin-bottom: 20px;
			padding-bottom: 20px;
			display: flex;
			align-items: center;
			span{
				display: inline-block;
				width:50px;
				height:50px;
				border-radius: 50%;
				overflow: hidden;
				img{
					display: block;
					width:100%;
					height:100%;
				}
			}
			strong{
				color:#ed7029;
				margin-left: 20px;

			}
		}
		ul{
			p{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:18px 10px;
				background: #ff3e1e;
				color:#fff;
			}
			li{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:25px 0;
				border-bottom:1px solid #f2f2f2;
				span:first-child{
					display: inline-block;
					width:40px;
					height:25px;
					background:#ec8655;
					text-align: center;
					color:#fff;
				}
			}
			.page{
				display: flex;
				margin-top: 30px;
				align-items: center;
				justify-content: center;

			}
		}


	}

	/deep/.el-pagination button{
		height:30px;
	}
	/deep/.el-pager li{
		height:30px;
		line-height: 30px;
	}
	/deep/.el-pagination.is-background .el-pager li{
		min-width: 30px;

	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
		background: #e92c16;

	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover{
		background: #e92c16;
		color:#fff;
	}
	/deep/.el-pagination.is-background .btn-prev{
		min-width: 30px
	}
	/deep/.el-pagination.is-background .btn-next{
		min-width: 30px

	}
</style>
