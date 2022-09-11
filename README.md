# Vue2&3全面系统知识

## 1. Vue核心一

### 1.1 初始Vue

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>初始Vue</title>
    <!--引入js文件-->
    <script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
<!--先准备一个容器-->
<div id="app">
    <!--在{{}}里面要写的时js表达式-->
    <h1>Hello, {{name.toUpperCase()}}, {{address}}</h1>
</div>
<script>
    Vue.config.productionTip = false; // 阻止Vue启动时生产的提示

    // 创建一个Vue实例
    new Vue({
        el: "#app", // el指定当前实例为哪个容器服务，值通常为css选择器字符串
        data: {     // data表示用于存储数据，数据供el所指定的容器进行使用，值暂时先写成一个对象
            name: "Teng",
            address: "郑州"
        }
    })
</script>
</body>
</html>
```

![image-20220909000529793](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090005831.png)

**注意**

1. app容器里的代码被称为**Vue模板**
2. 容器与Vue实例是**一一对应**的关系，不能一对多，也不能多对一。
3. 真实开发中只有一个Vue实例，并且会配合着组件一起使用。
4. {{xxx}}中的 xxx 要写js表达式，且xxx可以自动读取到data中的所有属性。
5. 一旦data中的数据发生变化，那么模板中用到该数据的地方也会自动更新。

### 1.2 模板语法

Vue模板语法包括两大类：插值语法和指令语法

**插值语法**

功能：用于解析标签体内容

写法：{{xxx}}，xxx是js表达式，可以直接读取到data中的所有区域

**指令语法** 

功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）

举例：`<a v-bind:href="xxx">`或简写为`<a :href="xxx">`，xxx同样要写js表达式，可以直接读取到data中的所有属性

备注：Vue中有很多的指令，且形式都是v-xxx，此处只是拿v-bind举例

```html
<div id="app">
    <h2>插值语法</h2>
    <h3>你好，{{name}}, {{position.name + position.address}}</h3>
    <h2>指令语法</h2>
    <a :href="position.url">点我去看看：{{position.name}}</a>
</div>

<script>
    new Vue({
        el: "#app",
        data: {
            name: "Teng",
            position: {
                name: "全栈",
                address: "深圳",
                url: "https://github.com/CodeTeng"
            }
        }
    })
</script>
```

![image-20220909002814279](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090028316.png)

### 1.3 数据绑定

Vue中有2种数据绑定的方式

- **单向绑定**`v-bind`数据只能从data流向页面
- **双向绑定**`v-model`数据不仅能从data流向页面，还可以从页面流向data

备注 

- 双向绑定一般都应用在**表单类元素**上，如 `<input>` `<select>` `<textarea>`等
- v-model:value可以简写为v-model，因为v-model默认收集的就是value值

```html
<div id="app">
    单项数据绑定：<input :value="name" type="text"><br/>
    双向数据绑定：<input type="text" v-model="name"><br/>

    <!--以下代码是错误的，因为v-model只能用在表单类元素上-->
<!--    <h2 v-model="name">你好啊</h2>-->
</div>

<script>
    new Vue({
        el: "#app",
        data: {
            name: "Teng"
        }
    });
</script>
```

演示

![image-20220909003452308](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090034373.png)

![image-20220909003606433](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090036557.png)

### 1.4 el与data的两种写法

el有2种写法

- 创建Vue实例对象的时候配置el属性
- 先创建Vue实例，随后再通过`vue.$mount('#app')`指定el的值

data有2种写法

- 对象式：data： { }
- 函数式：**data() { return { } }**

- 如何选择：目前哪种写法都可以，以后到组件时，data必须使用函数，否则会报错

一个重要的原则

- 由Vue管理的函数(如上述data()函数)，**一定不要写箭头函数**，否则this就不再是Vue实例了

```html
<div id="app">
    <h1>你好,{{name}}</h1>
</div>

<script>
    const vue = new Vue({
        // el第一种写法
        el: "#app",
        // data的第一种写法：对象式
        // data: {
        //     name: "Teng"
        // }

        // data的第二种写法：函数式
        data() {
            // this代表的是Vue实例对象
            console.log('@@@', this)
            return {
                name: "Teng"
            }
        }
    });
    // 查看vue实例---带$符号的我们都可以使用
    console.log(vue);
    // el第二种写法
    // vue.$mount('#app');
</script>
```

![image-20220909005004905](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090050965.png)

### 1.5 MVVM模型

![image-20220909005231257](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090052308.png)

MVVM模型

- M：模型Model，data中的数据
- V：视图View，模板代码
- VM：视图模型ViewModel，**Vue实例**

![image-20220909010233694](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090102957.png)

观察发现

- data中所有的属性，最后都出现在了vue身上
- **vue身上所有的属性及Vue原型身上所有的属性，在Vue模板中都可以直接使用**

```html
<div id="app">
    <h1>Hello,{{name}}</h1>
    <!--出现在vm属性上以及vm原型上的都可用-->
    <h1>测试vm属性：{{$el}}</h1>
    <h1>测试vm原型：{{$emit}}</h1>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                name: "Teng"
            }
        }
    });
    console.log(vm);
</script>
```

结果：

![image-20220909010242281](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209090102326.png)

### 1.6 数据代理

`Object.defineproperty`方法

```html
<script>
    let number = 18;
    let person = {
        name: "张三",
        sex: "男",
    }

    Object.defineProperty(person, 'age', {
        // value: 18,
        // enumerable: true,   // 控制属性是否可以枚举，默认值为false
        // writable: true,     // 控制属性是否可以被修改，默认值为false
        // configurable: true, // 控制属性是否可以被删除，默认值为false

        // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
        get() {
            return number;
        },
        // 当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
        set(value) {
            number = value;
        }
    });
    for (const key in person) {
        console.log(person[key]);
    }
    console.log(person);
</script>
```

**数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）**

1. Vue中的数据代理通过vm对象来代理data对象中属性的操作（读/写）
2. Vue中数据代理的好处：更加方便的操作data中的数据
3. 基本原理
    - 通过`Object.defineProperty()`把data对象中所有属性添加到vm上
    - 为每一个添加到vm上的属性，都指定一个getter和setter
    - 在getter和setter内部去操作（读/写）data中对应的属

![image-20220909105120557](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091051799.png)

Vue将`data`中的数据拷贝了一份到`_data`属性中，又将`_data`里面的属性提到Vue实例中（如name），通过`defineProperty`实现数

据代理，这样通过geter/setter操作name，进而操作`_data`中的name。而`_data`又对data进行数据劫持，实现响应式

### 1.7 事件处理

#### 1.7.1 事件处理的基本用法

1. 使用`v-on:xxx`或`@xxx`绑定事件，其中xxx是事件名
2. 事件的回调需要配置在`methods`对象中，最终会在vm上
3. methods中配置的函数，**不要用箭头函数，否则this就不是vm了**
4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象
5. `@click="demo"`和`@click="demo($event)"`效果一致，但后者可以传参

```html
<div id="app">
    <h2>欢迎：{{name}}</h2>
    <button @click="showInfo1">点我提示信息1(不传参)</button>
    <!--此处的$event是个占个符，表示event参数，防止传入参数时event参数丢失-->
    <button @click="showInfo2($event, 66)">点我提示信息2(传参)</button>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                name: 'Teng'
            }
        },
        methods: {
            showInfo1(event) {
                // 默认参数有事件源参数
                console.log(event.target.innerText);
                console.log(this === vm);
                alert("同学你好！");
            },
            showInfo2(event, number) {
                console.log(event, number);
                console.log(event.target.innerText);
                alert("同学你好！");
            }
        }
    })
</script>
```

![image-20220909110929216](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091109341.png)

#### 1.7.2 事件修饰符

Vue中的事件修饰符

- **prevent	阻止默认事件（常用）**
- **stop		阻止事件冒泡（常用）**
- **once		事件只触发一次（常用）**
- capture	使用事件的捕获模式
- self		只有event.target是当前操作的元素时才触发事件
- passive	事件的默认行为立即执行，无需等待事件回调执行完毕

修饰符可以连续写，比如可以这么用：`@click.prevent.stop="showInfo"`

```html
<body>
<div id="app">
    <!--阻止默认事件（常用）-->
    <a href="https://github.com/CodeTeng" @click.prevent="showInfo">点我提示信息</a>

    <!--组织事件冒泡（常用）-->
    <div class="demo1" @click="showInfo">
        <button @click.stop="showInfo">点我提示信息</button>
    </div>

    <!--事件只触发一次（常用）-->
    <button @click.once="showInfo">点我提示信息</button>

    <!--使用事件的捕获模式  打开控制台观察输出-->
    <!--捕获：从外到内    冒泡：从内到外-->
    <div class="box1" @click.capture="showMsg(1)">
        div1
        <div class="box2" @click="showMsg(2)">
            div2
        </div>
    </div>

    <div class="demo1" @click.self="showInfo">
        <button @click="showInfo">点我提示信息</button>
    </div>
</div>

    <script>
        new Vue({
            el: "#app",
            data() {
                return {
                    name: "Teng"
                }
            },
            methods: {
                showInfo(event) {
                    alert("同学你好！");
                },
                showMsg(msg) {
                    console.log(msg)
                }
            }
        })
    </script>
</body>
```

#### 1.7.3 键盘事件

键盘上的每个按键都有自己的名称和编码，例如：Enter（13）。而Vue还对一些常用按键起了别名方便使用

1. **Vue中常用的按键别名**
    1. 回车enter
    2. 删除delete捕获“删除”和“退格”键
    3. 退出esc
    4. 空格space
    5. **换行tab特殊，必须配合keydown去使用**
    6. 上up
    7. 下down
    8. 左left
    9. 右right
2. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（多单词小写短横线写法）

3. 系统修饰键（用法特殊）`ctrl` `alt` `shift` `meta`（meta就是win键）
    1. 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。指定 ctr+y 使用 @keyup.ctr.y
    2. 配合keydown使用：正常触发事件
4. 也可以使用keyCode去指定具体的按键（不推荐）
5. `Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名

```html
<div id="app">
    <!--keyup表示按下之后再松开 才触发-->
    <input type="text" placeholder="按下回车提示输入" @keyup.enter="showInfo"><br/>
    <!--keydown表示按下之后就触发-->
    <input type="text" placeholder="按下tab提示输入" @keydown.tab="showInfo"><br/>
    <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo"><br/>
</div>

<script>
    Vue.config.keyCodes.huiche = 13;    // 定义了一个别名按键
    new Vue({
        el: "#app",
        methods: {
            showInfo(event) {
                console.log(event.key, event.keyCode);
                console.log(event.target.value)
            }
        }
    })
</script>
```

## 2. Vue核心二

### 2.1 计算属性与监视

#### 2.1.1 计算属性

**插值语法实现**

```html
<div id="app">
    姓：<input type="text" v-model="firstName"><br/>
    名：<input type="text" v-model="lastName"><br/>
    全名：<span>{{firstName}}--{{lastName}}</span>
</div>
<script>
    new Vue({
        el: "#app",
        data() {
            return {
                firstName: "张",
                lastName: "三"
            }
        }
    })
</script>
```

![image-20220909123330319](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091233356.png)

**method实现**

```html
<div id="app">
    姓：<input type="text" v-model="firstName"><br/>
    名：<input type="text" v-model="lastName"><br/>
    全名：<span>{{fullName()}}</span>
</div>
<script>
    new Vue({
        el: "#app",
        data() {
            return {
                firstName: "张",
                lastName: "三"
            }
        },
        methods: {
            fullName() {
                return this.firstName + '-' + this.lastName;
            }
        }
    })
</script>
```

![image-20220909123527783](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091235821.png)

**computed计算属性**

- **定义：要用的属性不存在，需要通过已有属性计算得来**
- 原理：底层借助了`Objcet.defineproperty()`方法提供的`getter`和`setter`
- get函数什么时候执行？
    - **初次读取时会执行一次**
    - **当依赖的数据发生改变时会被再次调用**
- 优势：与methods实现相比，内部有**缓存机制**（复用），效率更高，调试方便 
- 备注
    - 计算属性最终会出现在vm上，直接读取使用即可
    - 如果计算属性要被修改，那必须写**set函数去响应修改**，且set中要引起计算时依赖的数据发生改变
    - 如果计算属性确定**不考虑修改，可以使用计算属性的简写形式**

```html
<div id="app">
    姓：<input type="text" v-model="firstName"><br/>
    名：<input type="text" v-model="lastName"><br/>
    <!--这里修改不会调用fullName的get方法-->
    测试：<input type="text" v-model="x"><br/>
    全名：<span>{{fullName}}</span><br/>
    全名：<span>{{fullName}}</span><br/>
    全名：<span>{{fullName}}</span><br/>
    全名：<span>{{fullName}}</span>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                firstName: "张",
                lastName: "三",
                x: "你好"
            }
        },
        computed: {
            // 全写
            // fullName: {
            //     // get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
            //     // get什么时候被调用？1.初次读取fullName的时候。2，所依赖的数据发生变化的时候
            //     get() {
            //         console.log("get被调用了");
            //         // console.log(this === vm);   // true
            //         return this.firstName + '-' + this.lastName;
            //     },
            //     // set什么时候调用？当fullName被修改时。
            //     set(value) {
            //         console.log('set', value);
            //         const arr = value.split('-')
            //         this.firstName = arr[0];
            //         this.lastName = arr[1];
            //     }
            // }
            
            // 简写
            fullName() {
                console.log("get被调用了");
                return this.firstName + '-' + this.lastName;
            }
        },
    })
</script>
```

修改一次调用一次。

![image-20220909125522500](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091255580.png)

#### 2.1.2 监听属性

```html
<div id="app">
    <h3>今天天气很{{info}}</h3>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    new Vue({
        el: "#app",
        data() {
            return {
                isHot: true,
            }
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽';
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot;
            }
        }
    })
</script>
```

![image-20220909130759937](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091307977.png)

##### 2.1.2.1 侦听属性基本用法

**watch监视属性**

1. 当被监视的属性变化时，**回调函数自动调用，进行相关操作**
2. 监视的属性必须存在，才能进行监视，**既可以监视data，也可以监视计算属性**
3. 配置项属性`immediate:false`，改为 true，则初始化时调用一次`handler(newValue,oldValue)`
4. 监视有两种写法
    1. 创建Vue时传入`watch: {}`配置
    2. 通过`vm.$watch()`监视

```html
<div id="app">
    <h3>今天天气很{{info}}</h3>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                isHot: true,
            }
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽';
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot;
            }
        },
        // 监视的第一种写法
        watch: {
            isHot: {
                // handler什么时候调用？当isHot发生改变时。
                handler(newValue, oldValue) {
                    console.log("isHot被修改了");
                    console.log(newValue, oldValue);
                },
                // 初始化时让handler调用一下 默认为false
                immediate: true,
            },
            // info: {
            //     handler(newValue, oldValue) {
            //         console.log("info被修改了");
            //         console.log(newValue, oldValue);
            //     },
            // }
        }
    });

    // 监视的第二种写法
    // vm.$watch('isHot', {
    //     handler(newValue, oldValue) {
    //         console.log("isHot被修改了");
    //         console.log(newValue, oldValue);
    //     },
    //     immediate: true,
    // })
</script>
```

![image-20220909132246899](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091322036.png)

##### 2.1.2.2 深度侦听

1. Vue中的watch默认不监测对象内部值的改变（一层）
2. 在watch中配置`deep:true`可以监测对象内部值的改变（多层）

注意

1. **Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以**
2. 使用watch时根据监视数据的具体结构，决定是否采用深度监视

```html
<div id="app">
    <h3>a的值是：{{numbers.a}}</h3>
    <button @click="numbers.a++">点我让a+1</button>
    <h3>b的值是：{{numbers.b}}</h3>
    <button @click="numbers.b++">点我让b+1</button>
    <button @click="numbers = {a:666,b:888}">彻底替换掉numbers</button>
    {{numbers.c.d.e}}
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                numbers: {
                    a: 1,
                    b: 1,
                    c: {
                        d: {
                            e: 100,
                        }
                    }
                }
            }
        },
        watch: {
            // 监视多级结构中某个属性的变化
            'numbers.a': {
                handler(newValue, oldValue) {
                    console.log("a被改变了")
                }
            },
            // 监视多级结构中所有属性的变化
            numbers: {
                deep: true,
                handler(newValue, oldValue) {
                    console.log("numbers改变了");
                }
            }
        }
    });
</script>
```

![image-20220909133624877](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091336975.png)

##### 2.1.2.3 监听属性简写

如果监视属性除了`handler`没有其他配置项的话，可以进行简写

```html
<div id="app">
    <h3>今天天气很{{info}}</h3>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                isHot: true,
            }
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽';
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot;
            }
        },
        watch: {
            // 正常写法
            // isHot: {
            //     handler(newValue, oldValue) {
            //         console.log("isHot被修改了");
            //         console.log(newValue, oldValue);
            //     },
            //     immediate: true,
            //     deep: true, //深度监视
            // },

            // 简写
            isHot(newValue, oldValue) {
                console.log("isHot被修改了", newValue, oldValue, this)
            }
        }
    });

    // 正常写法
    // vm.$watch('isHot', {
    //     handler(newValue, oldValue) {
    //         console.log("isHot被修改了");
    //         console.log(newValue, oldValue);
    //     },
    //     immediate: true,
    // })

    // 简写
    // vm.$watch('isHot', (newValue, oldValue) => {
    //     console.log('isHot被修改了', newValue, oldValue, this);
    // })
</script>
```

![image-20220909134111869](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209091341024.png)

##### 2.1.2.4 计算属性 VS 侦听属性

computed和watch之间的区别

- computed能完成的功能，watch都可以完成
- watch能完成的功能，computed不一定能完成，例如watch可以进行异步操作

两个重要的小原则

所有**被Vue管理的函数**，最好写成**普通函数**，这样this的指向才是vm或组件实例对象

所有**不被Vue所管理的函数**（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成**箭头函数**，这样this的指向才是

vm或组件实例对象

### 2.2 绑定样式与条件渲染

#### 2.2.1 绑定样式

**class样式**

- 写法：`:class="xxx"`，xxx可以是字符串、数组、对象
- `:style="[a,b]"`其中a、b是样式对象
- `:style="{fontSize: xxx}"`其中xxx是动态值

字符串写法适用于：类名不确定，要动态获取 

数组写法适用于：要绑定多个样式，个数不确定，名字也不确定 

对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绑定样式</title>
    <script src="js/vue.js"></script>
    <style>
        .basic {
            width: 300px;
            height: 50px;
            border: 1px solid black;
        }

        .happy {
            border: 3px solid red;
            background-color: rgba(255, 255, 0, 0.644);
            background: linear-gradient(30deg, yellow, pink, orange, yellow);
        }

        .sad {
            border: 4px dashed rgb(2, 197, 2);
            background-color: skyblue;
        }

        .normal {
            background-color: #bfa;
        }

        .Teng1 {
            background-color: yellowgreen;
        }

        .Teng2 {
            font-size: 20px;
            text-shadow: 2px 2px 10px red;
        }

        .Teng3 {
            border-radius: 20px;
        }
    </style>
</head>
<body>
<div id="app">
    <!--绑定class样式---字符串写法，适用于：样式的类名不确定，需要动态指定-->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
    <br/>
    <!--绑定class样式---数组写法，适用于：要绑定的样式个数不确定、名字也不确定-->
    <div class="basic" :class="classArr">{{name}}</div>
    <br/>
    <!--绑定class样式---对象写法，适用于：要绑定的样式个数确定、名字也确定、但要动态决定用不用-->
    <div class="basic" :class="classObj">{{name}}</div>
    <br/>
    <!--绑定style样式---对象写法-->
    <div class="basic" :style="styleObj">{{name}}</div>
    <br/>
    <!--绑定style样式---数组写法-->
    <div class="basic" :style="styleArr">{{name}}</div>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            name: "Teng",
            mood: 'normal',
            classArr: ['Teng1', 'Teng2', 'Teng3'],
            classObj: {
                teng1: false,
                teng2: false,
            },
            styleObj: {
                fontsize: '40px',
                color: 'red',
            },
            styleObj2: {
                backgroundColor: 'orange'
            },
            styleArr: [
                {
                    fontsize: '40px',
                    color: 'blue',
                },
                {
                    backgroundColor: 'gray'
                }
            ]
        },
        methods: {
            changeMood() {
                const arr = ['happy', 'sad', 'normal'];
                const index = Math.floor(Math.random() * 3);
                this.mood = arr[index];
            }
        }
    })
</script>

</body>
</html>
```

#### 2.2.2 条件渲染

**v-if**

写法跟if else语法类似，`v-if="表达式"`，`v-else-if="表达式"`，`v-else`

适用于：切换频率较低的场景，因为不展示的DOM元素直接被移除

注意：`v-if`可以和`v-else-if` `v-else`一起使用，但要求结构不能被打断

**v-show**

写法：`v-show="表达式"`

适用于：切换频率较高的场景

特点：不展示的DOM元素未被移除，仅仅是**使用样式隐藏掉display: none**

**备注**：使用`v-if`的时，元素可能无法获取到，而使用`v-show`一定可以获取到

template标签不影响结构，页面html中不会有此标签，但只能配合v-if，不能配合v-show

```html
<div id="app">
    <h2>当前的n值是：{{n}}</h2>
    <button @click="n++">点我n+1</button>

    <!--使用v-show做条件渲染-->
<!--    <h2 v-show="false">欢迎来到{{name}}</h2>-->
<!--    <h2 v-show="1 === 1">欢迎来到{{name}}</h2>-->

    <!--使用v-if做条件渲染-->
<!--    <h2 v-if="false">欢迎来到{{name}}</h2>-->
<!--    <h2 v-if="1 === 1">欢迎来到{{name}}</h2>-->

    <!--v-else和v-else-if-->
    <div v-show="n === 1">Angular</div>
    <div v-show="n === 2">React</div>
    <div v-show="n === 3">Vue</div>

    <div v-if="n === 1">Angular</div>
    <div v-else-if="n === 2">React</div>
    <div v-else-if="n === 3">Vue</div>
    <div v-else>哈哈</div>

    <!--v-if与template的配合使用-->
    <template v-if="n === 1">
        <h3>你好</h3>
    </template>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el: "#app",
        data: {
            name: "Teng",
            n: 0
        }
    });
</script>
```

### 2.3 列表渲染与数据监视

#### 2.3.1 列表渲染

##### 2.3.1.1 基本列表

`v-for`指令

用于展示列表数据

语法：`<li v-for="(item, index) of items" :key="index">`，这里key可以是index，更好的是遍历对象的唯一标识

可遍历：数组、对象、字符串（用的少）、指定次数（用的少）

```html
<div id="app">
    <!--遍历数组-->
    <h3>人员列表</h3>
    <ul>
        <li v-for="(item, index) of persons" :key="index">{{item.name}}--{{item.age}}</li>
    </ul>

    <!--遍历对象-->
    <h3>汽车信息</h3>
    <ul>
        <li v-for="(item,index) of car" :key="index">{{index}}--{{item}}</li>
    </ul>

    <!--遍历字符串-->
    <h3>测试遍历字符串</h3>
    <ul>
        <li v-for="(item,index) of str" :key="index">{{item}}--{{index}}</li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el: "#app",
        data: {
            persons: [
                {id: '001', name: '张三', age: 18},
                {id: '002', name: '李四', age: 19},
                {id: '003', name: '王五', age: 20},
            ],
            car: {
                name: '玛莎拉蒂',
                price: '100w',
                color: '白色'
            },
            str: 'Hello'
        }
    })
</script>
```

![image-20220909214840873](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209092148921.png)

##### 2.3.1.2 key的作用与原理

开发中如何选择key？

- **最好使用每条数据的唯一标识作为key**，比如 id、手机号、身份证号、学号等唯一值
- 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表，使用index作为key是没有问题的

##### 2.3.1.3 列表过滤

```html
<div id="app">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
        <li v-for="(item,index) of filPersons" :key="index">{{item.name}}--{{item.age}}--{{item.sex}}</li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;
    // 用watch实现
    // new Vue({
    //     el: "#app",
    //     data: {
    //         keyWord: '',
    //         persons: [
    //             {id: '001', name: '马冬梅', age: 18, sex: '女'},
    //             {id: '002', name: '周冬雨', age: 19, sex: '女'},
    //             {id: '003', name: '周杰伦', age: 20, sex: '男'},
    //             {id: '004', name: '温兆伦', age: 21, sex: '男'},
    //         ],
    //         filPersons: []
    //     },
    //     watch: {
    //         keyWord: {
    //             immediate: true,
    //             handler(newValue) {
    //                 this.filPersons = this.persons.filter((p) => {
    //                     return p.name.indexOf(newValue) !== -1;
    //                 })
    //             }
    //         }
    //     }
    // })

    // 用computed实现
    new Vue({
        el: "#app",
        data: {
            keyWord: '',
            persons: [
                {id: '001', name: '马冬梅', age: 18, sex: '女'},
                {id: '002', name: '周冬雨', age: 19, sex: '女'},
                {id: '003', name: '周杰伦', age: 20, sex: '男'},
                {id: '004', name: '温兆伦', age: 21, sex: '男'},
            ],
        },
        computed: {
            filPersons() {
                return this.persons.filter((p) => {
                    return p.name.indexOf(this.keyWord) !== -1;
                })
            }
        }
    })
</script>
```

##### 2.3.1.4 列表排序

```html
<div id="app">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <button @click="sortType === 2">年龄升序</button>
    <button @click="sortType === 1">年龄降序</button>
    <button @click="sortType === 0">原顺序</button>
    <ul>
        <li v-for="(item,index) of filPersons" :key="item.id">{{item.name}}--{{item.age}}--{{item.sex}}</li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;

    new Vue({
        el: "#app",
        data: {
            keyWord: '',
            sortType: 0, // 0原顺序 1：降序 2：升序
            persons: [
                {id: '001', name: '马冬梅', age: 18, sex: '女'},
                {id: '002', name: '周冬雨', age: 28, sex: '女'},
                {id: '003', name: '周杰伦', age: 30, sex: '男'},
                {id: '004', name: '温兆伦', age: 31, sex: '男'},
            ],
        },
        computed: {
            filPersons() {
                const arr = this.persons.filter((p) => {
                    return p.name.indexOf(this.keyWord) !== -1;
                });
                // 判断是否需要进行排序
                if (this.sortType) {
                    arr.sort((p1, p2) => {
                        return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
                    })
                }
                return arr;
            }
        }
    })
</script>
```

#### 2.3.2 数据监视

**模拟一个小问题**

```html
<div id="app">
    <button @click="updateMei">更新马冬梅信息</button>
    <ul>
        <li v-for="(item,index) of persons" :key="item.id">
            {{item.name}}--{{item.age}}--{{item.sex}}
        </li>
    </ul>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            persons: [
                {id: '001', name: '马冬梅', age: 18, sex: '女'},
                {id: '002', name: '周冬雨', age: 28, sex: '女'},
                {id: '003', name: '周杰伦', age: 30, sex: '男'},
                {id: '004', name: '温兆伦', age: 31, sex: '男'},
            ]
        },
        methods: {
            updateMei() {
                //this.persons[0].name = '马老师';   //生效
                //this.persons[0].age = 50;   //生效
                //this.persons[0].sex = '男';  //生效
                //this.persons[0] = {id: '001', name: '马老师', age: 50,sex: '男'};   //不生效
                this.persons.splice(0, 1, {id: '001', name: '马老师', age: 50, sex: '男'});
            }
        }
    })
</script>
```

**数据监听原理**

1. **vue会监视data中所有层次的数据**

2. 如何监测对象中的数据？ 

    通过`setter`实现监视，且要在`new Vue()`时就传入要监测的数据 

    对象创建后追加的属性，Vue默认不做响应式处理

    如需给后添加的属性做响应式，请使用如下API

    `Vue.set(target,propertyName/index,value)`

    `vm.$set(target,propertyName/index,value)`\

3. 如何监测数组中的数据？ 

    通过包裹数组更新元素的方法实现，本质就是做了两件事

    - 调用原生对应的方法对数组进行更新
    - 重新解析模板，进而更新页面

4. 在Vue修改数组中的某个元素一定要用如下方法 
    `push()` `pop()` `unshift()` `shift()` `splice()` `sort()` `reverse()`这几个方法被Vue重写了Vue.set()或vm.$set()

**特别注意：Vue.set() 和 vm.$set() 不能给vm或vm的根数据对象（data等）添加属性**

```html
<div id="app">
    <h1>学生信息</h1>
    <button @click="student.age++">年龄+1岁</button>
    <br/>
    <button @click="addSex">添加性别属性，默认值：男</button>
    <br/>
    <button @click="student.sex = '未知'">修改性别</button>
    <br/>
    <button @click="addFriend">在列表中添加一个朋友</button>
    <br/>
    <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button>
    <br/>
    <button @click="addHobby">添加一个爱好</button>
    <br/>
    <button @click="updateHobby">修改第一个爱好为：开车</button>
    <br/>
    <button @clickr="removeSmoke">过滤掉爱好中的抽烟</button>
    <br/>
    <h3>姓名：{{student.name}}</h3><br/>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
        <li v-for="(item,index) in student.hobby" :key="index">{{item}}</li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
        <li v-for="(item, index) in student.friends" :key="index">{{item.name}}--{{item.age}}</li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            student: {
                name: 'tom',
                age: 18,
                hobby: ['抽烟', '喝酒', '烫头'],
                friends: [
                    {name: 'jerry', age: 35},
                    {name: 'tony', age: 36}
                ]
            }
        },
        methods: {
            addSex() {
                //Vue.set(this.student, 'sex', '男')
                this.$set(this.student, 'sex', '男');
            },
            addFriend() {
                this.student.friends.unshift({name: 'jack', age: 70});
            },
            updateFirstFriendName() {
                this.student.friends[0].name = '张三';
            },
            addHobby() {
                this.student.hobby.push('学习');
            },
            updateHobby() {
                this.$set(this.student.hobby, 0, '开车');
            },
            removeSmoke() {
                this.student.hobby = this.student.hobby.filter((h)=>{
                    return h !== '抽烟';
                })
            }
        }
    })
</script>
```

### 2.4 收集表单数据与过滤器

#### 2.4.1 收集表单数据

收集表单数据

- 若`<input type="text"/>`，则`v-model`收集的是`value`值，用户输入的内容就是`value`值

- 若`<input type="radio"/>`，则`v-model`收集的是`value`值，且要给标签配置`value`属性
- 若`<input type="checkbox"/>` 
    - 没有配置`value`属性，那么收集的是`checked`属性（勾选 or 未勾选，是布尔值）
    - 配置了`value`属性
        - `v-model`的初始值是**非数组**，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）
        - `v-model`的初始值是**数组**，那么收集的就是`value`组成的数组
- `v-model`的三个修饰符
    - `lazy`	**失去焦点后再收集数据**
    - `number` **输入字符串转为有效的数字**
    - `trim`	**输入首尾空格过滤**

```html
<div id="app">
    <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account"><br/>
        密码：<input type="password" v-model="userInfo.password"><br/>
        年龄：<input type="number" v-model.number="userInfo.age"><br/>
        性别：
        男：<input type="radio" name="sex" v-model="userInfo.sex" value="male">
        女：<input type="radio" name="sex" v-model="userInfo.sex" value="female"><br/>
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
        <br/>
        所属校区
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="henan">河南</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
        </select>
        <br/>
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea><br/>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受
        <a href="https://github.com/CodeTeng">《用户协议》</a>
        <button>提交</button>
    </form>
</div>
<script>
    Vue.config.productionTip = false;

    new Vue({
        el: "#app",
        data: {
            userInfo: {
                account: '',
                password: '',
                age: '',
                sex: 'female',
                hobby: [],
                city: '',
                other: '',
                agree: ''
            }
        },
        methods: {
            demo() {
                console.log(JSON.stringify(this.userInfo));
            }
        }
    })
</script>
```

![image-20220910110358489](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101104630.png)

#### 2.4.2 过滤器(Vue3已经移除)

定义：**对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）**

注册过滤器：

- `Vue.filter(name, callback)` 全局过滤器
- `new Vue {filters: {}}` 局部过滤器

使用过滤器：`{{ xxx | 过滤器名}}` 或 `v-bind:属性 = "xxx | 过滤器名"` 

备注：

- 过滤器可以接收额外参数，多个过滤器也可以串联
- 并没有改变原本的数据，而是产生新的对应的数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>过滤器</title>
    <script src="js/vue.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js"></script>
</head>
<body>
<div id="app">
    <h2>时间</h2>
    <h3>当前时间戳：{{time}}</h3>
    <h3>转换后的时间：{{time | timeFormater()}}</h3>
    <h3>转换后时间：{{time | timeFormater('YYYY-MM-DD HH:mm:ss')}}</h3>
    <h3>截取年月日：{{time | timeFormater() | mySlice}}</h3>
</div>
<script>
    Vue.config.productionTip = false;
    // 全局过滤器
    Vue.filter('mySlice', (value) => {
        return value.slice(0, 11);
    })
    new Vue({
        el: "#app",
        data: {
            time: 1662781402,
        },
        // 局部过滤器
        filters: {
            timeFormater(value, str = "YYYY年MM月DD日 HH:mm:ss") {
                return dayjs(value).format(str)
            }
        }
    })
</script>
</body>
</html>
```

![image-20220910114507487](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101145544.png)

### 2.5 内置指令与自定义指令

#### 2.5.1 内置指令

之前学过的指令： 

`v-bind`	单向绑定解析表达式，可简写为`:`

`v-model`	双向数据绑定

`v-for`		遍历数组 / 对象 / 字符串

`v-on`		绑定事件监听，可简写为`@`

`v-show`	条件渲染 (动态控制节点是否展示)

`v-if`		条件渲染（动态控制节点是否存存在）

`v-else-if`	条件渲染（动态控制节点是否存存在）

`v-else`	条件渲染（动态控制节点是否存存在）

##### 2.5.1.1 v-text指令

v-text指令

作用：**向其所在的节点中渲染文本内容** 

与插值语法的区别：v-text会替换掉节点中的内容，{{xxx}}则不会，更灵活

```html
<div id="app">
    <div>你好，{{name}}</div>
    <div v-text="name">你好，</div>
    <div v-text="str"></div>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            name: "Teng",
            str: '<h3>你好！</h3>'
        }
    })
</script>
```

![image-20220910115606101](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101156142.png)

##### 2.5.1.2 v-html指令

`v-html`指令

作用：**向指定节点中渲染包含html结构的内容** 

与插值语法的区别： 

- `v-html`会替换掉节点中所有的内容，`{{xxx}}`则不会
- `v-html`可以识别`html`结构

严重注意`v-html`有安全性问题！！！ 

- 在网站上动态渲染任意html是非常危险的，容易导致XSS攻击

- 一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上！！！

```html
<div id="app">
    <div>你好，{{name}}</div>
    <div v-html="str"></div>
    <div v-html="str2"></div>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            name: "Teng",
            str: "<h3>你好！</h3>",
            str2: '<a href="https://github.com/CodeTeng/">兄弟我找到你想要的资源了！</a>'
        }
    })
</script>
```

![image-20220910120233900](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101202943.png)

##### 2.5.1.3 v-cloak指令

`v-cloak`指令（没有值）

- 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性

- 使用`css`配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`的问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-cloak</title>
    <script src="../js/vue.js"></script>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div id="app">
    <h2 v-cloak>{{name}}</h2>
</div>
<!--延迟5s收到vue.js-->
<!--<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>-->
<script>
    new Vue({
        el: "#app",
        data: {
            name: "Teng"
        }
    })
</script>
</body>
</html>
```

##### 2.5.1.4 v-once指令

`v-once`所在节点在初次动态渲染后，就视为**静态内容**了 

以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能

```html
<div id="app">
    <h2 v-once>初始化的n的值是：{{n}}</h2>
    <h2>当前的n的值是：{{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el: "#app",
        data: {
            n: 1,
        }
    })
</script>
```

![image-20220910122836201](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101228245.png)

##### 2.5.1.5 v-pre指令

跳过`v-pre`所在节点的编译过程

可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

```html
<div id="app">
    <h2 v-pre>Vue其实很简单</h2>
    <h2>当前的n值是：{{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            n: 1,
        }
    })
</script>
```

#### 2.5.2 自定义指令

**directives**

定义语法

1. 局部指令

```js
new Vue({
    directives: {
        指令名：配置对象
    }
})

new Vue({
    directives: {
        指令名：回调函数
    }
})
```

2. 回调函数

```js
Vue.directive(指令名, 配置对象)
或
Vue.directive(指令名, 回调函数)

Vue.directives('fbind', {
    // 指令与元素成功绑定时（一上来）
    bind(element, binding) { // element就是DOM元素，binding就是要绑定的
        element.value = binding.value;
    },
    // 指令所在元素被插入页面时
    inserted(element, binding) {
        element.focus();
    },
    // 指令所在的模板被重新解析时
    update(element, binding) {
        element.value = binding.value;
    }
})
```

配置对象中常用的3个回调函数 

- `bind(element, binding)`	 指令与元素成功绑定时调用
- `inserted(element, binding)` 指令所在元素被插入页面时调用
- `update(element, binding)`	 指令所在模板结构被重新解析时调用

**element就是DOM元素，binding就是要绑定的对象**，它包含以下属性：`name` `value` `oldValue` `expression` `arg` `modifiers`

备注

- **指令定义时不加v-，但使用时要加v-**
- 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名  

```html
<div id="app">
    请输入内容：<input v-focus type="text">
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            n: 1,
        },
        directives: {
            focus: {
                inserted(element) {
                    element.focus();
                }
            }
        }
    })
</script>
```

会被自动的聚焦到输入框

### 2.6 Vue声明周期

#### 2.6.1 引出声明周期

生命周期

- 又名生命周期回调函数、生命周期函数、生命周期钩子
- 是什么：Vue在**关键时刻帮我们调用的一些特殊名称的函数**
- **生命周期函数的名字不可更改**，但函数的具体内容是程序员根据需求编写的
- 生命周期函数中的`this`**指向是vm或组件实例对象**

```html
<div id="app">
    <h2 :style="{opacity}">欢迎学习Vue</h2>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            opacity: 1
        },
        methods: {},
        // 挂载 Vue完成模板的解析并把初始的真实DOM元素放入页面后调用mounted()
        mounted() {
            console.log(this);
            setInterval(() => {
                this.opacity -= 0.01;
                if (this.opacity <= 0) this.opacity = 1
            }, 16);
        }
    });

    // 同步外部的定时器实现（不推荐）
    /*setInterval(() => {
        vm.opacity -= 0.01;
        if (vm.opacity <= 0) vm.opacity = 1
    }, 16);*/
</script>
```

![效果.gif](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101544976.gif)

#### 2.6.2 分析声明周期

![life.png](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101439189.png)

```html
<div id="app">
    <h2 v-text="n"></h2>
    <h2>当前的n值是：{{n}}</h2>
    <button @click="add">点我n+1</button>
    <button @click="bye">点我销毁vm</button>
</div>
<script>
    new Vue({
        el: "#app",
        // template: '<div><h2>当前的n值是：{{n}}</h2><button @click="add">点我n+1</button></div>',
        data: {
            n: 1,
        },
        methods: {
            add() {
                console.log("add");
                this.n++;
            },
            bye() {
                this.$destroy();
                console.log("bye");
            }
        },
        watch: {
            n() {
                console.log("n变了");
            }
        },
        beforeCreate() {
            console.log("beforeCreate");
            // console.log(this);
            // debugger;
        },
        created() {
            console.log("created");
            // console.log(this);
            // debugger;
        },
        beforeMount() {
            console.log("beforeMount");
            // console.log(this);
            // document.querySelector("h2").innerText = "123";
            // debugger;
        },
        mounted() {
            console.log("mounted");
            // console.log(this);
            // debugger;
        },
        beforeUpdate() {
            console.log("beforeUpdate");
            // console.log(this.n);
            // debugger;
        },
        updated() {
            console.log("updated");
            // console.log(this.n);
            // debugger;
        },
        beforeDestroy() {
            console.log("beforeDestroy");
            // console.log(this.n);
            // this.n = 99;   //不生效
        },
        destroyed() {
            console.log("destroyed");
        }
    })
</script>
```

#### 2.6.3 总结声明周期

常用的生命周期钩子

- `mounted` 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等初始化操作 
- `beforeDestroy` 清除定时器、解绑自定义事件、取消订阅消息等收尾工作 

关于销毁Vue实例

- 销毁后借助Vue开发者工具看不到任何信息
- 销毁后自定义事件会失效，但原生DOM事件依然有效
- 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了

```html
<div id="app">
    <h2 :style="{opacity}">欢迎学习Vue</h2>
    <button @click="opacity = 1">透明度设置为1</button>
    <button @click="stop">点我彻底停止变换</button>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            opacity: 1
        },
        methods: {
            stop() {
                this.$destroy();
            }
        },
        mounted() {
            console.log(this);
            this.timer = setInterval(() => {
                this.opacity -= 0.01;
                if (this.opacity <= 0) this.opacity = 1
            }, 16);
        },
        beforeDestroy() {
            clearInterval(this.timer);
            console.log("vm即将死亡");
        }
    });
</script>
```

## 3. Vue组件化编程

### 3.1 模块与组件、模块化与组件化

![image-20220910161417779](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101614034.png)

![image-20220910161431281](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101614474.png)

**模块**

- 理解：向外提供特定功能的js程序，一般就是一个js文件
- 为什么：js文件很多很复杂
- 作用：复用、简化js的编写，提高js运行效率

**组件**

- 定义：用来实现局部功能的代码和资源的集合（html/css/js/image…）
- 为什么：一个界面的功能很复杂
- 作用：复用编码，简化项目编码，提高运行效率

**模块化**

- 当应用中的js都以模块来编写的，那这个应用就是一个模块化的应用

组件化

- 当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

### 3.2 非单文件使用

**非单文件组件：一个文件中包含有n个组件**

**单文件组件：一个文件中只包含有1个组件**

#### 3.2.1 基本使用

Vue中使用组件的三大步骤 

1. **定义组件**

    使用`Vue.extend(options)`创建，其中`options`和`new Vue(options)`时传入的`options`几乎一样，但也有点区别

    - `el`不要写，因为最终所有的组件都要经过一个`vm`的管理，由`vm`中的`el`才决定服务哪个容器
    - `data`必须写成**函数**，避免组件被复用时，数据存在引用关系

2. **注册组件**

    - 局部注册：`new Vue()`的时候`options`传入`components`选项
    - 全局注册：`Vue.component('组件名',组件)`

3. **使用组件**

    编写组件标签如` <school></school>`

```html
<div id="app">
    <h2>{{msg}}</h2><br/>
    <!--第三步：编写组件标签-->
    <school></school>
    <student></student>
    <hello></hello>
</div>

<div id="app2">
    <!--由于是全局注册的组件，所以可以使用-->
    <hello></hello>
</div>
<script>
    Vue.config.productionTip = false;
    // 第一步：创建school组件
    const school = Vue.extend({
        // el: "#app", 定义组件的时候，一定不要写el配置项
        // 因为最终所有的组件都要被一个vm管理，由vm决定服务哪个容器
        template: '<div class="demo"><h3>学校名称：{{schoolName}}</h3><h3>学校地址：{{address}}<br/><button @click="showName">点我提示学校名</button></h3></div>',
        data() {
            return {
                schoolName: "CQJTU",
                address: "重庆南岸"
            }
        },
        methods: {
            showName() {
                alert(this.schoolName);
            }
        },
    });

    // 创建student组件
    const student = Vue.extend({
        template: '<div><h3>学生姓名：{{studentName}}</h3><h3>学生年龄：{{age}}</h3></div>',
        data() {
            return {
                studentName: '张三',
                age: 18,
            }
        }
    });

    // 创建hello组件
    const hello = Vue.extend({
        template: '<div><h3>你好啊！{{name}}</h3></div>',
        data() {
            return {
                name: "Teng",
            }
        }
    });

    // 第二部：全局注册组件
    Vue.component('hello', hello);

    // 创建vm
    new Vue({
        el: "#app",
        data: {
            msg: "你好！",
        },
        // 第二步：注册组件(局部注册)
        components: {
            school,
            student,
        }
    });

    new Vue({
        el: "#app2",
    })
</script>
```

 ![image-20220910163255630](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101632697.png)

#### 3.2.2 组件注意事项

**关于组件名**

- 一个单词组成
    - 第一种写法（首字母小写）：school
    - 第二种写法（首字母大写）：School
- 多个单词组成
    - 第一种写法（kebab-case 命名）：my-school
    - 第二种写法（CamelCase 命名）：MySchool（需要Vue脚手架支持）
- 备注
    - 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行
    - 可以使用`name`配置项指定组件在开发者工具中呈现的名字

**关于组件标签** 

- 第一种写法：`<school></school>`
- 第二种写法：`<school/>`（需要Vue脚手架支持）
- 备注：不使用脚手架时，`<school/>`会导致后续组件不能渲染

一个简写方式：`const school = Vue.extend(options)`可简写为`const school = options`，因为父组件`components`引入的时候会

自动创建

```html
<div id="app">
    <h2>{{msg}}</h2>
    <school></school>
</div>
<script>
    // 定义组件
    const school = Vue.extend({
        name: 'school', // 组件给自己起个名字，用于在浏览器开发工具上显示
        template: `
            <div>
                <h3>学校名称：{{name}}</h3>
                <h3>学校地址：{{address}}</h3>
            </div>
        `,
        data() {
            return {
                name: "CQJTU",
                address: "重庆",
            }
        }
    })

    new Vue({
        el: "#app",
        data: {
            msg: "欢迎学习Vue！",
        },
        components: {
            school,
        }
    })
</script>
```

#### 3.2.3 组件的嵌套

![image-20220910164007268](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101640485.png)

```html
<div id="root"></div>
<script>
    const student = Vue.extend({
        name: "student",
        template: `
          <div>
          <h4>学生姓名：{{ name }}</h4>
          <h4>学生年龄：{{ age }}</h4>
          </div>
        `,
        data() {
            return {
                name: "Teng",
                age: 20,
            }
        }
    });

    const school = Vue.extend({
        name: 'school',
        template: `
          <div>
          <h3>学校名称：{{ name }}</h3>
          <h3>学校地址：{{ address }}</h3>
          <student></student>
          </div>
        `,
        data() {
            return {
                name: "CQJTU",
                address: "重庆",
            }
        },
        // 注册组件（局部）
        components: {
            student,
        }
    });

    // 定义hello组件
    const hello = Vue.extend({
        template: `<h3>{{ msg }}</h3>`,
        data() {
            return {
                msg: '欢迎进行学习！！！',
            }
        }
    });

    // 定义app组件
    const app = Vue.extend({
        template: `
          <div>
          <hello></hello>
          <school></school>
          </div>
        `,
        components: {
            hello,
            school,
        }
    })

    // 创建vm
    new Vue({
        el: "#root",
        template: `
          <app></app>`,
        // 注册组件（局部注册）
        components: {
            app,
        }
    })
</script>
```

![image-20220910164806924](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101648025.png)

#### 3.2.4 VueComponent

关于`VueComponent`

- **school组件本质**是一个名为**`VueComponent`的构造函数**，且不是程序员定义的，而是`Vue.extend()`生成的 

- 我们只需要写`<school/>`或`<school></school>`，**Vue解析时会帮我们创建`school`组件的实例对象**，**即`Vue`帮我们执行的new** 

    **`VueComponent(options) `**

- 每次调用`Vue.extend`，返回的都是一个全新的`VueComponent`，即不同组件是不同的对象

- 关于`this`指向 

    - **组件配置**中`data`函数、`methods`中的函数、`watch`中的函数、`computed`中的函数，它们的`this`均是**`VueComponent`实例对象**

    - `new Vue(options)`配置中：`data`函数、`methods`中的函数、`watch`中的函数、`computed`中的函数，它们的`this`均是**`Vue`实**

        **例对象**

- `VueComponent`的实例对象，以后简称`vc（组件实例对象）`   `Vue`的实例对象，以后简称`vm`  

```html
<div id="root">
    <school></school>
    <hello></hello>
</div>
<script>
    const school = Vue.extend({
        name: "school",
        template: `
          <div>
          <h2>学校名称：{{ name }}</h2>
          <h2>学校地址：{{ address }}</h2>
          <button @click="showName">点我提示学校名</button>
          </div>
        `,
        data() {
            return {
                name: "CQJTU",
                address: "重庆市南岸",
            }
        },
        methods: {
            showName() {
                // 组件中的this指的是VueComponent
                console.log('showName', this);
            }
        }
    });

    const test = Vue.extend({
        template: '<span>cqjtu</span>'
    })

    const hello = Vue.extend({
        template: `
          <div>
          <h2>{{ msg }}</h2>
          <test></test>
          </div>
        `,
        data() {
            return {
                msg: "你好！",
            }
        },
        components: {
            test,
        }
    });

    console.log('@', school);
    console.log('#', hello);

    const vm = new Vue({
        el: "#root",
        components: {
            school,
            hello
        }
    })
</script>
```

#### 3.2.5 一个重要的内置关系

![image-20220910170309995](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101703328.png)

一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`

为什么要有这个关系：**让组件实例对象vc可以访问到Vue原型上的属性、方法**

```html
<div id="root">
    <school></school>
</div>
<script>
    Vue.prototype.x = 99;
    const school = Vue.extend({
        name: 'school',
        template: `
          <div>
          <h3>学校名称：{{ name }}</h3>
          <h3>学校地址：{{ address }}</h3>
          <button @click="showX">点我输出x</button>
          </div>
        `,
        data() {
            return {
                name: "CQJTU",
                address: "重庆",
            }
        },
        methods: {
            showX() {
                // 能输出x
                console.log(this.x);
            }
        }
    });

    const vm = new Vue({
        el: "#root",
        data: {
            msg: "你好！"
        },
        components: {
            school
        }
    });
    console.log(vm);
    console.log(school.prototype.__proto__ === Vue.prototype);  // true
</script>
```

![image-20220910180200224](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209101802321.png)

### 3.3 单文件组件

`School.vue`

```vue
<template>
  <div id="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">点我提示学校名字</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "CQJTU",
      address: "重庆市南岸区",
    }
  },
  methods: {
    showName() {
      alert(this.name);
    }
  }
}
</script>

<style scoped>
  #demo {
    background: skyblue;
  }
</style>
```

`Student.vue`

```vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "Teng",
      age: 20,
    }
  }
}
</script>

<style scoped>

</style>
```

`App.vue`

```vue
<template>
  <div>
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
// 引入组件
import School from "./School";
import Student from "./Student";

export default {
  name: "App",
  components: {
    School,
    Student
  }
}
</script>

<style scoped>

</style>
```

`main.js`

```js
import App from "./App";

new Vue({
    el: "#root",
    // template: "<App></App>",
    components: {
        App,
    }
})
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单文件组件</title>
</head>
<body>
<!--准备一个容器-->
<div id="root">
    <App></App>
</div>
<script src="../js/vue.js"></script>
<script src="main.js"></script>
</body>
</html>
```

上述最终的代码无法运行是由于浏览器不支持ES6的语法，但上述是Vue脚手架的大致模块。放在脚手架中即可运行。

## 4. Vue-CLI脚手架

### 4.1 初始化脚手架

#### 4.1.1 说明

1. Vue脚手架是Vue官方提供的标准化开发工具（开发平台）
2. 最新的版本是 4.x
3. 文档 [Vue CLI](https://cli.vuejs.org/zh/)

#### 4.1.2 具体步骤

1. 如果下载缓慢请配置`npm`淘宝镜像`npm config set registry http://registry.npm.taobao.org`
2. 全局安装`@vue/cli` `npm install -g @vue/cli`
3. 切换到创建项目的目录，使用命令创建项目`vue create xxx`
4. 选择使用`vue`的版本
5. 启动项目`npm run serve`
6. 打包项目`npm run build`
7. 暂停项目`Ctrl+C`

> Vue脚手架隐藏了所有webpack相关的配置，若想查看具体的webpack配置，请执行`vue inspect > output.js`

#### 4.1.3 脚手架文件结构

```markdown
.文件目录
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   └── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
└── package-lock.json: 包版本控制文件
```

然后将上次写过的单文件中的组件让如脚手架中

结果如下如图所示

![image-20220911004520407](https://teng-1310538376.cos.ap-chongqing.myqcloud.com/3718/202209110045594.png)

#### 4.1.4 render函数

```js
// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件

Vue.config.productionTip = false

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
    // render函数完整版
    // render(createElement) {
    //     return createElement('h1', '你好啊')
    // }
}).$mount('#app')
```

#### 4.1.5 关于不同版本的函数

1. `vue.js`与`vue.runtime.xxx.js`的区别 

    - `vue.js`是完整版的`Vue`，包含：**核心功能+模板解析器**
    - `vue.runtime.xxx.js`是运行版的`Vue`，**只包含核心功能，没有模板解析器**
    - `esm`就是`ES6 module`

2. 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用`template`配置项，需要使用`render`函数接收到的`createElement`函数

    去指定具体内容

#### 4.1.6 vue.config.js配置文件

`vue inspect > output.js`可以查看到Vue脚手架的默认配置

使用`vue.config.js`可以对脚手架进行个性化定制，和`package.json`同级目录，详见 [配置参考 | Vue CLI](https://cli.vuejs.org/zh/config/#vue-config-js)

```js
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,  // 关闭语法检查
})
```

### 4.2 ref props mixin plugin scoped



### 4.3 Todo-List案例



### 4.4 本地存储与自定义事件



### 4.5 全局事件总线与消息的订阅与发布



### 4.6 $nextTick与过渡与动画
