<template>
  <ul class="todo-main">
    <transition-group name="todo" appear>
      <Item v-for="todoObj in todos"
            :key="todoObj.id"
            :todo="todoObj"/>
    </transition-group>
  </ul>
</template>

<script>
import Item from "@/components/Item";

export default {
  name: "List",
  components: {Item},
  props: ['todos'],
}
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

.todo-enter-active {
  animation: teng 0.5s linear;
}


.todo-leave-active {
  animation: teng 0.5s linear reverse;
}

@keyframes teng {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
