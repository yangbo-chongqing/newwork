<template>
  <div id="roll">
    <el-carousel height="650px">
      <el-carousel-item v-for="(item,index) in swperList" :key="index">
        <a href="javascript:;">
          <img :src="item">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "indexSwper",
    data(){
      return {
        swperList:[require("../../assets/img/banner.png"),require("../../assets/img/banner1.png"),require("../../assets/img/banner2.png")],
        userArea: JSON.parse(window.localStorage.getItem('userArea'))||{ province:4, city:129, district:130, street:131, community:132 }
      }
    },
    methods:{
      /*获取轮播图*/
      getSwper(){
        this.$axios.post('/F_Information/getInformationListApp',this.qs({
          getAll: true,
          home_page: 1,
          province:this.userArea.province,
          city:this.userArea.city,
          district:this.userArea.district,
          street:this.userArea.street,
          community:this.userArea.community,
          pageSize:3,
          pageCurrent:1
        })).then(msg=>{
          // if(msg.status == 200){
          //     this.swperList = msg.data.data.list
          // }else{
          //   this.$message.error('轮播图获取异常');
          // }
        })
      },
      //跳转详情页
      goDetails(obj){
        this.$router.push({
          name:"partyBuildDetails",
          query:{
            news_id:this.Base64.encode(obj.news_id)
          }
        })
      }
    },
    created(){
      this.getSwper()
    }
  }
</script>

<style scoped lang="less">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 120px;
    margin: 0;
  }
  .el-carousel__item.is-animating>a{
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &>img{
       width: 100%;
       height: 100%;
       object-fit: cover;
     }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  #roll /deep/ .el-carousel__indicators{
    margin-bottom: 30px;
  }
  #roll /deep/ .el-carousel__button{
    background-color: #ff7200;
    width: 48px;
    height: 3px;
  }
  #roll /deep/ .is-active > .el-carousel__button{
    background-color: #ff0000;
  }
</style>
