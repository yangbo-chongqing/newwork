<template>
  <div id="organize">
    <!--  导航    -->
    <div class="nav" :class="{actives : topDistance}">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>组织建设</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="navItem">
          <ul>
            <li @click="goAddress('.build')">
              <a href="javascript:;" :class="{active:toolIndex == 0}">组织建设</a>
            </li>
            <!-- <li @click="goAddress('.map')">
               <a href="javascript:;" :class="{active:toolIndex == 1}">党建地图</a>
               <i></i>
             </li>-->
          </ul>
        </div>
      </div>
    </div>
    <div id="Myborder" style="width: 100%;height: 40px" v-show="topDistance"></div>
    <!-- 组织建设 -->
    <div class="build">
      <div class="buildBox typeArea">
        <div class="headline wow slideInRight">
          <!-- <i><img src="../assets/img/num_1.png"></i>-->组织建设
          <div class="titleSmall">
            <p class="wow slideInLeft">
              党组织建设和学习情况
            </p>
            <p></p>
          </div>
        </div>
        <div class="plate">
          <a href="javascript:;" @click="isParty('organizeMeet')">
            <div class="plateBox">
              <i class="iconfont wow bounceInDown">&#xe671;</i>
              <p class="wow rotateIn">三会一课</p>
            </div>
          </a>
          <a href="javascript:;" @click="isParty('organizeVote')">
            <div class="plateBox">
              <i class="iconfont wow bounceInDown">&#xe61f;</i>
              <p class="wow rotateIn">换届选举</p>
            </div>
          </a>
          <a href="javascript:;"  @click="isParty('organizeGrade')">
            <div class="plateBox">
              <i class="iconfont wow bounceInDown">&#xe6c3;</i>
              <p class="wow rotateIn">书记考核</p>
            </div>
          </a>
          <!-- <a href="javascript:;" @click="goOtherPages('organizeTeach')">
             <div class="plateBox">
               <i class="iconfont wow bounceInDown">&#xe655;</i>
               <p class="wow rotateIn">党建学习</p>
             </div>
           </a>-->
          <a href="javascript:;" @click="isParty('organizePeople')">
            <div class="plateBox">
              <i class="iconfont wow bounceInDown">&#xe637;</i>
              <p class="wow rotateIn">组织架构</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!--   党建地图   -->
    <div class="map">
      <div class="mapBox typeArea">
        <div class="headline wow slideInRight ">
          <i><img src="../assets/img/num_2.png"></i>党建地图
          <div class="titleSmall">
            <p class="wow slideInLeft">
              党组织在区域内的分布情况
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <!--   地图部分     -->
      <baidu-map
        class="bm-view typeArea"
        :center="center" :zoom="zoom" @ready="handler"
        :class="{fullScreen:isAll}"
        :scroll-wheel-zoom="true"
      >
        <!--          <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{width:50,height:80}"></bm-navigation>-->
        <bm-control>
          <div class="searchMap">
            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}" >
              <input type="text" class="selectText" placeholder="请输入搜索地名"/>
            </bm-auto-complete>
            <button class="push" @click="gainMap">
              <i class="iconfont">&#xe610;</i>
            </button>
          </div>
          <bm-local-search :keyword="address" :auto-viewport="true" style="display: none;"></bm-local-search>
        </bm-control>

        <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
          <div class="user">
            <div class="userName">欢迎您：{{username}}</div>
            <div class="userHead">
              <img :src="userimg" alt="">
            </div>
          </div>
        </bm-control>
        <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT">
          <div class="allBox">
            <el-collapse-transition>
              <div v-show="show" style="height: 900px;">
                <div class="mold">
                  <div class="moldBox borderShow">
                    <div class="round one" @click="getAddress('one')">
                      <i class="iconfont">&#xe629;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 1}">企业支部</span>
                  </div>
                </div>

                <div class="mold">
                  <div class="moldBox">
                    <div class="round two" @click="getAddress('two')">
                      <i class="iconfont">&#xe618;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 2}">机构支部</span>
                  </div>
                </div>

                <div class="mold">
                  <div class="moldBox">
                    <div class="round three" @click="getAddress('three')">
                      <i class="iconfont">&#xe61b;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 3}">党工委</span>
                  </div>
                </div>

                <div class="mold">
                  <div class="moldBox">
                    <div class="round four" @click="getAddress('four')">
                      <i class="iconfont">&#xe865;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 4}">党委</span>
                  </div>
                </div>

                <div class="mold">
                  <div class="moldBox">
                    <div class="round six" @click="getAddress('six')">
                      <i class="iconfont">&#xe62a;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 5}">活动阵地</span>
                  </div>
                </div>

                <div class="mold">
                  <div class="moldBox">
                    <div class="round seven" @click="getAddress('seven')">
                      <i class="iconfont">&#xe636;</i>
                    </div>
                    <span :class="{pushColor:colorMap == 6}">志愿服务</span>
                  </div>
                </div>


              </div>
            </el-collapse-transition>

            <div class="mold" @click="showBox">
              <div class="moldBox" :class="{ 'borderShow': isActive }">
                <div class="round five">
                  <i class="iconfont">&#xe611;</i>
                </div>
                <span>{{changeText}}</span>
              </div>
            </div>
          </div>
        </bm-control>

        <template v-for="item of msg">
          <bm-marker :position="item" @click="infoWindowOpen(item)" @mousedown="infoWindowOpen(item)" :icon="{url: require('../assets/img/resizeApi.png'), size: {width: 48, height: 88}}"></bm-marker>
        </template>

        <bm-info-window :show="mapText" :position="infoItem" @close="infoWindowClose" :autoPan="true" :offset="{width:-2,height:-24}">
          <div class="msgBox">
            <h2>{{infoItem.name}}</h2>
            <div class="innerBox">
              <p>{{infoItem.text}}</p>
            </div>
            <a class="details" @click="gotoInfo(infoItem.id)">查看详情></a>
          </div>
        </bm-info-window>
        <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT">
          <div class="mixWindows">
            <button @click="execute">{{allText}}</button>
          </div>
        </bm-control>
      </baidu-map>
    </div>
    <!--提交党员信息-->
    <div id="upParty">
      <el-dialog title="党员信息绑定" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.idCard" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="upParty">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BaiduMap from 'vue-baidu-map'
  Vue.use(BaiduMap, {
    ak: 'oN8tiLhwvwzvkuBYAWthD4VNF8SYDxu4'
  })
  import {WOW} from 'wowjs'
  export default {
    name: "organize",
    data() {
      return {
        topNums:0,
        toolIndex:0,
        show:false,
        isActive:true,
        username:'游客',
        userimg:'',
        center: {lng: 0, lat: 0},
        zoom: 3,
        mapText: false,
        changeText:'展开',
        allText:'全屏',
        keyword:'',
        address:'',
        flag:false,
        infoItem: {name: null,text:null},
        data:[],
        msg:[],
        Baidu:'',
        mapList:[],
        form: {
          name: '',
          idCard: '',
          delivery: false,
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        isAll:false,
        colorMap:0,
        goPages:''
      }
    },
    computed:{
      topDistance:function () {
        return this.topNums > 700;
      },
    },
    methods: {
      execute(){
        if(!this.isAll){
          this.allText = '还原';
        }else{
          this.allText = '全屏';
        }
        this.isAll = !this.isAll;

      },
      handler({BMap, map}) { //获取默认经纬度
        this.center = {lng: 114.537617, lat: 36.600166};
        this.zoom = 15;
        this.Baidu = map;
      },
      showBox(){  //展开类型
        if(!this.show){
          this.changeText = '收起'
        }else{
          this.changeText = '展开'
        }
        this.show = !this.show;
        this.isActive = !this.show;
      },
      infoWindowOpen (item) {
        this.mapText = true;

        this.infoItem = item;
      },
      infoWindowClose (){
        this.mapText = false
      },
      gainMap(){
        this.address = this.keyword
      },
      //后台获取的值付给地图显示
      getAddress(val){
        if(!this.isClick()){  //验证是否登陆。
          return false;
        }
        let choose = {'one':1, 'two':2,'three':3,'four':4,'six':5,'seven':6};
        this.colorMap = choose[val];
        this.getMap(choose[val]);
      },
      //跳转详情
      gotoInfo(id){
        this.$router.push({
          path:'/organizeDetails.html',
          query:{
            id:this.Base64.encode(id)
          }
        })
      },
      getMap(type){   //获取地图
        this.$axios.get('/fun/deptOrg/list?orgType='+type).then(msg=>{
          if(msg.status == 200){
            this.data = msg.data.data.list;
            for(let i=0;i<this.data.length;i++){
              this.mapList.push({
                name:this.data[i].orgName,
                lng:this.data[i].longitude,
                lat:this.data[i].latitude,
                text:this.data[i].orgInfo,
                id:this.data[i].orgId
              })
            }
          }else{
            this.$message.error('获取地图失败，请检查网络或稍后再试');
          }
        }).catch(err=>{
          this.$message.error('获取地图失败，请检查网络或稍后再试');
        });

        this.mapList = [];

        this.msg = this.mapList;

      },
      //检查点击后是否登陆
      isClick(){
        if(this.username === '游客'){
          this.$message({
            message: '未登陆，无法获取地址！',
            type: 'error',
            offset:'60'
          });
          return false;
        }else {
          return true;
        }
      },
      //检查是否登录
      isLogin(flag=false){
        this.$axios.get('/logins/isLogin').then(msg=>{
          console.log(msg);
          if(msg.status == 200 && msg.data.status == 400){
            //用户未登录 让用户去登陆
            this.$confirm('本页面功能需要登录，是否前往登录页面？', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login.html')
            }).catch(() => {
              this.flag = true
            });
          }else if(msg.status == 200 && msg.data.status == 200){
            //已经登陆什么也不干

            this.isParty()
          }else{
            //报错
            this.$message.error('获取登录信息失败');
          }
        }).catch(err=>{

        })
      },
      //跳转其他页面
      goOtherPages(name){
        if(!this.flag){
          this.$router.push(name+'.html')
        }
      },
      //验证党员
      isParty(name){
        this.$axios.get('/logins/isLogin').then(msg=>{
          if(msg.status == 200 && msg.data.status == 400){
            //用户未登录 让用户去登陆
            this.$confirm('本页面功能需要登录，是否前往登录页面？', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login.html')
            }).catch(() => {
            });
          }else if(msg.status == 200 && msg.data.status == 200){
            //已经登陆什么也不干
            // this.goPages = name + '.html'
            this.$axios.post('fun/partyMember/isMember').then(msg=>{
              if(msg.status == 200 && msg.data.msg == '是党员'){
                // 是党员进行跳转
                // this.goOtherPages(name)
              }else{
                //不是党员出现弹窗
                this.$confirm('本页面需要以党员身份进入，您还没有绑定党员信息，是否绑定？', '温馨提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  //进行绑定党员信息
                  this.dialogFormVisible = true
                  return false
                }).catch(() => {
                  //点击取消不动

                });
              }
            })
          }else{
            //报错
            this.$message.error('获取登录信息失败');
          }
        }).catch(err=>{
          //报错
          this.$message.error('获取登录信息失败');
        })

      },
      //发送党员信息
      upParty(){
        // 验证姓名
        if(this.form.name.trim().length == 0){
          this.$message.warning('姓名不能为空');
          return false
        }
        //验证身份证号
        if(this.form.idCard.trim().length == 0){
          this.$message.warning('身份证号不能为空');
          return false
        }
        const idReg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:(?:0[1-9])|(?:1[0-2]))(?:(?:[0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if( !idReg.test(this.form.idCard)){
          this.$message.warning('请正确输入身份证号');
          return false
        }
        // 发送请求
        this.$axios.post('/fun/partyMember/bindingMember',this.qs({
          popName:this.form.name,
          popCard:this.form.idCard
        })).then(msg=>{
          if(msg.status == 200){
            if(msg.status == 200 && msg.data.code == 400 ){
              //管理员未录入该党员信息
              this.$message.warning('管理员未录入该党员信息');
              return false
            }else{
              this.$message.success('党员信息绑定成功');
              this.$router.push('/'+this.goPages)
              this.dialogFormVisible = false
            }
          }
        }).catch(err=>{
          this.dialogFormVisible = false
          this.$message.warning('绑定党员信息失败，请检查您的网络或稍后再试');
        })
      }
    },

    mounted() {
      new WOW().init();
      window.addEventListener('scroll', this.handleScroll, true)
      let userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      if(userMsg){
        this.username = userMsg.name;
        this.userimg = userMsg.pic_id;
        // this.getMap()
        return false
      }

      this.userimg = require('../assets/img/notLogin.png')
    },
    created(){
      this.isLogin()

    },
    watch:{
      dialogFormVisible(newval){
        if(!newval){
          this.isParty()
        }
      }
    }


  }
</script>
<style scoped lang="less">
  @import "../assets/less/public.less";
  /* 导航样式 */
  .nav{
    width: 100%;
    height: 50px;
    background-color: #e8e8e8;
  }
  .navBox{
    display: flex;
    justify-content: space-between;
  }
  .breadCrumb{
    margin-top: 17px;
    margin-left: 20px;
  }
  .actives{
    position: fixed;
    top:0;
    left: 0;
    z-index: 999;
  }
  .navItem{
    height: 49px;
    &>ul{
      height: 100%;
      display: flex;
      li{
        height: 100%;
        width: 95px;
        text-align: right;
        line-height: 50px;
        position: relative;
        margin-left: 30px;
        a{
          display: inline-block;
          height: calc(100% - 2px);
          font-size: 16px;
          &.active{
            border-bottom: 2px solid #e61a18;
            color: #e61a18;
          }
        }
        i{
          position: absolute;
          left: 0;
          width: 2px;
          height: 2px;
          top:50%;
          transform: translateY(-50%);
          background-color: #000;
        }
      }
    }
  }
  /* 组织建设样式 */
  .build{
    width: 100%;
  }
  .headline{
    margin: 80px 0;
    font-size: 30px;
    color: #ff2727;
    &>.titleSmall{
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      margin-left: 46px;
      margin-top: 10px;
      color: #000000;
      flex-direction: row;
      margin-bottom: 75px;
      &>p:first-of-type{
        font-size: 14px;
        width: 14%;
        margin-right: 20px;
      }
      &>p:last-of-type{
        height: 2px;
        background-color: red;
        width: 78%;
      }
    }
  }
  .headline > i{
    margin-right: 10px;
    font-size: 50px;
  }
  .plate{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cdcdcd;
    padding-bottom: 100px;
  }
  .plate  .plateBox{
    width: 265px;
    height: 250px;
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .plate a:nth-child(1) .plateBox{
    background-color: #f8a81d;
  }
  .plate a:nth-child(2) .plateBox{
    background-color: #fc6758;
  }
  .plate a:nth-child(3) .plateBox{
    background-color: #5bcc8b;
  }
  .plate a:nth-child(4) .plateBox{
    background-color: #1C86EE;
  }
  .plate a:nth-child(5) .plateBox{
    background-color: #ed7028;
  }
  .plate  .plateBox > i{
    font-size: 90px;
    color: #ffffff;
    margin-top: 50px;
  }
  .plate  .plateBox > p{
    position: absolute;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    top:70%;
  }
  /* 党建地图 */
  .map{
    width: 100%;
  }
  .bm-view{
    height: 92vh;
    margin-bottom: 100px;
  }
  .searchMap{
    margin: 20px;
    display: flex;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
  }
  .searchMap .selectType{
    border: none;
    border-right:1px solid #ababab;
    height: 38px;
    font-size: 14px;
    color: #2390f7;
  }
  .searchMap .selectText{
    height: 38px;
    border: none;
    padding: 0 5px;
    width: 200px;
    font-size: 12px;
  }
  .searchMap .push{
    width: 58px;
    height: 38px;
    background-color: #2491f6;
  }
  .push > i{
    font-size: 20px;
    color: #ffffff;
  }
  .user{
    margin: 30px 100px;
    display: flex;
    position: relative;
  }
  .user > .userName{
    padding: 0 40px;
    height: 38px;
    color: #ff2e2e;
    background-color: #ffffff;
    text-align: center;
    line-height: 2.8;
    font-size: 14px;
    border-radius: 20px;

  }
  .user > .userHead{
    position: absolute;
    width: 65px;
    height: 65px;
    box-shadow: 0 0 10px rgba(229, 176, 177, 0.8);
    background-color: #ffffff;
    border-radius: 50%;
    right: -40px;
    top: -15px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mold{
    height: auto;
    width:100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
  }
  .allBox{
    margin: 20px 50px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
  }
  .mold > .moldBox{
    border-top: 1px solid #dddddd;
    margin: 5px 0;
    padding-top: 10px;
  }
  .mold > .moldBox > .round{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0,0,0,.35);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .mold > .moldBox > .round >i{
    font-size: 30px;
    color: #ffffff;
  }
  .one{
    background-color: #ff3f56;
  }

  .two{
    background-color: #55d429;
  }
  .three{
    background-color: #ff7127;
  }
  .four{
    background-color: #1c92f5;
  }
  .five{
    background-color: #e62caa;
  }
  .six{
    background-color: #f19c0c;
  }
  .seven{
    background-color: #ff2819;
  }
  .mold > .moldBox > span{
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    display: block;
  }
  .mold > .borderShow{
    border-top: none;
  }
  .msgBox{
    /*width: 418px;*/
    height: 175px;
    border:1px dashed #ff2828;
    margin: 10px 0;
    position: relative;
  }
  .msgBox > h2{
    font-size: 20px;
    color: #ff1e1e;
    margin-left: 10px;
    margin-top: 10px;
  }
  .msgBox > .innerBox {
    margin: 20px 10px;
  }
  .msgBox > .innerBox > p{
    font-size: 15px;
    color: #7b7b7b;
    line-height: 1.5;
  }
  .msgBox > .innerBox > span{
    color: #ff1e1e;
    font-size: 13px;
    margin-top: 10px;
    display: block;
  }
  .msgBox > .details{
    font-size: 12px;
    color: #ff1e1e;
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 20px;
    background-color: #ffffff;
  }
  .fullScreen{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .mixWindows > button{
    width: 60px;
    height: 60px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.25);
    cursor: pointer;
    color: #4f96d1;
    margin-left: 30px;
    margin-bottom: 60px;
  }
  .pushColor{
    color: #ff0000;
  }
  //添加动画
  .plateBox{
    cursor: pointer;
    transition: all 0.3s ease-in;
    -webkit-transition: all 0.3s ease-in;
  }
  .plateBox:hover{
    transform: scale(1.1);
    z-index: 999;
  }

</style>
