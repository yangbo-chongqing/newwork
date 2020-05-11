import Vue from 'vue'
import Router from 'vue-router'
//首页
import index from '../pages/index'
//党建动态
import partyBuild from '../pages/partyBuild'
//组织建设
import organize from '../pages/organize'
//组织建设支部详情
import organizeDetails from '../pages/organizeDetails'
//组织建设教育
import organizeTeach from '../pages/MorganizeTeach'
//组织建设打分
import organizeGrade from '../pages/organizeGrade'
//组织建设选举
import organizeVote from '../pages/organizeVote'
//组织建设三会一课
import organizeMeet from '../pages/organizeMeet'
//组织建设三会一课详情
import organizeDiscuss from '../pages/organizeDiscuss'
//组织建设组织架构
import organizePeople from '../pages/organizePeople'

//党建动态列表页
import partyBuildList from "../pages/partyBuildList"
//党建动态详情页
import partyBuildDetails from "../pages/partyBuildDetails"
//论坛
import forum from "../pages/forum"
//论坛详情
import forumDetails from "../pages/forumDetails"

//志愿活动
import volunteer from  "../pages/volunteer"
//活动详情
import activityDetail from "../pages/activityDetail"
//活动报名
import activityApply from  "../pages/activityApply"
//个人中心
import userCenter from  "../pages/userCenter"
//登录
import login from "../pages/login"
// 注册
import register from "../pages/register"
/*文档学习详情*/
import organizeTeachNew from '../pages/organizeTeachNew'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:"/",
      redirect:"/index.html"
    },
    {
      path: '/index.html',
      name: 'index',
      component: index
    },
    {
      path: '/partyBuild.html',
      name: 'partyBuild',
      component: partyBuild
    },
    {
      path: '/organize.html',
      name: 'organize',
      component: organize
    },
    {
      path: '/organizeDetails.html',
      name: 'organizeDetails',
      component: organizeDetails
    },
    {
      path: '/MorganizeTeach.html',
      name: 'organizeTeach',
      component: organizeTeach
    },
    {
      path: '/organizeGrade.html',
      name: 'organizeGrade',
      component: organizeGrade
    },
    {
      path: '/organizeVote.html',
      name: 'organizeVote',
      component: organizeVote
    },
    {
      path: '/organizeMeet.html',
      name: 'organizeMeet',
      component: organizeMeet
    },
    {
      path: '/organizeDiscuss.html',
      name: 'organizeDiscuss',
      component: organizeDiscuss
    },
    {
      path: '/organizePeople.html',
      name: 'organizePeople',
      component: organizePeople
    },
    {
      path:"/partyBuildList.html",
      name:"partyBuildList",
      component:partyBuildList
    },
    {
      path:"/partyBuildDetails.html",
      name:'partyBuildDetails',
      component:partyBuildDetails
    },
    {
      path:"/forum.html",
      name:"forum",
      component:forum
    },
    {
      path:"/forumDetails.html",
      name:"forumDetails",
      component:forumDetails
    },
    {
      path:"/volunteer.html",
      name:"volunteer",
      component:volunteer,
    },
		{
		  path:"/volunteeractivityDetail.html",
		  name:"activityDetail",
		  component:activityDetail
		},
		{
		  path:"/userCenter.html",
		  name:"userCenter",
		  component:userCenter
		},
		{
		  path:"/volunteeractivityApply.html",
		  name:"activityApply",
		  component:activityApply
		},
    {
      name:"login",
      path:"/login.html",
      component:login
    },
    {
      path:"/register.html",
      name:"register",
      component:register
    },
    {
      path:"/organizeTeachNew.html",
      name:"organizeTeachNew",
      component:organizeTeachNew
    }
  ]
})
