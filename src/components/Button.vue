<template>
  <button
    class="py-[10px] px-[20px] bg-stone-400 text-white rounded-md hover:bg-stone-500"
    @click="click"
    v-text="props.text"
  />
</template>

<script setup lang="ts">

interface Props {
  text: string
}

const props = defineProps<Props>();

const emit = defineEmits<{(e: 'click'): void}>();

function click () {
  emit('click');
}

</script>
