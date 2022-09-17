// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';
// 引入组件
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: "news",
                    component: News,
                },
                {
                    path: "message",
                    component: Message,
                    children: [
                        {
                            name: "detail", // name配置项为路由命名
                            path: "detail/:id/:title",  // 使用占位符声明接受params参数
                            component: Detail,
                        }
                    ]
                }
            ]
        },
        {
            path: '/about',
            component: About,
        }
    ]
})
