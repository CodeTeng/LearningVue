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
                            // props的第一种写法，值为对象，该对象中的key-value都会以props的形式传给Detail组件
                            // props: {a: 1, b: 'hello'}

                            // props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的params参数，以props的形式传给Detail组件
                            // props: true,

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
            path: '/about',
            component: About,
        }
    ]
})
