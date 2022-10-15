<template>
  <div class="w-[95%] max-w-[450px] my-[60px] mx-auto text-center">
    <h1
      class="title text-3xl font-bold m-[20px] text-stone-500"
      v-text="'Todolist'"
    />

    <div class="form w-[90%] mx-auto flex justify-between">
      <input
        v-model="todoInput"
        type="text"
        class="w-[80%] p-[10px] border-[3px] border-stone-300 rounded-md outline-none"
      >

      <Button
        :text="isEdit ? 'edit' : 'add'"
        @click="handleClick"
      />
    </div>

    <div class="mt-[30px] flex justify-around flex-wrap">
      <Button
        v-for="todoCatgory of todosCatgories"
        :key="todoCatgory"
        :text="todoCatgory"
        :class="{
          'bg-stone-500': todoCatgory === showTodoCatgory
        }"
        @click="filterTodos(todoCatgory)"
      />
    </div>

    <div class="w-full mt-[30px]">
      <Todo
        v-for="todo of showTodos"
        :key="todo.id"
        :todo="todo"
        @edit="edit(todo.id)"
        @delete="deleteTodo(todo.id)"
        @check="check(todo.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, ref, watch, computed,
} from 'vue';
import type { Ref, ComputedRef } from 'vue';
import Todo from './components/Todo.vue';
import Button from './components/Button.vue';

export type TodoType = {
  id: number,
  content: string,
  isDone: boolean,
}

enum todosCatgories {
  total = 'total',
  done = 'done',
  undone = 'undone'
}

const todoInput: Ref<string> = ref('');
const isEdit: Ref<boolean> = ref(false);
const editedTodo: Ref<TodoType | null> = ref(null);
const showTodoCatgory = ref(todosCatgories.total);
const todos: Ref<TodoType[]> = ref([]);

const showTodos: ComputedRef<TodoType[]> = computed(() => {
  if (showTodoCatgory.value === todosCatgories.done) {
    return todos.value.filter((todo) => todo.isDone === true);
  }

  if (showTodoCatgory.value === todosCatgories.undone) {
    return todos.value.filter((todo) => todo.isDone === false);
  }

  return todos.value;
});

function filterTodos (todoCatgory: todosCatgories) {
  showTodoCatgory.value = todoCatgory;
}

function handleClick () {
  if (!todoInput.value.trim()) {
    alert('請輸入內容');
    return;
  }

  if (!isEdit.value) {
    todos.value = [
      ...todos.value,
      {
        id: new Date().getTime(),
        content: todoInput.value,
        isDone: false,
      },
    ];

    todoInput.value = '';
    return;
  }

  todos.value = todos.value.map((todo) => {
    if (todo.id === editedTodo.value?.id) {
      const newTodo = todo;
      newTodo.content = todoInput.value;
      return newTodo;
    }

    return todo;
  });

  isEdit.value = false;
  editedTodo.value = null;
  todoInput.value = '';
}

function edit (id: number) {
  isEdit.value = true;

  editedTodo.value = todos.value.find((todo) => todo.id === id) || null;
  todoInput.value = editedTodo.value?.content || '';
}

function deleteTodo (id: number) {
  if (editedTodo.value && editedTodo.value?.id) {
    isEdit.value = false;
    editedTodo.value = null;
    todoInput.value = '';
  }

  todos.value = todos.value.filter((todo) => todo.id !== id);
}

function check (id: number) {
  todos.value = todos.value.map((todo) => {
    if (todo.id === id) {
      const newTodo = todo;
      newTodo.isDone = !newTodo.isDone;
      return newTodo;
    }

    return todo;
  });
}

watch(todos, () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
});

onMounted(() => {
  const localTodos = localStorage.getItem('todos');

  if (localTodos) {
    todos.value = JSON.parse(localTodos);
  }
});

</script>
