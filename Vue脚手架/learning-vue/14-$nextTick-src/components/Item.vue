<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input v-show="todo.isEdit"
             type="text"
             :value="todo.title"
             @blur="handleBlur(todo, $event)"
             ref="inputTitle">
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ['todo'],
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通过消息总线实现
      this.$bus.$emit("checkTodo", id);
    },
    // 删除
    handleDelete(id) {
      if (confirm('确定删除吗？')) {
        this.$bus.$emit("deleteTodo", id);
      }
    },
    // 编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        // todo.isEdit = true;  // 不生效  是添加进去了，但没有对应的getter和setter页面不会渲染
        this.$set(todo, "isEdit", true);
      }
      // DOM更新结束后执行其指定的回调
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      })
    },
    // 失去焦点回调（真正执行修改逻辑）
    handleBlur(todo, e) {
      this.todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
