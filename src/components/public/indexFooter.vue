<template>
  <div>
    <div class="footer" id="footer">
      <div class="footerBox">
        <div class="leftBox">
          <h2><img src="../../assets/img/logo.png" alt=""></h2>
          <p>邯郸智慧党建管理系统，是以党的十九大指出的“新时代党的建设总要求”为指引，结合当前党建工作现状，运用互联网、云计算、大数据等信息化技术，所打造的集党的“政治建设、思想建设、组织建设、作风建设、纪律建设、制度建设”于一体的综合性党建工作平台<a href="#">功能体验>></a></p>
          <p>Copyright © 2019 - 2022 hst.com All Rights Reserved 安徽赛达信息技术有限责任公司 版权所有 皖ICP
            备12512545号 皖公网备44130382773560号</p>
        </div>
        <div class="centerBox">
          <p>累计访问: {{quantity}}</p>
          <p>服务热线：
            <span>400-1999-355</span></p>
        </div>
        <div class="rightBox erweiImg">
          <img src="../../assets/img/erwei.png" alt="" class="appImg">
          <p>手机APP</p>
          <p>扫码下载邯郸党建app</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "indexBottom",
    data(){
      return{
        quantity:123,
        addNum:{type:"handanweb"},
        getTime:{type:"handanweb",getNumber:true}
      }
    },
    methods:{
      //获取访问数
      getNum(obj){
        this.$axios.post('/CountryStatistics/getWebsite',this.qs(obj)).then(msg=>{
          if(msg.data.date){
            this.quantity = msg.data.date[0].number
          }
        })
      }
    },
    created(){
      this.getNum(this.addNum)
      setTimeout(()=>{
        this.getNum(this.getTime)
      },500)
    }
  }
</script>

<style scoped lang="less">
  .footer{
    width: 100%;
    background-color: #262728;
  }
  .footer > .footerBox{
    width: 1200px;
    height: 355px;
    margin: 0 auto;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    position: relative;
    /*padding-top: 50px;*/
  }
  .leftBox{
    width: 660px;
  }
  .leftBox,.centerBox,.rightBox{
    margin-top: 60px;
  }
  .leftBox,.centerBox{
    margin-right: 60px;
  }
  .leftBox > h2{
    width: 228px;
    height: 50px;
    margin-bottom: 20px;
    background-color: #262728;
  }
  .leftBox > h3{
    font-size: 19px;
    margin: 20px 0;
  }
  .leftBox > p{
    font-size: 15px;
    line-height: 2;
    &:first-of-type{
      &>a{
        margin-left: 10px;
      }
    }
  }
  .leftBox > p > a{
    color: #ee7129;
  }
  .leftBox > p{
    padding-bottom: 20px;
  }
  .centerBox{
    margin-top: 140px;
    width: 200px;
  }
  .centerBox > p{
    font-size: 17px;
    margin-bottom: 50px;
  }
  .centerBox > p > span{
    font-size: 28px;
    display: block;
    margin-top: 20px;
  }
  .rightBox{
    position: absolute;
    right: 0;
    top: 20px;
  }
  .appImg{
    width: 100px;
    height: 100px;
    background-color: #ffffff;
    display: block;
    margin: 52px auto 25px;
  }
  .rightBox > p{
    text-align: center;
    margin-bottom: 10px;
  }

</style>
