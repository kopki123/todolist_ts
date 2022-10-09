<template>
  <div
    class="m-[15px] p-[15px] px-[20px] bg-stone-100 rounded-md flex justify-between items-center"
  >
    <input
      type="checkbox"
      :checked="props.todo.isDone"
      @change="check(props.todo.id)"
    >
    <div
      class="w-[50%] text-lg"
      v-text="props.todo.content"
    />

    <button
      class="py-[10px] rounded-md"
      @click="edit(props.todo.id)"
    >
      <PencilSquareIcon class="h-5 w-5 text-stone-400" />
    </button>

    <button
      class="py-[10px] rounded-md"
      @click="deleteTodo(props.todo.id)"
    >
      <TrashIcon class="h-5 w-5 text-stone-400" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import type { TodoType } from '../App.vue';

interface Props {
  todo: TodoType
}

const props = defineProps<Props>();

const emit = defineEmits<{(e: 'edit', id: number): void
  (e: 'delete', id: number): void
  (e: 'check', id: number): void
}>();

function edit (id: number) {
  emit('edit', id);
}

function deleteTodo (id: number) {
  emit('delete', id);
}

function check (id: number) {
  emit('check', id);
}

</script>
