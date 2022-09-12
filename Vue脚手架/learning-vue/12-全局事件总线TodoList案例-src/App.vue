<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"/>
        <List :todos="todos"/>
        <MyFooter :todos="todos"
                  @checkAllTodo="checkAllTodo"
                  @clearAllTodo="clearAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import List from "@/components/List";

export default {
  name: 'App',
  components: {MyHeader, MyFooter, List},
  data() {
    return {
      // 从本地存储中获得数据，null就创建空数组[]
      todos: JSON.parse(localStorage.getItem("todos")) || []
    }
  },
  methods: {
    // 添加一个todo
    addTodo(todoObj) {
      // console.log("我是APP组件，我收到了数据", todoObj);
      this.todos.unshift(todoObj)
    },
    // 勾选or取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      })
    },
    // 删除一个todo
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    // 全选or取消全选
    checkAllTodo(done) {
      this.todos.forEach(todo => todo.done = done)
    },
    // 清除所有已经完成的todo
    clearAllTodo() {
      if (confirm("确定要清除吗？")) this.todos = this.todos.filter(todo => !todo.done);
    }
  },
  // 数据发生改变就放到本地存储中，注意深度侦听，以及JSON转化为字符串
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      }
    }
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo");
    this.$bus.$off("deleteTodo");
  }
}
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn:focus {
  outline: none;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
