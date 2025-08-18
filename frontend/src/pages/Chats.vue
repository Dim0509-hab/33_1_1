<template>
  <div>
    <h2>Чат</h2>
    <MessageList :messages="messages" />
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Введите сообщение" />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MessageList from "../components/MessageList.vue";

const messages = ref([{ user: "Bot", text: "Добро пожаловать!" }]);
const newMessage = ref("");

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({ user: "Вы", text: newMessage.value });
    newMessage.value = "";
  }
};
</script>
