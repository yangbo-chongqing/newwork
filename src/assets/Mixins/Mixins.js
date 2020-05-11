import E from 'wangeditor'
export default {
  methods:{
    //创建富文本
    createE(){
      var editor = new E('#editor');
      editor.customConfig.onchange = (html) => {
        this.formArticle = html;
      };
      editor.customConfig.uploadImgServer =baseUrl + '/work/event/uploadEventImg';
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;

      editor.customConfig.uploadFileName = 'mFile';
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          var url =  result.data[0];
          insertImg(url);

        }
      };
      editor.create();
      return editor;
    },
    //点击到指定位置
    goAddress(e){
      document.querySelector(e).scrollIntoView({block: 'start',behavior: 'smooth'})
    },
    getTop(callback){
      window.addEventListener('scroll',callback,true)
    },
    //判断是否有userArea
    isUserArea(){
      //判断本地存储是否有userArea这个对象，如果有，就什么也不做，否则默认添加一个
      if(!window.localStorage.getItem('userArea')){
        const userArea = {
          province:4,
          city:129,
          district:130,
          street:131,
          community:132
        }
        window.localStorage.setItem('userArea',JSON.stringify(userArea))
      }
    },
    //获取地址信息
    getUserArea(){
        return  JSON.parse(window.localStorage.getItem('userArea'))
    },
    //创建验证码
    createCaptcha(){
      const arr  = ['0','1','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var strlength = 4;
      let str = ''
      for(var i = 0; i < strlength; i++)
      {
        var num = Math.floor(Math.random()*arr.length);
        str+= arr[num];
      };
      this.captcha = str
    },
    //格式化时间
    formatDate(time=new Date(),flag=false){
      time = new Date(time);
      let arr = [time.getFullYear(),time.getMonth() +1,time.getDate(),time.getHours(),time.getMinutes(),time.getSeconds()]
      //填0
      let arr1=[]
      arr.forEach(item=>{
        arr1.push((item>9 ? item :"0" + item).toString())
      });
      let str=""
      if(flag){
        return arr1[0]+"-"+arr1[1]+"-"+arr1[2]+" "+arr1[3]+":"+ arr1[4] + ":" + arr1[5]
      }else{
        return arr1[0]+"-"+arr1[1]+"-"+arr1[2]
      }
    },
    //检查是否登录
    isLogin(callback){
      this.$axios.get('/logins/isLogin').then(msg=>{
        if(msg.status == 200 && msg.data.status == 400){
          //用户未登录 让用户去登陆
          this.$confirm('本页面部分功能需要登录，是否前往登录页面？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/login.html')
          }).catch(() => {
            return false;
          });
        }else if(msg.status == 200 && msg.data.status == 200){
          //已经登陆重新存数据
          window.localStorage.setItem('userMsg',JSON.stringify(msg.data.user))
          callback && callback()
        }else{
          //报错
          this.$message.error('获取登录信息失败');
        }
      }).catch(err=>{
        //报错
        this.$message.error('获取登录信息失败');
      })
    },
  },
  filters:{
    //获取图片的第一条
    getOneImg(url){
      if(!url){
        return  'data:image/jpeg;base64,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'
      }
      if(url.indexOf("http") != -1){
        //有http
        if(url.indexOf(",") !=-1){
          //多条
          return url.split(",")[0]
        }else{
          //单条
          return url
        }
      }else{
        //没有http
        if(url.indexOf(",") !=-1){
          //多条
          return baseUrl + url.split(",")[0]
        }else{
          //单条
          return baseUrl +  url
        }
      }
    },
    //时间格式化
    /*flag为真 返回xxxx-xx-xx xx:xx:xx
    * flag为假  返回 xxxx-xx-xx
    * */
    formatTime(time=new Date(),flag=false){
      time = new Date(time);
      let arr = [time.getFullYear(),time.getMonth() +1,time.getDate(),time.getHours(),time.getMinutes(),time.getSeconds()]
      //填0
      let str=""
      let arr1=[]
      arr.forEach(item=>{
        arr1.push(item>9? item : "0"+item)
      })
      if(flag){
          return arr1[0]+"-"+arr[1]+"-"+arr[2]+" "+arr[3]+":"+ arr[4] + ":" + arr[5]
      }else{
        return arr1[0]+"-"+arr[1]+"-"+arr[2]
      }
    },
  }
}
