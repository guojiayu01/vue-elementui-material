import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import zhuce from '@/components/zhuce.vue'
import headTop from '@/components/headTop.vue'
import someCharts from '@/page/someCharts.vue'
import webMap from '@/page/webMap.vue'
import userList from '@/page/userList.vue'
import materialInfo from '@/page/materialInfo.vue'
import peopleTable from '@/page/peopleTable.vue'
import navBar from '@/components/navBar.vue'
import deptList from '@/page/deptList'
import materialNum from '@/page/materialNum'
import first from '@/page/first'
import callme from '@/page/callme'
import materialD from '@/page/materialD'
import needPlan from '@/page/needPlan'
import needPlanp from '@/page/needPlanp'
import pruchase from '@/page/pruchase'
import No from '@/components/No'



Vue.use(Router)

export default new Router({

  routes: [
    // {
    //   path: '/',  // 默认进入路由
    //   redirect: '/home/first'   //重定向
    // },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { title: '首页', requireAuth:true },
      children:[
        
        {
          path: '/home/first',
          name: 'first',
          component : first,
          meta: { requireAuth:true },
        },
        {
          path: '/home/webMap',
          name: 'webMap',
          component : webMap,
          meta: { title: '地图' , requireAuth:true}
        },
        {
          path: '/home/userList',
          name: 'userList',
          component : userList,
          // meta:{ title: '人员管理' }
        },
        {
          path: '/home/someCharts',
          name: 'someCharts',
          component : someCharts,
          meta: { title: '物资类别' , requireAuth:true},

        },
        {
          path: '/home/materialInfo',
          name: 'materialInfo',
          component : materialInfo,
          meta: { title: '物资编码审批' ,requireAuth:true},

        },
        {
          path: '/home/materialD',
          name: 'materialD',
          component : materialD,
          meta: { title: '打印物资数据' ,requireAuth:true},
        },
        {
          path: '/home/needPlan',
          name: 'needPlan',
          component : needPlan,
          meta: { title: '需求计划申请' ,requireAuth:true},
        },
        {
          path: '/home/pruchase',
          name: 'pruchase',
          component : pruchase,
          meta: { title: '请购' ,requireAuth:true},
        },
        {
          path: '/home/needPlanp',
          name: 'needPlanp',
          component : needPlanp,
          meta: { title: '需求计划审批' ,requireAuth:true},
        },
        {
          path: '/home/peopleTable',
          name: 'peopleTable',
          component : peopleTable,
          meta:{ title: '人员管理' ,requireAuth:true }
        },
        {
          path: '/home/deptList',
          name: 'deptList',
          component : deptList,
          meta:{ title: '部门管理' ,requireAuth:true}
        },
        {
          path: '/home/materialNum',
          name: 'materialNum',
          component : materialNum,
          meta:{ title: '物资编码申请' ,requireAuth:true}
        },
        {
          path: '/home/callme',
          name: 'callme',
          component : callme,
          meta:{ title: '请联系我' ,requireAuth:true}
        },
        {
          path: '/home/No',
          name: 'No',
          component : No,
          meta:{ title: '404' }
        }

       
        
      ]
    },
    {
      path: '/zhuce',
      name: 'zhuce',
      component: zhuce,
      meta:{ requireAuth:true}
    },
    {
      path: '/headTop',
      name: 'headTop',
      component : headTop,
      meta:{ requireAuth:true}
    },
    {
      path: '/navBar',
      name: 'navBar',
      component : navBar,
      meta:{ requireAuth:true}
    },
    
    
  ]
})



