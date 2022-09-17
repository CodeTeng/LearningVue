// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';
// 引入组件
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";

// 创建并暴露一个路由器
const router = new VueRouter({
    mode: 'history',    // 模式
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            meta: {title: '主页'},
            component: Home,
            children: [
                {
                    name: 'xinwen',
                    path: "news",
                    component: News,
                    meta: {isAuth: true, title: '新闻'},
                    // 独享守卫，特点路由切换之后被调用
                    /*beforeEnter: (to, from, next) => {
                        if (to.meta.isAuth) {
                            if (localStorage.getItem('school') === 'teng') {
                                next()
                            } else {
                                alert("学校名不对，无权限查看")
                            }
                        } else {
                            next()
                        }
                    }*/
                },
                {
                    name: 'xiaoxi',
                    path: "message",
                    component: Message,
                    meta: {isAuth: true, title: '消息'},
                    children: [
                        {
                            name: "detail", // name配置项为路由命名
                            path: "detail/:id/:title",  // 使用占位符声明接受params参数
                            component: Detail,
                            meta: {isAuth: true, title: '详情'},
                            // props的第三种写法，值为函数
                            props($route) { // 这里可以使用解析赋值
                                return {
                                    id: $route.params.id,
                                    title: $route.params.title,
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: {isAuth: true, title: '关于'}
        }
    ]
})

// 全局前置路由守卫---初始化的时候被调用、每次路由切换之前被调用
/*router.beforeEach((to, from, next) => {
    console.log("前置路由守卫", to, from)
    // 判断是否需要鉴权
    if (to.meta.isAuth) {
        if (localStorage.getItem('school') === 'teng') {
            next()
        } else {
            alert("学校名不对，无权限查看")
        }
    } else {
        next()
    }
})*/

// 全局后置路由守卫---初始化的时候被调用、每次路由切换之后被调用
/*router.afterEach((to, from) => {
    console.log("后置路由守卫", to, from)
    document.title = to.meta.title || 'Vue学习'
})*/

export default router;
