import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import xdadd from './views/addArticle/addArticle.vue'
import xdManage from './views/addArticle/xdManage.vue'
import xdEdit from './views/addArticle/editArticle.vue'
import adZydh from './views/zydh/addZy.vue'
import zyManage from './views/zydh/zyManage.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        redirect: { path: '/main' },
        name: '心得文章管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/xdadd', component: xdadd, name: '添加文章' },
            { path: '/xdmanage', component: xdManage, name: '文章管理' },
            { path: '/xdedit', component: xdEdit, name: '文章编辑',hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资源导航模块管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
            { path: '/zyadd', component: adZydh, name: '添加资源导航内容' },
            { path: '/zymanage', component: zyManage, name: '资源导航内容管理' },
            /*{ path: '/xdedit', component: xdEdit, name: '文章编辑',hidden:true }*/
        ]
    },
    /*{
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;