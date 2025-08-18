<template>
  <div>
    <div v-for="(msg, i) in messages" :key="i">
      <b>{{ msg.user }}:</b> {{ msg.text }}
    </div>
  </div>
</template>

<script setup>
defineProps({ messages: Array });
</script>
