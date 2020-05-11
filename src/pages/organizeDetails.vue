<template>
    <div class="organizeDetails">
<!--  导航    -->
      <div class="nav">
        <div class="navBox typeArea">
          <div class="breadCrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><router-link to="/organize.html">党建地图</router-link></el-breadcrumb-item>
              <el-breadcrumb-item>支部介绍</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </div>
<!--  详情内容   -->
      <div class="content">
        <div class="contentBox typeArea">
          <div class="message">
            <div class="msgImg">
              <img :src="details.orgImg | getOneImg" alt="">
            </div>
            <div class="msgText">
              <p>支部名称：<span>{{details.orgName || '无'}}</span></p>
              <p>支部人数：<span>{{details.totalPeople || '无'}}人</span></p>
              <p>党员人数：<span>{{details.totalMember || '无'}}人</span></p>
              <p>负  责  人：<span>{{details.userName || '无'}}</span></p>
              <p>联系电话：<span>{{details.mobile || '无'}}</span></p>
              <p>组织架构：如下图</p>
            </div>
          </div>

          <div class="organizeImg">
            <img :src="details.orgDeptImg | getOneImg" alt="">
          </div>

          <div class="introduce">
            <h2 class="introduceTitle">支部/机构介绍：</h2>
            <p class="introduceText">
              {{details.orgInfo || '无'}}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "organizeDetails",
        data(){
          return{
            id:this.Base64.decode(this.$route.query.id),
            details:{}
          }
        },
        methods:{
          getMsg(){
            this.$axios.post('/fun/deptOrg/info',this.qs({
              orgId:this.id
            })).then(msg=>{
              if(msg.status == 200){
                console.log(msg);
                this.details = msg.data.data;
              }else{
                this.$message.error('获取信息失败，请假查网络或稍后后再试');
              }
            }).catch(err=>{
              this.$message.error('获取信息失败，请假查网络或稍后后再试');
            })
          }
        },
      created(){
        this.getMsg()
      }

    }
</script>

<style scoped lang="less">
  @import "../assets/less/public.less";
  /* 导航样式 */
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
/* 内容 */
  .content{
    margin: 50px 20px 100px;
    &>.contentBox{
      border: 1px solid #ebebeb;
      padding: 20px;
      &>.message{
          display: flex;
          flex-direction: row;
          &>.msgImg{

            &>img{
              display: block;
              width: 205px;
              height: 290px;
              background-color: #cccccc;
            }

          }
          &>.msgText{
            margin-left: 40px;
            &>p{
              color: #686868;
              font-size: 15px;
              margin-bottom: 39px;
              &>span{
                color: #ff2929;
              }
            }
          }
      }
      &>.organizeImg{
        width: 900px;
        height: 900px;
        background-color: #cccccc;
        margin: 0 auto;
      }
      &>.organizeImg >img {
        width: 100%;
        height: 100%;
      }
      &>.introduce{
        color: #494949;
        margin-top: 50px;
        &>.introduceTitle{
          font-size: 22px;
          font-weight: normal;
          margin-bottom: 15px;
        }
        &>.introduceText{
          font-size: 15px;
          font-weight: normal;
          text-indent: 2em;
          line-height: 2;
        }
      }
    }
  }
</style>
