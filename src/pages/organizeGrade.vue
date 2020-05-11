<template>
  <div class="organizeTeach">
    <!--   导航     -->
    <div class="nav">
      <div class="navBox typeArea">
        <div class="breadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><router-link to="/organize.html">组织建设</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>考核打分</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <!--  内容    -->
    <div class="content">
      <div class="contentBox typeArea" v-show="examinationList.length">
        <div class="tables">
          <div class="list">
              <div
                class="headline"
                @click="gainPaper(item.id)"
                v-for="(item,index) of examinationList"
                :class="{headlineActive:flag == item.id}"
              >
                <h3>{{item.title}}</h3>
                <p>是否考核：{{judge(item.isExam)}}</p>
                <p>考核时间：{{item.startDate}}</p>
              </div>
          </div>
          <div class="essay">
            <h2>{{examinationPaper.title || '请选择考卷！'}}</h2>
            <div v-for="(item,index) of examinationPaper.titles" :key="index">
              <p>{{index+1}}、{{item.title}}</p>
              <div class="formBox">
                <el-radio-group v-model="radio[index]">
                  <el-radio v-for="(child,index) of item.choices" :label="child" :key="index">{{child.choice}} . {{child.choiceDesc}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="submits" @click="overPaper">提交</div>
        </div>
      </div>
    </div>
    <div class="notData" v-show="!examinationList.length">
      <img src="../assets/img/notImgThree.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "organizeGrade",
    data(){
      return{
        radio:[],
        examinationList:[],   //考题列表
        examinationPaper:[],   //试卷
        flag:0,
        beforePaper:0, //获取考题id
        first:0
      }
    },
    methods:{
      //提交考试答卷
      overPaper(){
        let datas = [];
        if(Object.keys(this.radio).length !== this.examinationPaper.titles.length){
          this.$message({
            message: '未完成答题，无法提交',
            type: 'error'
          });
          return false;
        }

        for(let i=0;i<this.radio.length;i++){
          datas.push({
            titleId:this.examinationPaper.titles[i].id,
            answerId:this.radio[i].choice
          })
        }

        //提交试卷
        this.$axios.post('/examQuest/saveUserExam',this.qs({
          userExamId:this.beforePaper,
          answers:JSON.stringify(datas)
        })).then(msg=>{
          if(msg.data.code === 0){
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.radio = [];
          }else if(msg.data.code === -2){
            this.$message({
              message: '提交失败，已经做过该题',
              type: 'error'
            });
            this.radio = [];
          }

        })

      },
      //点击获取试卷
      gainPaper(id){
        this.flag = id;
        this.$axios.post('/examQuest/getExamPaper',this.qs({
          id:id
        })).then(msg=>{
          if(msg.status == 200){
            console.log(msg);
            this.examinationPaper = msg.data.data;
            this.beforePaper = msg.data.data.userExamId;
          }else{
            this.$message.error('获取考试试卷失败，请检查网络或稍后再试');
          }
        }).catch(err=>{
          this.$message.error('获取考试试卷失败，请检查网络或稍后再试');
        })
      },
      //获取考试列表
      getExaminationList(){
        this.$axios.post('/examQuest/listPaperBeExam',this.qs({
        })).then(msg=>{
          if(msg.status == 200){
            this.examinationList = msg.data.data.list;
            this.first = msg.data.data.list[0].id;
          }else{
            this.$message.error('获取考试列表失败，请检查网络或稍后再试');
          }
        }).catch(err=>{
          this.$message.error('获取考试列表失败，请检查网络或稍后再试');
        })
      },
      judge:function(val){  //判断是否已经做题
        if(val === '1'){
          return '是'
        }else{
          return '否'
        }
      }

    },
    created(){
      this.getExaminationList();
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
  /*  内容 */
  .content{
    width: 100%;
    margin: 100px 0;
    &>.contentBox{
      position: relative;
      min-height: 900px;
      border: 1px solid #ff2223;
      .tables{
        display: flex;
        position: relative;
        .list{
          width: 350px;
          min-height: 900px;
          border-right: 1px solid #ff2223;
          .headline{
            cursor: pointer;
            height: 125px;
            border-bottom: 1px solid #ff2223;
            h3{
              color: #333333;
              font-size: 17px;
              font-weight: normal;
              margin: 0 13px;
              padding: 10px 0 0;
              line-height: 2;
            }
            p{
              margin: 12px;
              font-size: 12px;
              color:#ff2425;
            }
          }
          .headline:hover{
            background-color: #ed7029;
              h3{
                color: #ffffff;
              }
              p{
                color: #ffffff;
              }
          }
          .headlineActive{
            background-color: #ed7029;
            h3{
              color: #ffffff;
            }
            p{
              color: #ffffff;
            }
          }
        }
        .submits{
          width: 150px;
          height: 37px;
          background: linear-gradient(to left, #fd3d31 , #f1682a);
          color: #ffffff;
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 55%;
          transform: rotateX(-50%);
          margin-bottom: 20px;
          cursor: pointer;
          line-height: 2.1;
        }
      }
      .essay{
        text-align: center;
        width: 100%;
        margin: 20px 0;
        color: #515151;
        h2{
          font-size: 25px;
          font-weight: normal;
        }
        p{
          margin: 30px 60px;
          text-align: left;
        }
        .formBox{
          width: 800px;
          margin: 0 auto 50px;
          display: flex;
          justify-content: center;

        }
        .formBox /deep/ .el-radio__input.is-checked .el-radio__inner{
          background-color: #ff0000;
          border: #ff0000;
        }
        .formBox /deep/ .el-radio__input.is-checked+.el-radio__label{
          color: #ff0000;
        }
        .formBox /deep/ .el-radio-group{
            margin:0 50px;
        }
        .formBox /deep/ .el-radio__inner{
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  // 默认图片
  .notData{
    width: 500px;
    height: auto;
    margin:  0 auto;
  }
  .notData > img{
    width: 100%;
    height: 100%;
  }
</style>
